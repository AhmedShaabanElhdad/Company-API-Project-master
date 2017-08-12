/**
 * Created by Ahmed Shaban on 11/08/2017.
 */

var EndUsers = require('./Models/EndUsers');
var Article = require('./Models/Articles');

module.exports = function (express) {
    var api = express.Router();

    api.route('/login')
        .post(function (req, res) {
            EndUsers.find({"UserPass": req.body.UserPass, "Email": req.body.Email}, function (err, user) {
                if (err) {
                    console.log(err);
                    res.status(406).json({status: -1, msg: err.message})
                    return;
                }
                console.log(user, req.body.UserPass, req.body.Email)
                res.status(200).json({status: 1, user: user});
            })
        });


    api.route('/register')
        .post(function (req, res) {
            var enduser = new EndUsers({
                UserName: req.body.UserName,
                UserPass: req.body.UserPass,
                Email: req.body.Email,
                Mobile: req.body.Mobile,
                role: 'user'
            });
            enduser.save(function (err) {
                if (err) {
                    res.status(406).json({status: -1, msg: err.message})
                    //res.sendStatus(406);
                    return;
                }
                res.status(200).json({status: 1, msg: "user created Successfully"});
            });
        });

    api.route('/endusers')
        .get(function (req, res) {
            EndUsers.find({}, function (err, data) {
                if (err) {
                    console.log(err);
                    res.json({status: -1, msg: err.message})
                }
                res.status(200).json({status: 1, users: data});
            });
        });

    api.route('/article')
        .get(function (req, res) {
            Article.find({}, function (err, data) {
                if (err) {
                    console.log(err);
                    res.json({status: -1, msg: err.message})
                }
                res.status(200).json({status: 1, article: data});
            });
        });

    return api;
};