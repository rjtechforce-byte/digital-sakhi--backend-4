const User = require("../modals/user.modal");

const getAllUsersData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;

    const skip = (page - 1) * limit;

    // 🔢 total count
    const total = await User.countDocuments();

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

  // 🔥 latest exam only
  {
    $addFields: {
      examData: { $arrayElemAt: ["$examData", -1] }
    }
  },

  {
    $project: {
      _id: 1,
      name: 1,
      phone: 1,
      email: 1,
      block: 1,
      address: 1,

      score: "$examData.score",
      result: "$examData.result",

      attemptedExams: "$examAttempts",

      certificateUrl: {
        $arrayElemAt: ["$certificateData.certificateUrl", 0]
      },

      createdAt: 1
    }
  },

  { $sort: { createdAt: -1 } },
  { $skip: skip },
  { $limit: limit }
]);
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
};
module.exports = { getAllUsersData };
