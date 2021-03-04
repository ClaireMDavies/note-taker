const express = require('express');
var PORT = process.env.PORT || 8080; 
const app = express();
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(PORT, function(){
    console.log("App listening on PORT:" + PORT);
});