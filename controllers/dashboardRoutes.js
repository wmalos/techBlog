const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    console.log("dashboard");
    const createPost = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "content", "created_at"],

      include: [
        {
          model: Comment,
          attributes: ["id", "comments", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },

        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const userPosts = createPost.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      userPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },

      attributes: ["id", "title", "content", "created_at"],

      include: [
        {
          model: User,
          attributes: ["username"],
        },

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
    if (!postData) {
      res.status(404).json({ message: "This post does not exist" });
      return;
    }

    const post = postData.get({ plain: true });
    res.render("editPost", { post, logged_in: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/new", (req, res) => {
  res.render("createPost");
});

module.exports = router;
