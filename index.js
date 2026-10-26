const express = require("express");
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const PORT = 3000;


let temporary = "";

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/wyszukaj/{:optionalArgument}', (req, res) => {
    res.send(temporary + "<br><a href='/'>Return</a>");
});

app.get('/wyszukaj', (req, res)=>{
    const thisPath = req.query.input;
    temporary = thisPath
    if(thisPath != null && thisPath != ""){
        const parametrs = new URLSearchParams({
            userInput: req.query.input,
        });
        res.redirect(`/wyszukaj/${encodeURI(parametrs.toString())}`);
    }
    else{
        res.send("<form action='/wyszukaj' method='GET'>Enter something:<br><input type='text' name='input'><br><button type='submit'>Search</button></form><br><br><br><a href='/'>Return</a>");
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
});


app.get('/kontakt', (req, res)=>{
    res.sendFile(path.join(__dirname, "kontakt.html"));
});

app.post('/sprawdzaniePol', (req, res)=>{
    const name = req.body.name;
    const message = req.body.message;
    if(name != "" && message != ""){
        res.redirect('/potwierdzenie');
    }
    else{
        res.redirect('/kontakt');
    }
});


app.get('/potwierdzenie', (req, res) =>{
    res.send("Message has been accepted!")
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "mainPage.html"));
});


app.get('/api', (req, res) =>{
    const array = [
        {"first posible option: " : "Starcraft Brood War"},
        {"second posible option: " : "Civilization V"},
        {"third posible option: " : "Command & Conquer: Red Alert 2"},
        {"fourth posible option: " : "Age of Empires II"},
        {"fifth posible option: " : "Company of Heroes"}
    ];
    res.json(array);
});



app.get('/preferencje', (req, res) => {
    res.sendFile(path.join(__dirname, "preferencje.html"));
});

app.get('/usunCiasteczka', (req, res) =>{
    res
    .clearCookie('kategoria')
    .clearCookie('cookie1')
    .redirect("/preferencje");
});

app.post('/wynikPreferencji', (req, res) =>{
    console.log(req.body.selector);
    res
    .cookie("kategoria", req.body.selector, {maxAge: 1000 * 3600 * 24 * 30})
    .cookie("cookie1", "Cookie - 🍪")
    .send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <p>First cookie: ${req.cookies.kategoria}</p>
            <p>Second cookie: ${req.cookies.cookie1}</p>
            <button onclick="window.location.href='/usunCiasteczka'">Delete cookies</button>
        </body>
        </html>
    `);
});




app.listen(PORT, console.log(`Server is active! http://localhost:${PORT}`));