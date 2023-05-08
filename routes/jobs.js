let express = require('express');
let router = express.Router();
let Job = require('../modals/jobDB.js');
let passport = require('passport');
let notification = require('../modals/notifDB.js');
// middlewares destructuring same as ->  let middleware = require('../middlewares/index.js')
let {isAdmin,isLoggedIn} = require('../middlewares/index.js')








router.get('/', (req,res) => {
    res.render('landing');
});

// index page
router.get('/jobs', async(req,res)=>{
    if(isLoggedIn == true){
        console.log('LoggedIn User');
    }
    try {
        let foundjob;
        if(req.query.search && req.query.search.length > 0){
            let regex = new RegExp(req.query.search.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&'));
            let foundjob = await Job.find({name: regex})
            res.render('index',{foundjob});
        } else{
            let foundjob = await Job.find({})
            // console.log(req.user);
            res.render('index',{foundjob});
        }
    } catch (err) {
        console.log('error while extracting the jobs', err);
    }
});

router.get('/jobs/new', isAdmin ,isLoggedIn,(req, res)=>{
    res.render('new');
});

router.post('/jobs',async (req,res)=>{
    // res.send(req.body);
    try {
        let newJob = new Job({
            name: req.body.name,
            exp: req.body.exp,
            address: req.body.address,
            pakage: req.body.pakage,
            logo: req.body.logo,
            deadline: req.body.deadline,
            info: req.body.info,
            type: req.body.type
        })
        // Posting notification of new job listing
        try {
            let notif = new notification({
                body: "New Job Has Been Posted",
                author: newJob.name
            })
            await notif.save();
        } catch (error) {
            console.log('error while postion a notification', error);
        }
        await newJob.save();
        res.redirect('/jobs');
    } catch (error) {
        console.log('error while adding a new job', error)
    }
     
});

router.get('/jobs/:id',async (req,res)=>{
    try {
        let id = req.params.id;
        let job = await Job.findById(id).populate('appliedUsers');
        res.render('show',{job})
        // console.log('jobs.js line:65')
    } catch (error) {
        console.log('error while showing the job', error)
    }
});

router.get('/jobs/:id/edit', isAdmin ,async (req,res)=>{
    try {
        let id = req.params.id;
        let job = await Job.findById(id);
        res.render('edit',{job})
    } catch (error) {
        console.log('error while editing the job', error)
    }
});

router.patch('/jobs/:id',async (req,res)=>{
    // res.send(req.body);
    try {
        let id = req.params.id;
        let updatedJob = {
            name: req.body.name,
            exp: req.body.exp,
            address: req.body.address,
            pakage: req.body.pakage,
            logo: req.body.logo,
            deadline: req.body.deadline,
            info: req.body.info,
            type: req.body.type

        }
        try {
            let notif = new notification({
                body: "A Job Has Been Updated",
                author: updatedJob.name
            })
            await notif.save();
        } catch (error) {
            console.log('error while postion a notification', error);
        }
        await Job.findByIdAndUpdate(id,updatedJob);
        res.redirect(`/jobs/${id}`);
    } catch (error) {
        console.log('error while updating the job', error)
    }
});

router.delete('/jobs/:id',isAdmin ,async(req,res)=>{
    // res.send('logic to delete job');
    try {
        let id = req.params.id;
        await Job.findByIdAndDelete(id);
        res.redirect('/jobs');
    } catch (error) {
        console.log('error while deleteing a job',error);
    }
});

// apply route

router.get('/jobs/:id/apply', isLoggedIn, async(req,res)=>{
    try {
        let id = req.params.id;
        let job = await Job.findById(id);
        for(let user of job.appliedUsers){
            if(user._id.equals(req.user._id)){
                return res.send('You can apply only once')
            }
        }
        job.appliedUsers.push(req.user);
        await job.save();
        console.log(job);
        res.redirect('/jobs')
    } catch (error) {
        console.log('error while appling for job', error);
    }
})
module.exports = router;