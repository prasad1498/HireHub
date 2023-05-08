let express = require('express');
let router = express.Router();
const passport = require('passport');
let UserDB = require('../modals/userDB');



router.get('/register', (req,res)=>{
    res.render('register');
});

router.post('/register', async (req,res)=>{
    let user = new UserDB ({
        username: req.body.username
    });
    let registeredUser = await UserDB.register(user, req.body.password);
    req.login(registeredUser, (err)=>{
        if(err){
            console.log('error while registering user')
        }
        res.redirect('/jobs');
    });
});

router.get('/login', (req,res)=>{
    res.render('login.ejs')
});

router.post('/login', passport.authenticate('local',{
    failureRedirect: '/login'
}) ,(req,res)=>{
    res.redirect('/jobs');
})

router.get('/logout',(req,res)=>{
    req.logout((err)=>{
        if(err){
            console.log('Error while logot');
        }
        else{
            res.redirect('/jobs');
        }
    })

});



module.exports = router;