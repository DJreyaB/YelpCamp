var app = require('express')(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//Schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: 'Michican Than', 
//         image: "https://live.staticflickr.com/3226/2691202319_4bb5b30369_m.jpg",
//         description: 'This is in Michigan. Don\'t come!!'
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log('NEWLY CREATED CAMPGROUND');
//             console.log(campground);
//         }
//     }
// );

app.get('/',function(req, res){
    res.render('landing');
});

app.post('/campgrounds', function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

app.get('/campgrounds',function(req,res){
    //get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render('index', {campgrounds:allCampgrounds});
        }
    });
});




app.get('/campgrounds/new',function(req,res){
    res.render('new');
});

//Show page
app.get('/campgrounds/:id', function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render('show',{campground: foundCampground});
        }
    });
    //find campground with provided id
    //res.render('show');
});

app.listen(3000, function(){
    console.log('Server is Running');
});