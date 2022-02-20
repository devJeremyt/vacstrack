var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let users = await usersController.getUsers()
  console.log(users)
  res.render('user/index', {users : users});
});

/*Form page for creating a new User*/
router.get('/new', (req,res)=>{
  res.render('user/new')
})

router.post('/new', (req, res)=>{
  res.send('Future comfirmation page, or potentially reload the form for the user to create an additional employee record')
})

module.exports = router;
