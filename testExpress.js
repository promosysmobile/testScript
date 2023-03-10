const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const loginResponse = {
    status:"ok",
    data:[
        {
           activity: "login"
        }

    ]
}

const dashboardResponse = {
    status:"ok",
    data:[
        {
           activity: "dashboard"
        }

    ]
}

const inputStatusResponse = {
    status:"ok",
    data:[
        {
           activity: "input_status"
        }

    ]
}

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.post('/post-test', (req, res) => {
	const jsonReq = req.body;
 	console.log('Request:', jsonReq.activity);
    var jsonContent = "";

    switch(jsonReq.activity) {
        case "login":
            jsonContent = JSON.stringify(loginResponse);
            break;

        case "dashboard":
            jsonContent = JSON.stringify(dashboardResponse);
            break;

        case "input_status":
            jsonContent = JSON.stringify(inputStatusResponse);
            break;

        default:
    } 

    res.end(jsonContent);
});

app.listen(8090, () => console.log(`Started server at http://localhost:8090!`));