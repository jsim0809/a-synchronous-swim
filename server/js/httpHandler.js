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

module.exports.router = (req, res, next = () => { }) => {
  //console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'GET') {
    if (req.url === '/?yo%20bi%20please') {
      // send the image
      console.log(module.exports.backgroundImageFile);
      fs.readFile(module.exports.backgroundImageFile, 'base64', function (error, content) {
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
      res.end();
    }
  } else if (req.method === 'POST') {
    var data = [];
    req.on('data', (chunk) => {
      data.push(chunk);
    });

    req.on('end', () => {
      // console.log('BOUNDARY HERE: ',multipart.getBoundary(Buffer.concat(data)));
      // console.log('PARSE HERE: ',multipart.parse(Buffer.concat(data)));
      //data = data.toString('base64');

      var extractedFile = multipart.getFile(Buffer.concat(data));

      fs.writeFile(module.exports.backgroundImageFile, extractedFile.data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
      res.writeHead(200, headers);
      res.end('ok');
    });
  }
  next(); // invoke next() at the end of a request to help with testing!
};
