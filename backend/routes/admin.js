var express = require("express");
var router = express.Router();
var fs = require("fs");

router.get("/", function (req, res) {

    let currentUsers;
    var emails = [];
    fs.readFile("./users.json", (err, data) => {
      if (err) throw err;
      currentUsers = JSON.parse(data);
      const email = currentUsers.filter((user) => {
        return user.newsletter === true;
      });
      email.forEach((element) => {
        emails.push(element.email && element.newsletter === true);
      });

      let html = "";
      html += "<html>";
      html += "<body>";
      currentUsers.forEach((user) => {
        html += "<br><div>";
        html += "<li>";
        html += "<l>";
        html += user.email + " " + user.newsletter;
        html += "</l>";
        html += "</li>";
        html += "</div>";
      });
      html += "</body>";
      html += "</html>";
      res.send(html);
    });
});

module.exports = router;