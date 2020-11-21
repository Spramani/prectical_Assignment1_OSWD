const express = require('express');
const router = express.Router();

const student = require('../models/student');


//get routes starts here
router.get('/', (req, res)=> {
    student.find({})
        .then(students => {
            res.render('index', {students : students});
        })
        .catch(err=> {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        })
    
});

router.get('/student/new', (req,res)=> {
    res.render('new');
});

router.get('/student/search', (req,res)=> {
    res.render('search', {student:""});
});

router.get('/student', (req,res)=> {
    let searchQuery = {name : req.query.name};

    student.findOne(searchQuery)
        .then(student => {
            res.render('search', {student:student});
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });

});

router.get('/edit/:id', (req, res)=> {

    let searchQuery = {_id : req.params.id};
    student.findOne(searchQuery)
        .then(student => {
            res.render('edit', {student:student});
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });

});

//get routes ends here


//post routes starts here
router.post('/student/new', (req,res)=> {
    let newstudent = {
        name : req.body.name,
        department : req.body.department,
        year : req.body.year
    };

    student.create(newstudent)
        .then(student => {
            req.flash('success_msg', 'Student data added to database successfully.')
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });
});

//post routes end here

//put routes starts here

router.put('/edit/:id', (req, res)=> {
    let searchQuery = {_id : req.params.id};

    student.updateOne(searchQuery, {$set: {
        name : req.body.name,
        department : req.body.department,
        year : req.body.year
    }})
    .then(employee => {
        req.flash('success_msg', 'student data updated successfully.')
        res.redirect('/');
    })
    .catch(err => {
        req.flash('error_msg', 'ERROR: '+err)
        res.redirect('/');
    });
});

//put routes ends here


//delete routes starts here
router.delete('/delete/:id', (req, res)=> {
    let searchQuery = {_id : req.params.id};

    student.deleteOne(searchQuery)
        .then(student=>{
            req.flash('success_msg', 'Student deleted successfully.')
            res.redirect('/');
        })
        .catch(err => {
            req.flash('error_msg', 'ERROR: '+err)
            res.redirect('/');
        });
});

//delete routes ends here
module.exports = router;