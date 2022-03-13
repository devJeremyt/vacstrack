var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController')
const authorize = require('../authorize')


/* GET users listing. */
router.get('/', authorize('Administrator'), async function(req, res, next) {
  let users = await usersController.getUsers()
  res.render('user/index', {users : users});
});

/*Form page for creating a new User*/
router.get('/new', (req,res)=>{
  res.render('user/new')
})

router.post('/new', (req, res)=>{
  usersController.addUser(req, res);
})

router.get('/search', (req, res)=>{ usersController.findUserByName(req, res)})

module.exports = router;
