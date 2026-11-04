const express = require("express");
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const PORT = 3000;


app.use(express.static(__dirname));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/wyszukaj/{:optionalArgument}', (req, res) => {
    res.send("<br><a href='/'>Return</a>");
});

app.get('/wyszukaj', (req, res)=>{
    const thisPath = req.query.input;
    if(thisPath != null && thisPath != ""){
        const parametrs = new URLSearchParams({userInput: req.query.input});
        // res.redirect(`/wyszukaj/${encodeURI(parametrs.toString())}`);
        console.log(parametrs);
        switch(thisPath){
            case "starcraft2":
            case "StarCraft2":
            case "StarCraft2":
            case "StarCraft 2":                
                res.redirect('/informacje/10');
                break;
            case "WarcraftIII":
            case "warcraftIII":
            case "Warcraft3":
            case "warcraft3":
                res.redirect('informacje/11');
                break;
            case "Command&Conquers":
            case "Command&conquers":
            case "command&conquers":
                res.redirect('/informacje/95');
                break;
            default:
                res.redirect('/anything');
                break;
        }
    }
    else{
        res.send("<form action='/wyszukaj' method='GET'>Enter something:<br><input type='text' name='input'><br><button type='submit'>Search</button></form><br><br><br><a href='/'>Return</a>");
    }
})


app.get('/informacje/:gameName', (req, res)=>{
    const id = req.params.gameName;
    switch(id){
        case "10":
            res.sendFile(path.join(__dirname, "starcraft2.html"));
            break;
        case "11":
            res.sendFile(path.join(__dirname, "warcraft3.html"));
            break;
        case "95":
            res.sendFile(path.join(__dirname, "command.html"));
            break;
        default:
            res.send("Nie znaleziono informacji :( <br><a href='/'>Return</a>")
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
    res.send(`<!DOCTYPE html><html lang="pl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Potwierdzenie</title><style>*{margin: 0;padding: 0;}body{margin: 5px;letter-spacing: 2px;word-spacing: 4px;background-color: black;color: ghostwhite;}</style></head><body><h1>Message has been accepted!<br></h1><a href="/">Powrót</a></body></html>`);
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

app.get('/usunCiasteczka', (req, res) =>{
    res
    .clearCookie('kategoria')
    .clearCookie('cookie1')
    .redirect("/preferencje");
});

app.post('/wynikPreferencji', (req, res) =>{
    // console.log(req.body.selector);
    res
    .cookie("kategoria", req.body.selector, {maxAge: 1000 * 3600 * 24 * 30})
    .cookie("cookie1", "Cookie - 🍪")
    .redirect('/ostatecznyWynikPreferecji');
});

app.get('/ostatecznyWynikPreferecji', (req, res)=>{
    res.send(`
        <!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Cookies</title><style>*{margin: 0;padding: 0;}body{margin: 5px;letter-spacing: 2px;word-spacing: 4px;background-color: black;color: ghostwhite;}ol > li{background-color: black;color: ghostwhite;}a{background-color: balck;color: ghostwhite;text-decoration: none;}button{background-color: transparent;border: 1px solid azure;        }</style></head>
<body><h3>Cookies:</h3><ol start='999'><li>${req.cookies.kategoria}</li><li>${req.cookies.cookie1}</li></ol><br><button><a href='/usunCiasteczka'>Delete cookies</a></button></body></html>
        `);
});

app.get('/preferencje', (req, res) => {
    res.sendFile(path.join(__dirname, "preferencje.html"));
});




app.get('/plik', (req, res) => {
    res.sendFile(path.join(__dirname, "informator.txt"))
});

app.get('/pobierz', (req, res) =>{
    res.download('informator.txt');
});

app.all('/dane', (req, res)=>{
    res.send(`<!DOCTYPE html><html lang="pl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Żądanie</title><style>*{margin: 0;padding: 0;}body{margin: 5px;letter-spacing: 2px;word-spacing: 4px;background-color: black;color: ghostwhite;}</style></head><body><h1>Informacja:<br></h1><p>Metoda żądania: ${req.method}</p><br><p>Adres żądania: ${req.originalUrl}</p><br><p>Ip klienta: ${req.ip}</p><br><br><a href="/">Powrót</a></body></html>`);
});

app.get('/status', (req, res)=>{
    res.set('X-Serwis', "MojaStrona").send(`
        <!DOCTYPE html>
<html lang="pl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Moja Strona</title><style>*{margin: 0;padding: 0;}body{margin: 5px;letter-spacing: 2px;word-spacing: 4px;background-color: black;color: ghostwhite;}</style></head><body><h1>Serwer działa poprawnie!<br></h1><a href="/">Powrót</a></body></html>`);
});


app.all('/{:anything}', (req, res) => {
    res.send(`<!DOCTYPE html><html lang="pl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>NotFound :(</title><style>*{margin: 0;padding: 0;}body{margin: 5px;letter-spacing: 2px;word-spacing: 4px;background-color: black;color: ghostwhite;}a{text-decoration: none;}</style></head><body><h1>404 Not found!<br></h1><a href="/">Powrót</a></body></html>`);
});



app.listen(PORT, console.log(`Server is active! http://localhost:${PORT}`));
