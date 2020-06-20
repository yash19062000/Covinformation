const mong = require('mongoose');

mong.Promise = global.Promise;

mong.connect('mongodb+srv://yash:himmatramka@cluster0-m0r78.mongodb.net/yash?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDb Connected'))
    .catch(err => console.log(err));

