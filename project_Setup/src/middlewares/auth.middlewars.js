

import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");
        if (!token) {
            return res.status(401).json(new ApiError(401, "Unauthorized request", ["Unauthorized request"]));
        }
        const information = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(information?._id).select("-password -refreshToken ")

        if (!user) {
            return res.status(401).json(new ApiError(401, "Invalid access token", ["Invalid access token"]));
        }
        console.log(user);

        req.user = user;
        next()
    } catch (error) {
        console.log("Invalid access token");

        console.log(error);
        return res.status(401).json(new ApiError(401, "access token is expire"["access token is expire"]));


    }



})

export { verifyJWT };