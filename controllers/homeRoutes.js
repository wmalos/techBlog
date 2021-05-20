const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const createPost = await Post.findAll({
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
          attributes: ["Username"],
        },
      ],
    });

    const userPosts = createPost.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      userPosts,
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
  try {
    const findPost = await Post.findOne({
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




