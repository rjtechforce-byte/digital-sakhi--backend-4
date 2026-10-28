const User = require("../modals/user.modal");

// Array me se ek document chuno createdAt ke basis pe.
// "$gte" => sabse naya (barabar ho to baad wala), "$lt" => sabse purana.
// Khali array => null (score/result/certificateUrl blank rahenge).
const pickByCreatedAt = (arrayField, cmp) => ({
  $reduce: {
    input: arrayField,
    initialValue: null,
    in: {
      $cond: [
        {
          $or: [
            { $eq: ["$$value", null] },
            { [cmp]: ["$$this.createdAt", "$$value.createdAt"] },
          ],
        },
        "$$this",
        "$$value",
      ],
    },
  },
});

const getAllUsersData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const block = req.query.block;

    // Export ke liye
    const exportLimit = req.query.exportLimit;

    let limit = 100;

    if (
      exportLimit &&
      exportLimit !== "all" &&
      !isNaN(parseInt(exportLimit))
    ) {
      limit = parseInt(exportLimit);
    } else {
      limit = parseInt(req.query.limit) || 100;
    }

    const skip = (page - 1) * limit;

    const total = await User.countDocuments(
      block ? { block } : {}
    );

    // Pehle filter + sort + page, uske baad hi $lookup —
    // taaki lookup sirf us page ke users pe chale, poore collection pe nahi
    const pipeline = [
      ...(block ? [{ $match: { block } }] : []),

      {
        $sort: {
          createdAt: -1,
          _id: -1,
        },
      },
    ];

    // Pagination sirf normal table ke liye
    if (!exportLimit) {
      pipeline.push({ $skip: skip });
      pipeline.push({ $limit: limit });
    }

    // Custom export
    if (exportLimit && exportLimit !== "all") {
      pipeline.push({ $limit: limit });
    }

    pipeline.push(
      {
        $lookup: {
          from: "examresults",
          localField: "_id",
          foreignField: "userId",
          as: "examData",
        },
      },

      {
        $lookup: {
          from: "certificates",
          localField: "_id",
          foreignField: "userId",
          as: "certificateData",
        },
      },

      {
        $addFields: {
          // latest exam result (sabse naya createdAt)
          examData: pickByCreatedAt("$examData", "$gte"),
          // pehla certificate (sabse purana createdAt)
          certificateData: pickByCreatedAt("$certificateData", "$lt"),
        },
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
          certificateUrl: "$certificateData.certificateUrl",
          createdAt: 1,
        },
      },

      // $lookup order nahi badalta, phir bhi final order pakka rakhne ke liye
      {
        $sort: {
          createdAt: -1,
          _id: -1,
        },
      }
    );

    const data = await User.aggregate(pipeline);

    res.json({
      data,
      total,
      page,
      totalPages: Math.ceil(total / (parseInt(req.query.limit) || 100)),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching data",
    });
  }
};

const getBlocks = async (req, res) => {
  try {
    const blocks = await User.distinct("block");
    res.json(blocks);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching blocks",
    });
  }
};

module.exports = {
  getAllUsersData,
  getBlocks,
};
