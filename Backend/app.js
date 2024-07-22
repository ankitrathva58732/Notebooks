// const express = require("express");
// const mongoose = require("mongoose");

// const router = require("./routes/auth");




// const app = express();

// app.use(express.json());


// // app.use(express.json);
// // app.use("/login",router);
// // app.use("/getr", router);


// app.get("/", (req,res) => {
//     res.send("Good evening");
// })

// app.use("/auth", router);
// app.use("/notes", router);



// // app.get("/api", (req,res) =>{
// //     res.send("Api call back");
// // })


// // app.get("/auth", (req,res) =>{
// //     res.send("auth call back");
// // })


// mongoose
// .connect(
//     "mongodb://127.0.0.1:27017/doctor"
// )
// .then(() => console.log("Connected to database"))
// .then(()=>{
//     app.listen(5000);
// }).catch((err) => console.log(err));



// // const express = require('express')
// // const app = express()
// // const port = 3000

// // app.get('/', (req, res) => {
// //   res.send('Hello World!')
// // })

// // app.listen(port, () => {
// //   console.log(`Example app listening on port ${port}`)
// // })



// app.js
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const notesRouter = require("./routes/notes"); // Import the new notes router
var cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Good evening");
});

app.use("/auth", authRouter);
app.use("/notes", notesRouter); // Use notesRouter for "/notes" path

mongoose.connect("mongodb://127.0.0.1:27017/doctor")
    .then(() => console.log("Connected to database"))
    .then(() => {
        app.listen(5000);
    })
    .catch((err) => console.error(err));
