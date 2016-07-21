var express = require("express");
var router = express.Router();
var Bing = require('node-bing-api')({ accKey: ""+process.env.BING+"" });
var mongoose = require("mongoose");
var searchResults = mongoose.model('Search');



function search(req, res, cb){
    var resultNumber = req.query.offset;
    var searchString = req.params.id;
    var date = Date.now();
    

        var history = new searchResults();
        history.term = searchString;
        history.when = date;
        history.save(function(err, post){
            if (err) throw err;
        });
        
   
    
    
    Bing.composite(searchString, {
        top: 10,  // Number of results (max 15 for news, max 50 if other) 
        skip: resultNumber,   // Skip first 3 results 
        sources: "image", //Choises are web+image+video+news+spell 
        newsSortBy: "Date" //Choices are Date, Relevance 
    }, function(error, res, body){
        cb(body);
      });
    
}
            
        


router.route('/imagesearch/:id')
    .get(function(req, res){
        var arr = [];
       search(req, res, function(data){
           if(!data.d){
               res.end(JSON.stringify('invalid search'))
           }
           if(data.d){
                data.d.results[0].Image.forEach(function(element, index, array){
                    arr.push({ "url" :element.MediaUrl, "title" :element.Title, "context" :element.SourceUrl});
                });
           
                if(arr.length === data.d.results[0].Image.length){
                res.end(JSON.stringify(arr));
                } 
           
           }
       });
       
    });

router.route('/latest/imagesearch')
    .get(function(req, res){
       searchResults.find().limit(10).select({ when: 1, term: 1, _id: 0}).exec(function(err, docs){
          if(err) throw err;
          res.end(JSON.stringify(docs));
       });
    });


module.exports = router;