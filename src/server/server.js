let path = require('path')
let express = require('express');
let app = express();
let bodyParser = require('body-parser')
const cors = require('cors');

//all routes endpoint 
let projectData = {};


app.use(cors())

app.use(bodyParser.json())  // to use json
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static('dist'));

//Get route
app.get('/', function(req, res){
    res.sendFile('dist/index.html');
});

// Post route
app.post('/add', postInfo );

function postInfo(req,res){
    projectData['depCity'] = req.body.depCity;
    projectData['arrCity'] = req.body.arrCity;
    projectData['depDate'] = req.body.depDate;
    projectData['weather'] = req.body.weather;
    projectData['daysLeft'] = req.body.daysLeft;
    res.send(projectData);

}

//Spin the server

const port = 3000;
const server = app.listen(port, listening);

function listening(){
    console.log(`Server starts on port ${port}`);
}
