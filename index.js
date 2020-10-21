const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();



//app.use(logger);

//intialize a parser for post reqs
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//set up static website
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));