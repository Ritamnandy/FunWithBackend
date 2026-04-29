
import { asyncHandler } from '../utils/asynchandler.js';
import { ApiError } from "../utils/apierror.js";
import User from "../models/user.model.js"
import { uploadCloudinary } from "../utils/cloudinary.js";

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
    const cloudnaryavatar = await uploadCloudinary(avatarLocalPath);



})
















const loginUser = asyncHandler(async (req, res) => {
    return res.status(200).json({
        message: "login"
    })
})

export { registerUser, loginUser }