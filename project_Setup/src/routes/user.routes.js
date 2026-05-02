

import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewars.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountsDetails,
    updateAvatarImages,
    updateCoverImages
} from "../controllers/user.controllers.js";

import { upload } from "../middlewares/multer.middlewares.js";

const router = express.Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/password-change").post(verifyJWT, changeCurrentPassword)
router.route("/update-coverImage").post(upload.single("coverImage"), verifyJWT, updateCoverImages)
router.route("/update-avatarImage").post(upload.single("avatar"), verifyJWT, updateAvatarImages)
router.route("/update-user-details").post(verifyJWT, updateAccountsDetails)


//get request

router.route("/get-current-user").get(verifyJWT, getCurrentUser)















export default router;