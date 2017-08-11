/**
 * Created by Ahmed Shaban on 11/08/2017.
 */
var EndUsers = require('./Models/EndUsers');
module.exports = function (express) {
    var api = express.Router();

    api.route('/login')
        .post(function (req, res) {
            var company = new Company({
                name: req.body.name,
                description: req.body.description,
                Phone: req.body.Phone
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