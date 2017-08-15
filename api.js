/**
 * Created by Ahmed Shaban on 11/08/2017.
 */
var fs = require('fs');
var EndUsers = require('./Models/EndUsers');
var Articles = require('./Models/Articles');

module.exports = function (express) {
    var api = express.Router();

    /********************************************* Users **********************************************/

    api.route('/login')
        .post(function (req, res) {
            EndUsers.find({"UserPass": req.body.UserPass, "Email": req.body.Email}, function (err, user) {
                if (err) {
                    console.log(err);
                    res.status(406).json({status: -1, msg: err.message})
                    return;
                }
                console.log(user, req.body.UserPass, req.body.Email);
                if (user.length == 0)
                    res.json({status: -1, msg: "username or password is wrong"})
                else
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

    /********************************************* Likes **********************************************/

    api.route('/addlike/:userid')
        .post(function (req, res) {

            var favourite = {
                ArticleUrl: req.body.ArticleUrl,
                ArticleId: req.body.ArticleId,
            };

            Articles.findOneAndUpdate({"_id": req.params.userid}, {"$push": {"Favourite": favourite}}, {
                safe: true,
                upsert: true
            }, function (err) {
                if (err) {
                    console.log(err)
                    res.status(406).json({status: -1, msg: err.message})
                    //res.sendStatus(406);
                    return;
                }
                res.status(200).json({status: 1, msg: "Comment created Successfully"});
            });
        });
    /********************************************* AddFavourite **********************************************/

    api.route('/addfavourite/:userid')
        .post(function (req, res) {

            var FavouriteCategory = [];
            for (var i = 0; i < req.body.length; i++) {

                FavouriteCategory.push({SectionId: req.body["fav" + i]});
            }

            console.log("FavouriteCategory", FavouriteCategory)

            EndUsers.FavouriteCategory = [];


            EndUsers.findOneAndUpdate({"_id": req.params.userid}, {"$set": {"FavouriteCategory.0": FavouriteCategory}}, {
                safe: true,
                upsert: true
            }, function (err) {
                if (err) {
                    console.log(err)
                    res.status(406).json({status: -1, msg: err.message})
                    //res.sendStatus(406);
                    return;
                }
                res.status(200).json({status: 1, msg: "Favourites updated Successfully"});
            });
        });


    /********************************************* Articles **********************************************/

    api.route('/article')
        .get(function (req, res) {
            Articles.find({}, function (err, data) {
                if (err) {
                    console.log(err);
                    res.json({status: -1, msg: err.message})
                }
                //var start =req.query.start
                //res.status(200).json({status: 1, articles: data.slice(start,start+10)});
                res.status(200).json({status: 1, articles: data});
            });
        });

    api.route('/article/:_id')
        .get(function (req, res) {
            Articles.findOne({"_id": req.params._id}, function (err, data) {
                if (err) {
                    console.log(err);
                    res.json({status: -1, msg: err.message})
                }
                res.status(200).json({status: 1, article: data});
            });
        });

    api.route('/addarticle')
        .post(function (req, res) {

            var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')

            var encodeImg = req.body.EncodeImg;

            var bitmap = new Buffer(encodeImg, 'base64');
            fs.writeFileSync("uploadedImages/example.jpg", bitmap);

            var article = new Articles({
                SourceCode: 1,
                SectionID: req.body.SectionID,
                LanguageID: 1,
                CountryID: 1,
                PublishDate: date,
                GetDate: date,
                Caption: req.body.Caption,
                Auther: req.body.Auther,
                FullText: req.body.FullText,
                Comments: [],
                ImageCaption: req.body.ImageCaption,
                ImageOnlineUrl: " ",
                ImageofflineURL: " ",
                onlineURL: "http://localhost:3000/api/image/example.jpg",
                Status: 'active',
                NoOffComments: 0,
                NooffLikes: 0,
                NoOffSeen: 0,
                Extracted: " ",
                Sentment: " ",
                Audited: " ",
                Approved: " ",
            });
            article.save(function (err) {
                if (err) {
                    console.log(err)
                    res.status(406).json({status: -1, msg: err.message})
                    //res.sendStatus(406);
                    return;
                }
                res.status(200).json({status: 1, msg: "Article Added Successfully"});
            });
        });

    /********************************************* Images **********************************************/

    api.route('/image/:_img')
        .get(function (req, res) {
            var img = fs.readFileSync('./uploadedImages/' + req.params._img);
            res.writeHead(200, {'Content-Type': 'image/jpg'});
            res.end(img, 'binary');
        });

    /********************************************* Comments **********************************************/
    api.route('/addcomment/:articleid')
        .post(function (req, res) {
            var comment = {
                comment: req.body.comment,
                username: req.body.username,
                user_id: req.body.user_id,
                date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            };

            Articles.findOneAndUpdate({"_id": req.params.articleid}, {"$push": {"Comments": comment}}, {
                safe: true,
                upsert: true
            }, function (err) {
                if (err) {
                    console.log(err)
                    res.status(406).json({status: -1, msg: err.message})
                    //res.sendStatus(406);
                    return;
                }
                res.status(200).json({status: 1, msg: "Comment created Successfully"});
            });
        });

    return api;
};