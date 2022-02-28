const jwt = require('express-jwt')
const secret = process.env.JWTSECRET

module.exports = function authorize(roles = []){
    if(typeof roles ==='string'){
        roles = [roles]
    }

    return (req, res, next) =>{
            if(req.user === undefined || roles.length && !roles.includes(req.user.type)){
                return res.render('error', {error : 'You are not authorized to access the requested page. Please contact your adminstrator.'})
            }
            next();
        }
}