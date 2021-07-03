if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}


const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connecting to mongodb database via mongoose

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/food-ordering-app', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


// Port on which server will run on 

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});