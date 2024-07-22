// const express = require('express');
// const router = express.Router();
// const fetchuser = require('../middleware/fetchuser');
// const Notes = require('../model/login');

// router.get('/fetchallnotes', fetchuser, async (req, res) => {
//     try {
//         const notes = await Notes.find({ User: req.User.id }); // Assuming 'User' is the correct field name

//         res.json(notes);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server Error');
//     }
// });

// module.exports = router;


// notes.js


const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../model/Note');

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ User: req.User.id }); // Assuming 'User' is the correct field name

        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    
    }
});


router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({min: 3}),
    body('description', 'Enter a valid description').isLength({min: 5}),


], async (req,res) =>{

   try{
    const {title, description, tag} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const note = new Note({
        title,description,tag, User:req.User.id
    })

    const savedNote = await note.save()

    res.json(savedNote)

   }

   catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");

   }
})

// update

router.put('/updatenote/:id', fetchuser, async (req,res) => {
    const {title, description, tag} = req.body;

   try{
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}

    if(note.User.toString() !== req.User.id){

        if(!note){return res.status(401).send("Not found")}


    }
    const newNote = { title, description, tag };

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});

   }
   
   catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");
   }

})


// delete note
router.delete('/deletenote/:id', fetchuser, async (req,res) => {

   try{
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not found")}

    if(note.User.toString() !== req.User.id){

        if(!note){return res.status(401).send("Not found")}


    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted", note:note});

   }

   catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");
   }

})




module.exports = router;
