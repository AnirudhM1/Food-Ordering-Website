const mongoose = require('mongoose');

// Connecting to mongodb database via mongoose
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/food-ordering-app',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
);

// Checking if mongoose is connected to the database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});
