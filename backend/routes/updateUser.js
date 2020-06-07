var express = require("express");
var router = express.Router();
var fs = require("fs");

router.put("/:id", (req, res) => {
  let userId = req.body.userPut.id;

  fs.readFile("./users.json", (err, data) => {
    if (err) throw err;
    var users = JSON.parse(data);

    var userFile = users.find((user) => user.id == userId);

    userFile.newsletter = req.body.userPut.newsletter;

    let updateUser = JSON.stringify(users, null, 2);

    fs.writeFile("./users.json", updateUser, (err) => {
      if (err) throw err;
      else
      console.log("Newsletter updated successfully")
    });

    res.send("Updated!");
  });
});

module.exports = router;