const moment = require("moment");

//middleware
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalURL}: ${moment().format}`);
    next();
};

module.exports = logger;