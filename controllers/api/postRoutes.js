const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["post_id", "post_title", "content","created_at"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Comment,
        attributes: ["comment_body", "post_id", "created_at"],
        include: {
          model: User,
          attributes: ["id", "username"],
        },
      },
      {
        model: User,
        attributes: ["id","username"],
      },
    ],
  })
    .then((postData) => res.json(postData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  Post.create({
    post_title: req.body.post_title,
    content: req.body.content,
    user_id: req.session.user_id,
  })
    .then((postData) => res.json(postData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((postData) => {
      if (!postData) {
        res.status(404).json({ message: "No post id" });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  console.log("this is the route")
  Post.findOne({
      where: {
          post_id: req.params.id
      },
      attributes: ['post_id', 'content', 'post_title', 'created_at'],

      include: [{
          model: User,
          attributes: ['id', 'username']
      },

      {
          model: Comment,
          attributes: [, 'comment_body', 'post_id', 'created_at'],
          include: {
              model: User,
              attributes: ['id', 'username']
          }
      }

      ]
  })
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'Page not found..' });
              return;
          }
          res.json(dbPostData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});


router.put('/:id', withAuth, (req, res) => {
  Post.update({
      title: req.body.post_title,
      content: req.body.content
  },
      {
          where: {
              id: req.params.id
          }
      })

      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'This post does not exist' });
              return
          }
          res.json(dbPostData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});



module.exports = router;