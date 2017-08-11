/**
 * Created by Ahmed Shaban on 11/08/2017.
 */
var EndUsers = require('./Models/EndUsers');
module.exports = function (express) {
    var api = express.Router();

    api.route('/login')
        .post(function (req, res) {
            var company = new Company({
                UserPass: req.body.UserPass,
                Email: req.body.Email
            });
            EndUsers.save(function (err) {
                if (err) {
                    res.sendStatus(406);
                    return;
                }
                res.status(200).json({message: 'company has been created'});
            });
        });

    api.route('/register')
        .post(function (req, res) {
            var company = new Company({
                UserPass: req.body.UserPass,
                UserPass: req.body.UserPass,
                UserPass: req.body.UserPass,
                Email: req.body.Email
            });
            EndUsers.save(function (err) {
                if (err) {
                    res.sendStatus(406);
                    return;
                }
                res.status(200).json({message: 'company has been created'});
            });
        });
    return api;
};