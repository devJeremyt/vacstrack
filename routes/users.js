var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Database needs to be implemented first so that we can pull stored users');
});

/*Form page for creating a new User*/
router.get('/new', (req,res)=>{
  res.render('user/new')
})

router.post('/new', (req, res)=>{
  res.send('Future comfirmation page, or potentially reload the form for the user to create an additional employee record')
})

module.exports = router;
