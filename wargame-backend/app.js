const express = require("express");
const path = require("path");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize"); // for nosql injection
const xxs = require("xss-clean"); // for injection
const cookieParser = require("cookie-parser");
const compression = require("compression");
const rfs = require("rotating-file-stream");
require("colors");
require("winston-daily-rotate-file");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const { TeamAPI } = require("./components/team");

const Config = require("./config");
const { Error404, Error500, MulterError } = require("./modules/global-errors");

const app = express();
app.enable("trust proxy");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// ======================== cors ========================
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "origin", "x-csrf-token"],
    optionsSuccessStatus: 204,
    preflightContinue: false,
  })
);

// ======================== helmet ======================
app.use(
  helmet({
    // over-ridden by masking
    contentSecurityPolicy: false,
    hidePoweredBy: false,
    frameguard: {
      action: "deny",
    },
  })
);
app.use(helmet.noSniff());
// Sets "X-Download-Options: noopen"
app.use(helmet.ieNoOpen());
// Sets "X-XSS-Protection: 0"
app.use(helmet.xssFilter());
// Sets "X-Permitted-Cross-Domain-Policies: by-content-type"
app.use(
  helmet.permittedCrossDomainPolicies({
    permittedPolicies: "by-content-type", // none
  })
);

app.use(express.json());

// ====================== session ======================
app.use(
  session({
    name: "sid", // session_name
    secret:
      process.env.SESSION_SECRET || "7fa6f51e-92ae-4f9c-aaa5-9080a003f254", // secret to sign data
    cookie: {
      path: "/",
      httpOnly: true, // when setting this to true, as compliant clients will not allow client-side JavaScript to see the cookie in document.cookie
      signed: true,
      sameSite: "lax",
      maxAge: 1 * 24 * 60 * 60 * 1000, // Cookie expires after 1 day(about a semester)
      secure: process.env.NODE_ENV === "development" ? false : true, //If true, this cookie may only dilivered while https
    },
    rolling: true,
    // Forces the session to be saved
    // back to the session store
    resave: process.env.NODE_ENV === "development" ? false : true, // in production true
    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: false, // don't create session until something stored
    store: MongoStore.create({
      mongoUrl: Config.dbURI,
      ttl: 1 * 24 * 60 * 60, //1 day
      collectionName: "express_session",
      autoRemove: "native",
      touchAfter: 24 * 3600, // time period in seconds
      crypto: {
        secret: process.env.SESSION_SECRET,
      },
      mongoOptions: {
        useUnifiedTopology: true,
      },
      stringify: true,
    }),
  })
);

// ====================== body parser ======================
app.use(
  bodyParser.json({
    limit: "5mb",
  })
);

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Pretty API Responses
app.set("json spaces", 4);

// ====================== morgan ======================
morgan.token("remote-addr", function (req) {
  return req.headers["x-forwarded-for"] || req.ip;
});
// log the time taken in each request
app.use(morgan("tiny"));

// create a write stream (in append mode) to write the requests in file
let accessLogStream = rfs.createStream("morgan_access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "logs"),
});

app.use(
  morgan("combined", {
    stream: accessLogStream,
  })
);

// ====================== Cookie Parser ======================
app.use(cookieParser("war-games-secret"));

// ====================== Mongo Sanitize ======================
// Data sanitization against NoSQL Query injection
app.use(mongoSanitize()); // prevent from NoSQL injection like (email:{"$gt":""}) in body

// ====================== XXS =================================
// Data sanitization against cross-site scripting (XSS)
app.use(xxs()); // prevent if code contain html code or js code in body and convert it to symbols known

// ====================== compression =========================
app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// app.use('/api', Security.limiter);

app.get("/api", (req, res, next) => {
  console.log('aAA')
  res.status(200).render('email/welcome', {
    title: 'Your account',
    firstName: 'Sherif',
    code: 123456
  });
//  res.status(200).render('welcome');
})

app.use("/api/team", TeamAPI);

app.use(MulterError);
app.use(Error404);
app.use(Error500);

module.exports = app;
