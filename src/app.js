const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport');
const { use } = require('passport');


// Inicializations
const app = express();
require('./config/passport');

// Settings



app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", exphbs({
  defaultLayout: "main",
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
  extname: ".hbs",
})
);
app.set("view engine", ".hbs");


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'));
app.use(session({

  secret: '$2a$12$lTiu1LgbWEr38NWPMelLmulrZZ4e7R7kYOswBFJBDEE0rDNnfycn6',
  resave: true,
  saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Global variables
app.use((req, res, next) => {

  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})


// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/publicaciones.routes'));
app.use(require('./routes/usuarios.routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.render("404");
});


module.exports = app;