const express = require ('express');
const app = express();

app.get("/jose", (req, res)=>{
    res.send("Hello Jose!")
})

app.get("/" , (req, res)=>{

    res.send("Welcome to my backend API!")
})
app.listen(3000, ()=>{
    console.log("Listening");
})