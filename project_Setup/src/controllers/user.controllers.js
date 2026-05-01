
import { asyncHandler } from '../utils/asynchandler.js';
import { ApiError } from "../utils/apierror.js";
import User from "../models/user.model.js"
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiresponse.js";
import path from 'path';


const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken= user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        console.log("tokens not created");
        
        console.log(error);
        // return {};
    }
}




const registerUser = asyncHandler(async (req, res) => {
    //get users details from frontend
    // validation -not empty or undefined
    //check if user already exists: using email ,username
    //check for images,check for avatar
    // apload them to cloudnary, avatar ,images
    // create object - then create entry in db
    // remove password and refresh token from response
    // check for user creaton 
    // return response
    const { username, email, fullname, password } = req.body;

    if (!fullname || !password || !username || !email) {
        return res.status(400).json(new ApiError(400, "required", ["all fields are required"]))
    }
    if (fullname.trim() === "" || password.trim() === "" || username.trim() === "" || email.trim() === "") {
        return res.status(400).json(new ApiError(400, "required", ["all fields are required"]))
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        return res.status(409).json(new ApiError(409, "user already exists", ["user already exists"]))
    }
    const avatarLocalPath = req.files?.avatar?.[0]?.path || null;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path || null;

    if (!avatarLocalPath) {
        return res.status(400).json(new ApiError(400, "required", ["avatar image are required"]))
    }

    // console.log(avatarLocalPath);
    // console.log(coverImageLocalPath);

    const cloudnaryAvatar = await uploadCloudinary(avatarLocalPath);
    const cloudnaryCoverImage = await uploadCloudinary(coverImageLocalPath);

    if (!cloudnaryAvatar) {
        return res.status(400).json(new ApiError(400, "cloudnary", ["cloudnary, avatar image are required"]))
    }
    // db entry
    const user = await User.create({
        username: username.toLowerCase(),
        fullname,
        avatar: cloudnaryAvatar.url,
        coverImage: cloudnaryCoverImage?.url || "",
        email: email,
        password,


    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        return res.status(500).json(new ApiError(500, "Somthing went wrong", ["Somthing wrong please try again"]))
    }
    return res.status(201).json(new ApiResponse(201, "Created user successfully", createdUser))

})




const loginUser = asyncHandler(async (req, res) => {

    //get req.body email,password,etc.
    //create validation email and password,username
    // find user
    //check password
    // send and generated refresh and access token
    // send response
    const { email, username, password } = req.body;
    if (!email || !username) {
        return res.status(400).json(new ApiError(400, "username or email required", ["bad reqquest", "username or email required"]))
    }
    if (email === "" || username === "") {
        return res.status(400).json(new ApiError(400, "username or email required", ["bad reqquest", "username or email required"]))
    }
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (!user) {
        return res.status(404).json(new ApiError(404, "user not found", ["bad reqquest", "username or email user not found"]))
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        return res.status(404).json(new ApiError(404, "password is incorrect", ["bad reqquest", "password is incorrect"]))
    }

    const {accessToken,refreshToken }= await  generateAccessTokenAndRefreshToken(user._id)


    const loggedInUser=await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
        
    }
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200,"login acessfully",{user:loggedInUser,accessToken,refreshToken}))

})








const logoutUser = asyncHandler(async (req, res) => {
    
    const user = await User.findByIdAndUpdate(req.user._id, {
        $set:{refreshToken:undefined}
    }, { new: true });
    
    const options = {
        httpOnly: true,
        secure: true
        
    }
    res.status(200).clearCookie("accessToken").clearCookie("refreshToken").json(new ApiResponse(200,"user logOut sucessfully",{}))

})


export { registerUser, loginUser,logoutUser }