const Comment = require("../models/Comment");
const PostModel=require('../models/Post')
const router = require("express").Router();
const { verifyToken } = require("../JWT/Verify");

// Create a new comment

router.post("/", async (req, res) => {
  console.log(req.body)
  try {
    const { userId, postId, desc,username,profilePic } = req.body;
    const newComment = new Comment({ userId, postId, desc,username,profilePic});
    const savedComment = await newComment.save();

    res.send({ status: true, message: "comment added", data: savedComment });
  } catch (error) {
    res.send({ status: false, message: "Failed to create comment" });
  }
});


// get all comment of single Post

router.get("/comment/:postid", async (req, res) => {
  console.log(req.body)
  try {
    let allcomment =await Comment.find({postId:req.params.postid})
    if(allcomment.length==0) return res.send({status:false,message:'no coomment found',postid:req.params.postid})
    
    res.send({ status: true, message: "all comment of post", data: allcomment });
  } catch (error) {
    res.send({ status: false, message: "Failed to get comment" });
  }
});


// Delete a comment by ID
router.delete("/:commentId/:postId",verifyToken ,async (req, res) => {
  let commentdata=await Comment.findOne({_id:req.params.commentId})
  let Post=await PostModel.findOne({_id:req.params.postId}) 
  if(req.userId==commentdata.userId||req.userId==Post.userId){
  //  console.log(req.userId,commentdata.userId,Post.userId,req.userId)

     try {
         const deletedComment = await Comment.findByIdAndRemove(
             req.params.commentId
             );
             if (!deletedComment) {
                 return res.send({status:false,message: "Comment not found" });
                }
                return res.send({status:true,message: "Comment deleted successfully" });
            
            } catch (error) {
                res.status(500).json({ error: "Failed to delete comment" });
            }
        }
        else {
            res.send({status:false,message: "you are not authorised" });
        }
});


// Update a comment by ID
router.put('/comments/:commentId', verifyToken,async (req, res) => {
    let commentdata=await Comment.findOne({_id:req.params.commentId})
    if(req.userId!=commentdata.userId) {
        return res.send({status:false,message: "not authoreise" });
    }
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        req.body,
        { new: true }
      );
      if (!updatedComment) {
        return res.send({status:false, message: "Comment not found" });
      }
       res.send({status:true, message: "Comment updated",data:updatedComment });
    } catch (error) {
      res.status(500).json({ error: "Failed to update comment" });
    }
  })



  module.exports = router;