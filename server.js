const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/angular2048'));
app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/angular2048/'});
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);