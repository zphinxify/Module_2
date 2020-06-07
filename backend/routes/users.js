var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.post('/', function(req, res) {
  var loginSuccess;
  var user = req.body.user.username;
  var pass = req.body.user.password;

  fs.readFile("./users.json", (err,data) => {
    if(err) throw err;
    var users = JSON.parse(data);
    users.forEach((userInFile) => {
      if(user === userInFile.username && pass === userInFile.password) {
          loginSuccess = true;
      }
      else
      console.log("We couldn't find that user...");
      if (loginSuccess === true) {
        userLoggedIn = {
          id: userInFile.id,
          username: userInFile.username,
          email: userInFile.email,
          newsletter: userInFile.newsletter,
        };
        console.log("User logged in successfully!");
        loginSuccess = userLoggedIn;
        res.send(loginSuccess);
      }
    })
  })
});

module.exports = router;
