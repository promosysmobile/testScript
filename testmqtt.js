const mqtt = require('mqtt')
const host = 'm14.cloudmqtt.com'
const port = '16975'
const clientId = 'testMacosCliendt'

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: 'rphaalsf',
  password: 'KiwgXa0teROq',
  reconnectPeriod: 1000,
})

const subTopic = 'mySubTopic'
const pubTopic = 'myPubTopic'

function returnJson(whichCommand){

    switch(whichCommand) {
        case 'login':
            return JSON.stringify(
                {
                    "status":"ok",
                    "activity":"login",
                    "data":{
                        "user_id":"PAM123"
                    }
                }
            );

        case 'req_sites':
            return JSON.stringify(
                {
                    "status":"ok",
                    "activity":"req_sites",
                    "data":{
                        "result":[
                            {
                                "site_id":"ID001",
                                "site_name":"KOLAM TENGAH"
                            },
                
                            {
                                "site_id":"ID002",
                                "site_name":"KOLAM TEPI"
                            },
                
                            {
                                "site_id":"ID003",
                                "site_name":"KOLAM BELAKANG"
                            }
                        ]
                    }
                }
            );

        case 'req_site_input':
            return JSON.stringify(
                {
                    "status":"ok",
                    "activity":"req_site_input",
                    "data":{
                        "site_id":"ID001",
                        "site_name":"KOLAM TENGAH",
                        "result":[
                            {
                                "input_num":1,
                                "input_name":"DOOR OPEN",
                                "input_stat": 1
                            },
                
                            {
                                "input_num":2,
                                "input_name":"TNB NORMAL",
                                "input_stat": 1
                            },
                
                            {
                                "input_num":3,
                                "input_name":"POWER TRIP",
                                "input_stat": 2
                            },
                
                            {
                                "input_num":4,
                                "input_name":"PUMP 1",
                                "input_stat": 1
                            },
                
                            {
                                "input_num":5,
                                "input_name":"PUMP 2",
                                "input_stat": 2
                            },

                            {
                                "input_num":6,
                                "input_name":"PUMP 3",
                                "input_stat": 2
                            },

                            {
                                "input_num":7,
                                "input_name":"PUMP 4",
                                "input_stat": 0
                            },

                            {
                                "input_num":8,
                                "input_name":"PUMP 5",
                                "input_stat": 0
                            },
                        ]
                    }
                }
            );

        case 'req_site_output':
            return JSON.stringify(
                {
                    "status":"ok",
                    "activity":"req_site_output",
                    "data":{
                        "site_id":"ID001",
                        "site_name":"KOLAM TENGAH",
                        "result":[
                            {
                                "output_num":1,
                                "output_name":"TNB TRIP",
                                "output_stat": 1
                            },
                
                            {
                                "output_num":2,
                                "output_name":"MODBUS",
                                "output_stat": 1
                            },
                
                            {
                                "output_num":3,
                                "output_name":"LED 1",
                                "output_stat": 2
                            },
                
                            {
                                "output_num":4,
                                "output_name":"LED 2",
                                "output_stat": 0
                            },
                            {
                                "output_num":5,
                                "output_name":"PUMP 1",
                                "output_stat": 1
                            },
                            {
                                "output_num":6,
                                "output_name":"POWER",
                                "output_stat": 2
                            },
                            {
                                "output_num":7,
                                "output_name":"DOOR",
                                "output_stat": 2
                            },
                            {
                                "output_num":8,
                                "output_name":"WATER LEVEL",
                                "output_stat": 0
                            }
                        ]
                    }
                }
            );

        case "set_output":   
            return JSON.stringify(
                {
                    "status":"ok",
                    "activity":"set_output",
                    "data":{
                        "user_id":"PAM123"
                    }
                }
            ); 

        default:
            return "Invalid Command";
    } 
}

function publishReply(x) { 
    client.publish(pubTopic, x, { qos: 0, retain: false }, (error) => {
        if (error) {
          console.error(error)
        }
      }
    )
}

client.on('connect', () => {
  console.log('Connected')
  client.subscribe([subTopic], () => {
    console.log(`Subscribe to topic '${subTopic}'`)
  })

})

client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
  const obj = JSON.parse(payload.toString());

  switch(obj.activity) {
    case 'login':
    case 'req_sites':
    case 'req_site_input':
    case 'req_site_output':
    case 'set_output':
        publishReply(returnJson(obj.activity));
      break;

    default:
        publishReply("Invalid Command");
  } 

})