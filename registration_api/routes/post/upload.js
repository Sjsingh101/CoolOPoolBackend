const router = require("express").Router(),
  Post = require("../../models/post");

router.get("/post", async (req, res) => {
  console.log("finding posts");
  await Post.find({})
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log("error getting posts", err);
      return res.status(500).json({ msg: "failed to get posts" });
    });
});

router.post("/post", async (req, res) => {
 await Post.create(req.body, (err, newlyCreated) => {
    if (err) {
      return res.status(500).json({ msg: "failed to get posts" });
    } else {
      res.json(newlyCreated);
    }
  });
});

router.put("/post/:post_id/edit", async(req, res) => {
  console.log("editing post",req.params.post_id);
  await Post.findByIdAndUpdate(req.params.post_id)
  .then(posts => {
      res.status(200).json("edited");
  })
  .catch(err => {
    console.log("error editing posts", err);
    return res.status(500).json({ msg: "failed to edit posts" });
  })
});

router.delete("/post/:post_id/delete", async (req, res) => {
    await Post.findByIdAndRemove(req.params.post_id)
    .then(posts=> {
        res.status(200).json("deleted");
    })
    .catch(err => {
        console.log("error deleting posts", err);
    return res.status(500).json({ msg: "failed to delete posts" });
    })
});

module.exports = router;