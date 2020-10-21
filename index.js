const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const handle = require('express-handlebars');
const app = express();
const members = require('./member_list');
// handlebars middleware
app.engine('handlebars', handle({defaultLayout: "main"}));
app.set('view engine', 'handlebars');

//app.use(logger);

//intialize a parser for post reqs
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => res.render('index', {
    title: 'member app',
    members
}));


//set up static website
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));