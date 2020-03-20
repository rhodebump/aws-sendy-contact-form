var AWS = require('aws-sdk');
var ses = new AWS.SES();
var querystring = require('querystring');
var https = require('https');

var SENDY_API_KEY = 'TODO';
var RECEIVER = 'phillip@TODO.com';
var SENDER = 'phillip@TODO.com';



var response = {
    "isBase64Encoded": false,
    "headers": {
        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Credentials": true,
    },
    "statusCode": 200,
    "body": "{\"result\": \"Success.\"}"
};

exports.handler = function (event, context) {
    console.log('Received event:', event);
    sendEmail(event, function (err, data) {
        context.done(err, null);
    });
};


function subscribe(event, done) {
    var post_data = querystring.stringify({
        'api_key': SENDY_API_KEY,
        'name': event.name,
        'email': event.email,
        'list': event.list_id
    });

    // An object of options to indicate where to post to
    var post_options = {
        host: 'theclement.com',
        port: '443',
        path: '/sendy/subscribe',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };


    var post_req = https.request(post_options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();
}

function sendEmail(event, done) {
    var params = {
        Destination: {
            ToAddresses: [
                RECEIVER
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'name: ' + event.name + '\nphone: ' + event.phone + '\nemail: ' + event.email + '\ndesc: ' + event.desc + '\nconsent: ' + event.consent + '\nlist_id: ' + event.list_id,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Website Referral Form: ' + event.name,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    };
    ses.sendEmail(params, done);
    if (event.consent === true) {

        subscribe(event, done);
    }






}

