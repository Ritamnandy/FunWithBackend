
import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new mongoose.Schema(
    {
        videoFile: {
            type: String,//cloudinary url
            required: true,
            
        },
        thumbnail: {
            type: String,//cloudinary url
            required: true,
            
        },
        tittle: {
            type: String,
            required: true,
            
        },
        description: {
            type: String,
            required: true,
            
        },
        duration: {
            type: Number,//cloudinary url
            required: true,
            
        },
        views: {
            type: Number,
            default:0
            
        },
        isPublished: {
            type: Boolean,
            default:true
            
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }


    }, { timestamps: true });

videoSchema.plugin(mongooseAggregatePaginate)

const Video = mongoose.model("Video", videoSchema);

export default Video;

// https://res.cloudinary.com/dph6daqds/image/upload/f_auto,q_auto/japan-artistic-3840x2160-25406_lcs6hw