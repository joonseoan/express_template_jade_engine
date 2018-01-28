var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
//var data = fs.readFileSync('./data/.txt', { encoding: 'utf8'});

//fs.readFile('textData.txt', {encoding: 'utf8'}, (error, data) => { console.log(3); console.log(data);});

app.locals.pretty = true;

app.set('view engine', 'jade');
app.set('views', './views_file');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/topic/new', (req, res) => {

    fs.readdir('data/', (error, files) => {

        if (error) {

            //like try and catch in Java...
            res.status(500).send('Something Wrong!!!!');
        
        }
        res.render('new', {topics: files});
    
    });

});


// When type "route" in the link.
app.get(['/topic', '/topic/:id'], (req, res) => {

        // it is required when we want to read directories.!!!!
        // Reading a certain directory, do not use "/" like "'data/'"
        fs.readdir('data/', (error, files) => {

            if (error) {

                //like try and catch in Java...
                res.status(500).send('Something Wrong!!!!');
            
            }

            var id = req.params.id;

            if (id) {
                fs.readFile('data/'+id, 'utf8', (error, data) => {

                    if(error) {
            
                        // Error status!!!!
                        res.status(500).send('Internet Server Error about query');
                    
                    }
            
                    res.render('views', {topics: files, title: id, description: data});

                });
            }

            else {

                // {topics: files} : Object to deliver value to jade files.
                res.render('views', {topics: files, title: 'Welcome!', description: 'Select a item above, please.'});

            }
    
        }); 
   
});

// cannot use post because it is the same route topic
/*
app.get('/topic/:id', (req, res) => {

    var id = req.params.id;

    fs.readdir('data', (error, files) => {

        if (error) {
            res.status(500).send('Something Wrong!!!!');
        }

        fs.readFile('data/'+id, 'utf8', (error, data) => {

            if(error) {
    
                // Error status!!!!
                res.status(500).send('Internet Server Error about query');
            
            }
    
            res.render('views', {topics: files, title: id, description: data});
    
        });
    });
    
    //res.send(id);
});
*/

app.post('/topic', (req, res) => {

    var title = req.body.title;
    var description = req.body.desc;
    fs.writeFile('data/'+title, description, (error) => {
        if(error) {

            // Error status!!!!
            res.status(500).send('Internet Server Error');
        
        }

        //res.send('Title: ' + title + '<br> ' + 'Description: ' + description);
        
        //redirect the route the user wants to show 
        res.redirect('/topic/'+ title);
    });   

});

app.listen(3000, () => {

    console.log('connected, 3000 port');

});




