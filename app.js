var morgan      = require('morgan');
var express     = require('express');
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var router      = express.Router();
var appRoutes   = require('./app/routes/api')(router);
var app         = express();
var port        = process.env.PORT || 8080;
var path        = require('path');
var passport    = require('passport');
var social      = require('./app/passport/passport')(app, passport);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/api', appRoutes);

mongoose.connect('mongodb://localhost:27017/SculptureFitnessDB',{ useMongoClient: true }, function(err) {
    if(err) {
        console.log('Not connected to the database: ' + err);
    } else {
        console.log('Successfully connected to SculptureFitness Database');
    }
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//Process.env.PORT - If deploying to an environment that requires a certain port then it will use that one.
app.listen(port, function() {
    console.log('Running The Server on port ' + port);
});


module.exports = app;
