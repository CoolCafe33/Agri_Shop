var express = require('express');
var cors = require('cors');

var app = express();
var port = 3000;

var bodyParser = require('body-parser');
var path = require('path')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(cors());

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1/customer-details");

app.get("/", (req, res) => {
  console.log("Hello There");
  const filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath);
  // res.redirect(path.join(__dirname,"./index.html"));
});

var cSchema = new mongoose.Schema({
    username : String,
    email: String,
    password: String,
    confirmPassword: String
});

var cUser = mongoose.model("cUser", cSchema);

app.post('/csubmit', async (req, res) => {
      const formData = await  new cUser({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    });
    formData.save()
      .then(() => {
        console.log('Data saved to MongoDB');
        res.sendStatus(200);
        // res.redirect('/cust-view.html');
      })
      .catch((error) => {
        console.error('Error saving data to MongoDB:', error);
        res.sendStatus(500);
      });
  });

  app.listen(port, () => {
    console.log("Server listening on port " + port);
});