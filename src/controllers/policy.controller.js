const service = require("../services/policy.service");

exports.calculate = async (req, res, next) => {
  try {
    const result = await service.calculatePolicy(
      req.user.userId,
      req.body
    );
     res.status(200).json({
      success: true,
      message: "Policy illustration generated successfully",
      data: result
    });
  } catch (err) {
     next(err); 
  }
};
