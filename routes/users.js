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
router.get('/new', authorize(['Administrator', 'HR Representative']), (req,res)=>{
  res.render('user/new')
})

router.post('/new',authorize(['Administrator', 'HR Representative']), (req, res)=>{
  usersController.addUser(req, res);
})

router.get('/user', authorize(['Administrator', 'HR Representative']), async (req, res)=>{
  let employee = await usersController.getUser(req, res)
  console.log(employee)
  res.render('user/edit', {employee : employee})
})

router.post('/edit', authorize(['Administrator', 'HR Representative']), async (req, res)=>{
  usersController.updateUser(req, res)
})

router.get('/search', (req, res)=>{ usersController.findUserByName(req, res)})

module.exports = router;
