var express = require("express")
var fortune = require("./lib/fortune.js")
// var app = express()
// app.set("port", process.env.PORT || 3000)
//
// app.get("/", function(req, res) {
//     res.type("text/plain")
//     res.send("Meadowlark Travel")
// })
//
// app.get("/about", function(req, res) {
//     res.type("text/plain")
//     res.send("About Meadowlark Travel")
// })
//
//
// // 定制 404
// app.use(function(req, res) {
//     res.type("text/plain")
//     res.status(404)
//     res.send("404-Not Found")
// })
//
// // 定制 500
// app.use(function(err, req, res, next) {
//     console.log(err.stack)
//     res.type("text/plain")
//     res.status(500)
//     res.send("500-Server Error")
// })
//
// app.listen(app.get("port"), function() {
//     console.log("Express started on http://localhost:" +
//         app.get("port") + "; press Ctrl-C to terminate.")
// })


var app = express()
app.set("port", process.env.PORT || 3000)
var handlebars = require("express3-handlebars")
                .create({ defaultLayout: "main"})
app.engine("handlebars", handlebars.engine)
app.set("view engine", "handlebars")

// var app = express();
// app.set("port", process.env.PORT || 3000)
// 设置 handlebars 视图 引擎
// var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
// app.engine('handlebars', handlebars.engine);
// app.set('view engine', 'handlebars');

// var exphbs = require('express-handlebars');
// app.engine('handlebars', exphbs.create({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');

// var app = express()
// var handlebars = require('express3-handlebars')
// .create({ defaultLayout:'main' });
// app.engine('handlebars', handlebars.engine);
// app.set('view engine', 'handlebars');

// app.get("/", function(req, res) {
//     res.render("home")
// })

// app.use("express.static(__dirname + '/public')")

app.use(function(req, res, next) {
    res.onlocals.showTests = app.get("env") !== "production" && req.query.test === "1"
    next()
})


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
res.render('home');
});

// app.get("/about", function(req, res) {
//     var randomFortune = fortunes[Math.floor( Math.random() * fortunes.length)];
//     console.log(randomFortune)
//     res.render("about", {fortune: randomFortune})
// })

app.get("/about", function(req, res) {
    res.render("about", {fortune: fortune.getFortune()})
})

// app.get('/about', function(req,res){
// 	res.render('about', { fortune: fortune.getFortune() } );
// });


app.use("404", function(req, res, next) {
    res.status(404)
    res.render("404")
})

app.use("500", function(err, req, res, next) {
    console.log(err.stack)
    res.status(500)
    res.render("500")
})

app.listen(3000, function() {
    console.log("this is running.")
})
