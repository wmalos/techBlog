const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const { findOne } = require("../models/Comment");

router.get("/", async (req, res) => {
  try {
    const createPost = await Post.findAll({
      attributes: ["post_id", "post_title", "content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: ["comment_body", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["id","username"],
        },
      ],
    });

    const posts = createPost.map((post) => post.get({ plain: true }));
    console.log(posts);

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/post/:id", async (req, res) => {
  console.log("home route")
  try {
    const findPost = await Post.findOne({
      where: {
        post_id: req.params.id,
      },

      attributes: ["post_id", "content", "post_title", "created_at"],

      include: [
        {
          model: Comment,
          attributes: ["id", "comment_body", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    if (!findPost) {
      res.status(404).json({ message: "This post does not exist" });
      return;
    }

    const post = findPost.get({ plain: true });
    res.render("findPost", { post, logged_in: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/userPosts-comments", async (req, res) => {
  try {
    const postComments = await Post.findOne({
      where: {
        id: req.params.id,
      },

      attributes: ["id", "content", "title", "created_at"],

      include: [
        {
          model: Comment,
          attributes: ["id", "comments", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    if (!postComments) {
      res.status(404).json({ message: "A post with this id does not exist" });
      return;
    }

    const post = postComments.get({ plain: true });
    res.render("post-comments", { post, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
