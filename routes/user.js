let express = require('express');
let router = express.Router();
let User = require('../modals/userDB');

// show 
router.get('/user/:id', async(req,res)=>{
    try {
        let user = await User.findById(req.params.id);
        res.render('show-user',{user});
    } catch (error) {
        console.log('error while showing user', error);
    }
})

// edit

router.get('/user/:id/edit', async (req,res)=>{
    try {
        let user = await User.findById(req.params.id);
        res.render('edit-user',{user});
    } catch (error) {
        console.log('error while editing user', error);
    }
})

// update

router.patch('/user/:id', async (req,res)=>{
    try {
        // console.log(req.body)
		await User.findByIdAndUpdate(req.params.id, req.body);
		res.redirect(`/user/${req.params.id}`);
	} catch (error) {
		console.log('problem while updating user', error);
	}

});


router.delete('/user/:id', async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        console.log('error while deleting user', error);
    }
});

module.exports = router;