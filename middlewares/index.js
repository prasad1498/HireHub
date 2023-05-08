// authentication
const isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.redirect('/login');
        console.log('req.user');
    }
    }

// authorization
const isAdmin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        res.send('You Do Not have permission');
    }
}

module.exports = {
    isAdmin,
    isLoggedIn
};