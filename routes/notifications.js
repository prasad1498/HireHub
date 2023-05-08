let express = require('express');
let notification = require('../modals/notifDB');
let router = express.Router();
let {isAdmin,isLoggedIn} = require('../middlewares/index.js')

router.get('/notifications',async (req,res)=>{

    try {
        let allNotif = await notification.find({})
    res.render('index-notif.ejs',{allNotif});
    } catch (error) {
        console.log('error while fetching notification', error)
    }
});

router.get('/notifications/new',isLoggedIn,isAdmin,(req,res)=>{
    res.render('new-notif.ejs');
});

router.post('/notifications',isLoggedIn,isAdmin, async(req,res)=>{
    try {
        let notif = new notification({
            body: req.body.body,
            author: req.body.author
        })
        await notif.save();
        res.redirect('/notifications');
    } catch (error) {
        console.log('error while postion a notification', error);
    }
});

router.delete('/notifications/:id',isLoggedIn, async(req,res)=>{

    try {
        let id = req.params.id
        // if(!id) res.send('No Notifications');
        await notification.findByIdAndDelete(id);
        res.redirect('/notifications');
    } catch (error) {
        console.log('error while deleting notification', error);
    }
});


module.exports = router;