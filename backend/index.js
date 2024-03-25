const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
var cors = require('cors')
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const passport = require( "passport" );
const User = require('./models/User');
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
const port = 8000;

app.use(cors())
app.use(express.json()); 

// MongoDB
const uri = "mongodb+srv://PiyushPPP:" + process.env.MONGO_PASSWORD + "@echo1.7lchz0i.mongodb.net/test?retryWrites=true&w=majority";
const connectToMongo = async()=>{
    try{
        const databaseInstance=await mongoose.connect(uri);
        console.log(`MongoDB Connected !! DB Host : ${databaseInstance.connection.host}`);
    }
    catch(error){
        console.log("Database Connection Failed : " ,error);
        process.exit(1)
    }
}

connectToMongo();


// Setup Passport JWT

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findOne({ _id: jwt_payload.identifier });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    } catch (err) {
        return done(err, false);
    }
}));

app.get("/" , (req, res)=>{
    res.send("Hello World");
});

app.use('/auth', authRoutes);
app.use('/song', songRoutes);
app.use('/playlist', playlistRoutes);

app.listen(port , ()=>{
    console.log("App is running on " + port);
});


