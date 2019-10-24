var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs')

app.get('/',function(req, res){
    res.render('landing');
});

var campgrounds = [
    {name: 'Salmon Creek', image: "https://farm5.staticflickr.com/4165/34533120366_d7e4742226_m.jpg"},
    {name: 'Michican Than', image:'https://live.staticflickr.com/3226/2691202319_4bb5b30369_m.jpg'},
    {name: 'Bear Territory', image: 'https://farm5.staticflickr.com/4176/34533122526_13d698e62a_m.jpg'}
]

app.get('/campgrounds',function(req,res){
    res.render('campgrounds', {campgrounds:campgrounds});
});

app.post('/campgrounds', function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new',function(req,res){
    res.render('new');
});

app.listen(3000, function(){
    console.log('Server is Running');
});