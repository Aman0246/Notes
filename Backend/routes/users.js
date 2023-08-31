const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
//UPDATE
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
     try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).send({status:true,message:"update ok",data:updatedUser})
    
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.send({status:false,message:"You can update only your account!"})
    }
  });
  
  //DELETE
  router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        try {
          await Post.deleteMany({ username: user.username });
          await User.findByIdAndDelete(req.params.id);
          res.status(200).send({status:true,message:"Delete ok"})
       
        } catch (err) {
          res.status(500).json(err);
        }
      } catch (err) {
        res.send({status:false,message:"user Not found"})
      }
    } else {
        res.send({status:false,message:"You can delete only your account!"})

    }
  });
  
  //GET USER
  router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.send({status:true,message:"user Details",data:others})
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
