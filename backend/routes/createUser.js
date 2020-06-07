var express = require("express");
var fs = require("fs");
var app = express();
var router = express.Router();


app.post("/", function (request, response) {
  response.send(request.body);

  var newUsername = request.body.user.username;
  var newPassword = request.body.user.password;
  var newEmail = request.body.user.email;
  

  console.log(newUsername);
  console.log(newEmail);
  console.log(newPassword);


  if (newPassword === newPassword) {
    console.log("Password Match!!");

      fs.readFile("./users.json", (err, data) => {
        var userExist = false;

        if (err) throw err;
        var users = JSON.parse(data);

        users.forEach((usersFromFile) => {
          if (usersFromFile.username === newUsername) userExist = true;
        });

        if (userExist === false) {
          let userId = 0;
          users.forEach((element) => {
            userId++;
          });
          newUser = {
            id: userId + 1,
            username: newUsername,
            password: newPassword,
            email: newEmail,
            newsletter: false,
          };
          users.push(newUser);
          var saveUser = JSON.stringify(users, null, 2);
          fs.writeFile("./users.json", saveUser, (err, data) => {
            if (err) throw err;
          });
        } else {
          console.log("User Alredy Exists!");
        }
      });
  } 
});


app.listen(9003);

module.exports = app;