import User from "../models/user.models.js";

export const addMode = async (req, res, next) => {
  const userId = req.params.id;
  const { work, rest } = req.body;

  if (req.params.id !== req.userId._id) {
    const error = new Error();
    error.message = "Unauthorized";
    error.code = C4444;
    next(error);
  }
  try {
    const user = await User.findById(userId);
    console.log(user);
    if (user.customModes >= 5) {
      const error = new Error();
      error.message = "Unauthorized";
      error.code = C4444;
      return next(error);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { customModes: { work, rest } },
      },
      { new: true }
    );

    return res
      .status(201)
      .json({ ...updatedUser._doc, password: undefined, salt: undefined });
  } catch (err) {
    return next(err);
  }
};

export const deleteMode = async (req, res, next) => {
  const userId = req.params.id;
  const modeId = req.query.modeId;

  if (req.params.id !== req.userId._id) {
    const error = new Error();
    error.message = "Unauthorized";
    error.code = C4444;
    next(error);
  }

  if (!modeId) {
    const error = new Error();
    error.message = "No such mode exists";
    next(error);
  }
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { customModes: { _id: modeId } },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ ...user._doc, password: undefined, salt: undefined });
  } catch (err) {
    return next(err);
  }
};

export const logoutUser = (req, res, next) => {
  console.log("logOut request");
  try {
    res.clearCookie("authToken");
    return res.status(200).json({ success: "User Successfully Logged out" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
