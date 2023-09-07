const express = require('express')
const app = express()

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var AWS = require("aws-sdk");

AWS.config.getCredentials(function (err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
        console.log("Access key:", AWS.config.credentials.accessKeyId);
    }
});

AWS.config.update({ region: "eu-central-1" });

var translate = new AWS.Translate();




app.post('/', (req, res) => {
    if (!req.body.v || req.body.v.length < 1) return res.status(500).send('invalid request')


    let params = {
        SourceLanguageCode: req.body.lang,
        TargetLanguageCode: 'ar',
        Text: req.body.v
    };

    translate.translateText(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else res.send(data.TranslatedText);
    });
})


app.listen(3393, (err) => {
    if (!err) console.log('server running on http://localhost:3393')
    else console.log(err)
})