const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/servicenet'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/servicenet/index.html'));
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Site da Service net no ar :)');
});
