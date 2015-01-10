var express = require('express');
var path = require('path');
var app = express();
var Firebase = require('firebase');
var ref = new Firebase('https://yourfireceurl');

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/room/:roomId', function(req, res) {
  var roomId = req.param('roomId');
  ref.child('room-metadata/').orderByChild('name').equalTo(roomId).on('value', function(snapshot) {
    if (snapshot.hasChildren()) {
      snapshot.forEach(function(snap) {
        var id = snap.child('id').val();
        res.render('index', {
          roomId: id
        });

      });
    } else {
      res.render('index', {
        roomId: ''
      });

    }
  });


});

app.listen(2000, function() {
  console.log('listening on *:2000');
});
