// Setup basic express servernpm install
var debug = true;

var port = debug ? 7777 : 27016;

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();
var server = require('http').createServer(app);
var fs = require('fs');
var formidable = require('express-formidable');

var upload = multer({ dest: "images/"});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.fieldname + '-' + Date.now())
  }
})

server.listen(port, function() {
  console.log('Server listening at port %d', port);
});
// Routing
app.use('/', express.static(__dirname + '/public')); 

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 
  
function sendIt(res) {
  res.send("Image uploaded, thanks a lot!");
}
 
app.post('/upload',upload.single("upload"),function(req,res){
  console.log(req.file);
 console.log("image uploaded");
 fs.renameSync("images/" + req.file.filename,"images/" + Date.now() + "-" + req.file.originalname);
 sendIt(res);
});

