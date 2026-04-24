const User = require("../modals/user.modal");

const getAllUsersData = async (req, res) => {
  try {
    const data = await User.aggregate([
      {
        $lookup: {
          from: "examresults",
          localField: "_id",
          foreignField: "userId",
          as: "examData"
        }
      },
      {
        $lookup: {
          from: "certificates",
          localField: "_id",
          foreignField: "userId",
          as: "certificateData"
        }
      },
      {
        $unwind: {
          path: "$examData",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          name: 1,
          phone: 1,
          email: 1,
          block: 1,
          address: 1,
          score: "$examData.score",
          result: "$examData.result",
          attemptedExams: "$examData.attemptedExams",
          certificateUrl: { $arrayElemAt: ["$certificateData.certificateUrl", 0] },
          createdAt: 1
        }
      },
      { $sort: { createdAt: -1 } }
    ]);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching data" });
  }
};

module.exports = { getAllUsersData };
