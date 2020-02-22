const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const direction = require('../index.js')

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  //console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET') {
    if (req.url === '/?yo%20bi%20please') {
      // send the image
      fs.readFile(module.exports.backgroundImageFile, function(error, content) {
        if (error) {
          res.writeHead(404, headers);
          console.log(error);
          res.end('didnt work dummy');
        } else {
          res.writeHead(200, headers);
          res.end(content);
        }
      });
    }
    if (req.url === '/?refresh') {
      res.writeHead(200, headers);
      //var options = ['up', 'down', 'left', 'right'];
      //var randomOption = options[Math.floor(Math.random() * 4)];
      res.write(direction.getCurrentDirection());
    }
  }
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
