const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({})
      .then(commentData => res.json(commentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/', withAuth, (req, res) => {
  console.log(req.body);
  if (req.session) {
    Comment.create({
      comment_body: req.body.comment_body,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    })
      .then(commentData => res.status(200).json(commentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});






module.exports = router;