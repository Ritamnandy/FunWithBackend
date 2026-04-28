
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';




// Return "https" URLs by setting secure: true
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});


const uploadCloudinary = async (filePath) => {
    try {
        if (!filePath) 
            console.log('Could not find path');
            return null;

        const response =await    cloudinary.uploader
                .upload(filePath, {
                    resource_type: "auto",
                })
            console.log("file is uploaded on Cloudinary",response.url);
        return response.url;    
        
    } catch (error) {
        fs.unlinkSync(filePath); //remove file if upload file failed
            console.log('Could not upload done');
    }
}

export { uploadCloudinary };


// Log the configuration
// console.log(cloudinary.config());