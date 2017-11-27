/**
 * Module dependencies.
 */

var express = require('express')
  //, routes = require('./routes')
  //, user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , EmployeeProvider = require('./employeeprovider').EmployeeProvider;

var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  //app.set('view engine', 'jade');
  app.set("view engine", "ejs")
  app.set('view options', { layout: false });
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

var employeeProvider = new EmployeeProvider('192.168.1.140', 27017);

//Routes

//index
app.get('/', function (req, res) {
    res.render('index');
});

app.get("/api/LoadEmployees", function (req, res) {
    employeeProvider.findAll(function (error, emps) {
        res.send(emps);
    });
})


//save new employee
app.post('/api/SaveEmployee', function (req, res) {
    var data = req.body;

    debugger;

    if (data._id != null) {
        employeeProvider.update(data._id, data, function (error, docs) {
            res.send(data._id);
        });
    }
    else {
        employeeProvider.save(data, function (error, docs) {
            res.send(docs._id);
        });
    }
});

//delete an employee
app.post('/api/DeleteEmployee', function (req, res) {
  employeeProvider.delete(req.body.id, function (error, docs) {
    res.send(true);
  });
});

app.listen(process.env.PORT || 3000);