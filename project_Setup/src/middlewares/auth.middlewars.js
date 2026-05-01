

import { asyncHandler } from "../utils/asynchandler";
import { ApiError } from "../utils/apierror";

const verifyJWT= asyncHandler(async (req,res,next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
        return res.status(401).json(new ApiError(401, "Unauthorized request", ["Unauthorized request"]));
    }

})
    
export { verifyJWT };