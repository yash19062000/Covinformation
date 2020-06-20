const path = require('path');
const exp = require('express');
const cors = require('cors');
const bodypar = require('body-parser');
const port = 3000;
require('./config/database');

const application = exp();

const poll = require('./routes/poll');
//Setting up the public folder
//used to serve static file in Express. dirname/public will be used
application.use(exp.static(path.join(__dirname, 'public')));

//Body Parser Middleware
application.use(bodypar.json());
// the URL-encoded data will instead be parsed with the querystring library
application.use(bodypar.urlencoded({ extended: false }));


application.use(cors());

//anything that goes to /poll should reflect in poll.js
application.use('/poll', poll);

//starts the server
application.listen(port, () => console.log('Server started on port'));

