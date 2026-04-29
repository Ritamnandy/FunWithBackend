
import { asyncHandler } from '../utils/asynchandler.js';
import { ApiError } from "../utils/apierror.js";
import User from "../models/user.model.js"
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiresponse.js";
const registerUser = asyncHandler(async (req, res) => {
    //get users details from frontend
    // validation -not empty
    //check if user already exists: using email ,username
    //check for images,check for avatar
    // apload them to cloudnary, avatar ,images
    // create object - then create entry in db
    // remove password and refresh token from response
    // check for user creaton 
    // return response
    console.log(req.body);
    const { username, email, fullname, password } = req.body;
    
    if (!fullname || !password || !username || !email) {
        return res.status(400).json(new ApiError(400, "required", ["all fields are required"]))
    }
    if (fullname.trim() === "" || password.trim() === "" || username.trim() === "" || email.trim() === "") {
        return res.status(400).json(new ApiError(400, "required", ["all fields are required"]))
    }
    const existedUser =await User.findOne({
        $or:[{ username },{ email}]
    })
    if (existedUser) {
        return res.status(409).json(new ApiError(409, "required", ["user already exists"]))
    } 
    const avatarLocalPath =req.files?.avatar[0]?.path
    const coverImageLocalPath =req.files?.coverImage[0]?.path
    if (!avatarLocalPath) {
        return res.status(400).json(new ApiError(400, "required", ["avatar image are required"]))
    }
    const cloudnaryAvatar = await uploadCloudinary(avatarLocalPath);
    const cloudnaryCoverImage = await uploadCloudinary(coverImageLocalPath);

    if (!cloudnaryAvatar) {
        return res.status(400).json(new ApiError(400, "required", ["avatar image are required"]))
    }
    //db entry
    const user =await User.create({
        username:username.toLowerCase(),
        fullname,
        avatar: cloudnaryAvatar.url,
        coverImage: cloudnaryAvatar?.url || "",
        email: email,
        password,

        
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        return res.status(500).json(new ApiError(500, "Somthing went wrong", ["avatar image are required"]))
    }
    return res.status(201).json(new ApiResponse(201,"Created user successfully",createdUser))
})
















const loginUser = asyncHandler(async (req, res) => {
    return res.status(200).json({
        message: "login"
    })
})

export { registerUser, loginUser }