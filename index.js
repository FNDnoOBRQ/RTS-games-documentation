const express = require("express");
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const PORT = 3000;


app.use(express.urlencoded({extended: true}));



app.get('/wyszukaj', (req, res)=>{
    const thisPath = req.query.input;
    if(thisPath != null && thisPath != ""){
        res.send(thisPath + " <br><a href='/'>Return</a>");
    }
    else{
        res.send("<form method='GET'>Enter something:<br><input type='text' name='input'><br><button type='submit'>Send</button></form><br><br><br><a href='/'>Return</a>");
    }
})


app.get('/informacje/:gameName', (req, res)=>{
    const id = req.params.gameName;
    switch(id){
        case "10":
            res.send("StarCraft 2 <br><a href='/'>Return</a>");
            break;
        case "11":
            res.send("Warcraft III <br><a href='/'>Return</a>");
            break;
        case "95":
            res.send("Command and Conquer <br><a href='/'>Return</a>");
            break;
        default:
            req.send("Nie znaleziono informacji :( <br><a href='/'>Return</a>")
            break;
    }
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "mainPage.html"));
});




app.listen(PORT, console.log(`Server is active! http://localhost:${PORT}`));