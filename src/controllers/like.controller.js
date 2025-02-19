import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    //TODO: toggle like on video
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "invalid video ID");
      }
    const userId  = req.user?._id

    const liked = await Like.findOne({
        video : videoId,
        likedBy : userId,

    })
    if(liked){
        await Like.deleteOne({_id: liked._id})
        return res.status(200).json(new ApiResponse("Video Liked Successfully"));

    }
    const like = new Like({
        video : videoId,
        likedBy : userId,
    })
    await like.save()
    return res
    .status(200)
    .json(new ApiResponse(200, newSubscriber, "Video Liked Successfully"));
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}