import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    password,
    field,
    role,
    isMentor,
    seekersUnderMentor,
    degrees,
    softSkills,
    experience,
  } = req.body;

  if (
    !name ||
    !email ||
    !phone ||
    !password ||
    !field ||
    !role ||
    !isMentor ||
    (isMentor &&
      (!seekersUnderMentor || !degrees || !softSkills || !experience))
  ) {
    return next(new ErrorHandler("Please fill full form!"));
  }

  const isUserFoundWithEmail = await User.findOne({ email });

  if (isUserFoundWithEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }

  const user = new User({
    name,
    email,
    phone,
    password,
    field,
    role,
    isMentor,
  });

  if (isMentor) {
    user.seekersUnderMentor = seekersUnderMentor;
    user.degrees = degrees;
    user.softSkills = softSkills;
    user.experience = experience;
  } else {
    user.seekersUnderMentor = undefined;
    user.degrees = undefined;
    user.softSkills = undefined;
    user.experience = undefined;
  }

  await user.save();

  return sendToken(user, 201, res, "User Registered!");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password and role."));
  }

  const user = await User.findOne({ email }).select("-password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }

  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }

  return sendToken(user, 201, res, "User Logged In!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  return res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: Date.now(),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});

export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;

  return res.status(200).json({
    success: true,
    user,
  });
});

export const getAllMentors = catchAsyncErrors(async (req, res, next) => {
  const mentors = await User.find({ isMentor: true });
  return res.status(200).json({
    success: true,
    mentors,
  });
});

export const selectMentor = catchAsyncErrors(async (req, res, next) => {
  const { mentorId } = req.body;
  const user = req.user;

  if (user.role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource.")
    );
  }

  if (!mentorId) {
    return next(new ErrorHandler("Please provide mentor ID."));
  }

  const mentor = await User.findById(mentorId);
  if (!mentor) {
    return next(new ErrorHandler("Mentor not found."));
  }

  user.mentor = mentorId;
  await user.save();

  mentor.seekersUnderMentor.push(user._id);
  await mentor.save();

  return res.status(200).json({
    success: true,
    message: "Mentor selected successfully.",
  });
});

export const unSelectMentor = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  if (user.role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource.")
    );
  }

  user.mentor = undefined;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Mentor unselected successfully.",
  });
});

export const removeSeeker = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  if (user.role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.")
    );
  }

  const { seekerId } = req.body;
  if (!seekerId) {
    return next(new ErrorHandler("Please provide seeker ID."));
  }

  const seeker = await User.findById(seekerId);
  if (!seeker) {
    return next(new ErrorHandler("Seeker not found."));
  }

  seeker.seekersUnderMentor.filter((id) => id !== seekerId);
  await seeker.save();

  seeker.mentor = "";
  await seeker.save();

  return res.status(200).json({
    success: true,
    message: "Seeker removed successfully.",
  });
});

export const getSeekersUnderMentor = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;
    if (user.role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.")
      );
    }

    const mentor = await User.findById(user.mentor).populate(
      "seekersUnderMentor"
    );
    if (!mentor) {
      return next(new ErrorHandler("Mentor not found."));
    }

    return res.status(200).json({
      success: true,
      seekersUnderMentor: mentor.seekersUnderMentor,
    });
  }
);

export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;

  await User.findByIdAndDelete(user._id);

  return res.status(200).json({
    success: true,
    message: "User deleted successfully.",
  });
});

export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  if (!user.isAdmin) {
    return next(new ErrorHandler("Only admin users can access this resource."));
  }

  const users = await User.find();

  return res.status(200).json({
    success: true,
    users,
  });
});

export const deleteUserByAdmin = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  if (!user.isAdmin) {
    return next(new ErrorHandler("Only admin users can access this resource."));
  }

  const { userId } = req.body;
  if (!userId) {
    return next(new ErrorHandler("Please provide user ID."));
  }

  await User.findByIdAndDelete(userId);

  return res.status(200).json({
    success: true,
    message: "User deleted successfully.",
  });
});
