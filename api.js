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

    /********************************************* AddFavourite **********************************************/

    api.route('/addfavourite/:userid')
        .post(function (req, res) {

            var FavouriteCategory = [];
            for (var i = 0; i < req.body.length; i++) {

                FavouriteCategory.push({SectionId: req.body["fav" + i]});
            }

            console.log("FavouriteCategory", FavouriteCategory)

            EndUsers.FavouriteCategory = [];

            EndUsers.findOneAndUpdate({"_id": req.params.userid}, {"$set": {"FavouriteCategory": FavouriteCategory}}, {
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

    api.route('/getfavourite/:userid')
        .get(function (req, res) {
            EndUsers.find({"_id": req.params.userid}, {"FavouriteCategory":1}, function (err,data) {
                if (err) {
                    console.log(err);
                    res.status(406).json({status: -1, msg: err.message});
                    //res.sendStatus(406);
                    return;
                }
                res.status(200).json({status: 1, FavouriteCategory: data});
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
                var exist=-1;
                if(data.Likes) {
                    if (data.Likes.indexOf("598ec995054dfad044f90960") != -1)
                        exist = 1;
                }

                res.status(200).json({status: 1, article: data , exist:exist});
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


    /********************************************* Searching **********************************************/

    api.route('/categoryarticle/:SectionID')
        .get(function (req, res) {
            Articles.find({"SectionID": req.params.SectionID}, function (err, data) {
                if (err) {
                    console.log(err);
                    res.json({status: -1, msg: err.message})
                }
                //var start =req.query.start
                //res.status(200).json({status: 1, articles: data.slice(start,start+10)});
                res.status(200).json({status: 1, articles: data});
            });
        });

    api.route('/articlebycountry/:SectionID')
        .get(function (req, res) {
            Articles.find({"SectionID": req.params.SectionID}, function (err, data) {
                if (err) {
                    console.log(err);
                    res.json({status: -1, msg: err.message})
                }
                //var start =req.query.start
                //res.status(200).json({status: 1, articles: data.slice(start,start+10)});
                res.status(200).json({status: 1, articles: data});
            });
        });

    api.route('/articlebyfav')
        .get(function (req, res) {
            var CountryArray=[];
            for(var parameter in req.query)
            {
                console.log(req.query[parameter])
                CountryArray.push({CountryID:req.query[parameter]});
            }
            //{$or:[{"groupA":data},{"groupB":data}]}
            Articles.find({"$or": CountryArray}, function (err, data) {
                if (err) {
                    console.log(err);
                    res.json({status: -1, msg: err.message})
                    return;
                }
                res.status(200).json({status: 1, articles: data});
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

    /********************************************* Likes **********************************************/

    api.route('/addlike/:articleid')
        .post(function (req, res) {

            var user_id = req.body.userid;
            console.log(user_id)

            Articles.findOneAndUpdate({"_id": req.params.articleid}, {"$push": {"Likes": user_id}}, {
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


    api.route('/getlike/:articleid')
        .post(function (req, res) {

            var user_id = req.body.userid;

            Articles.find({"_id": req.params.articleid,Likes:user_id}, {
                safe: true,
                upsert: true
            }, function (err,data) {
                if (err) {
                    console.log(err)
                    res.status(406).json({status: -1, msg: err.message})
                    //res.sendStatus(406);
                    return;
                }
                res.status(200).json({status: 1, data:data});
            });
        });










    return api;
};