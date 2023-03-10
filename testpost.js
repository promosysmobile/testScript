var http = require('http'); 


const REQUIRED_CONTENT_TYPE = 'application/json';
const ACCEPT_ENCODING_1 = 'application/json';
const ACCEPT_ENCODING_2 = '*/*';

const entryCheck = function (req) {

  const contentType = req.headers["content-type"];
  if (!contentType.includes(REQUIRED_CONTENT_TYPE)) {
    throw new Error("Sorry we only support content type as json format.");
  }
  
  const accept = req.headers["accept"];
  if (!(accept.includes(ACCEPT_ENCODING_1) || accept.includes(ACCEPT_ENCODING_2))) {
    throw new Error("Sorry we only support accept json format.");
  }


}


const requestListener = function (req, res) {

     const headers = {
        'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        /** add other headers as per requirement */
    };

    const responseData = {
        status:"ok",
        data:[
            {
               activity: "login"
            }
   
        ]
    }

    const getRequestBodyAndGenerateResponse = (req, res, callback) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        callback(res, JSON.parse(body));
      });

    }

    const postMethodHandler = (res, body) => {
      try {
        let reqBody = body;
    
        res.writeHead(200,headers);
        const jsonContent = JSON.stringify(responseData);
        res.end(jsonContent);
        //res.end(`The Employee object with id is ${reqBody._id} added.`);
      }catch (error) {
        res.writeHead(400,headers);
        res.end(error.message);
      }
    }


    try {
        entryCheck(req);
        const methodType = req.method.toUpperCase();

        switch(methodType){
          case 'GET':
            break;
          case 'POST':
            getRequestBodyAndGenerateResponse(req, res, postMethodHandler);
            break;
          case 'PUT':
            break;
          case 'DELETE':
            break;
        }


    } catch (error) {
        res.writeHead(400,headers);
        res.end(error.message);
    }

}

const server = http.createServer(requestListener);
server.listen(8090);
console.log('Node.js web server at port 8090 is running..')

/*

var server = http.createServer(function (req, res) {   
   
    if (req.url == '/data') { //check the URL of the current request
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ message: "Hello World"}));  
            res.end();  
    }
});

server.listen(8080);

*/
