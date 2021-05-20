const router = require('express').Router();
const { Post, User, Comment } = require("../../models");

router.get('/', async (req, res) => {
  try {
    const createPost = await Post.findAll({
      attributes: [
        'id',
        'title',
        'content',
        'created_at'
      ],
      include: [{
        model: Comment,
        attributes: ['id', 'comments', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['Username']
      }
      ]
    })
    
    const userPosts = createPost.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      userPosts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});







// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  