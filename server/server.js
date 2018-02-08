const path = require('path');
const express = require('express');


const publicPath = path.join(__dirname, '../public');
const port = process.env || 3000;
//console.log(publicPath);

var app = express();

app.use(express.static(publicPath));
 
app.listen(port, () => {

 console.log(`server up to port ${port}`);

});
