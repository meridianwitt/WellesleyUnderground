var filter;
var arrayTags = [];
//when server is ready
Meteor.subscribe('thePosts');
Posts = new Mongo.Collection("posts");
PostsF = new Mongo.Collection("postsF");
Session.setDefault("filter", "");

Template.nav.events({ //give all the buttons a filter class, innerHTML will be used as session variable, 
      "click .filter": function(event){
           var filterB = event.target.innerHTML; 
           filter = filterB.toLowerCase();
//           console.log(filter); 
           Session.set("filter", filter);
   }
})

Template.posts.helpers({
   postList: function(){ //received session variable and filters accordingly
       var curFilter = Session.get("filter");
       var counter = 0;
        if (curFilter != "") {
            PostListF = [];
            var postF = Posts.find(); //assume it would work here
              postF.forEach(function(post){ //also useful for counter
//                  console.log("test"); //proof that it is going through eachs
                if(findTags(post, curFilter)){ //up to here seems to be right...
                    PostsF.insert({post: post}); //counter needed later
                    PostsF.forEach(function(postF){
                        console.log("in PostsF");
                    })}})
//                return Posts.find();
                    console.log("done filter function")
                
//              return PostListF; //need a method to find button value in the array of tags
        } else {
        return Posts.find(); //Posts.find() works here
//        counter = Posts.find().count
   } 
                
    
//    return Posts.find({});
   },
    body1: function(){
        //an image
        //var wholeBody = actualBody;
        //wholeBody.getElementsByTagName("figure") or img?
        //try getting .attr("img"), if has .attr()
        //or if actualbody[0] or actualBody[1] = "figure.tmblr-full" or figure {insert <img src=actualbody[0].firstElementChild.currentSrc></img>}
        
        var body = "";
        var actualBody = $.parseHTML(this.body); //gives an array and the text is innerText of each item in the array...
//        console.log(actualBody);
//        console.log("Beginning of one post")
        for (var i in actualBody){
//            console.log("Body pieces: " + actualBody[i]); //if I could make all of these one string...
            body += actualBody[i].innerText;
        }
//        console.log("This is my body: " + body);
        return body;
//        console.log(actualBody);
//        return actualBody;
//        console.log("#"+this.id);
    }
//    ,
//    
//    filter: function(){
//    
//    }
})

function findTags(onePost, curFilter){ //findTags(Posts[i], ignoreCase
    arrayTags = onePost.tags;
    var index;
    for(var i in arrayTags){ //try to ignore case 
      arrayTags[i] = arrayTags[i].toLowerCase();}
      console.log("array tags: " + arrayTags);
      index = $.inArray(curFilter, arrayTags);
        if(index != -1){
            console.log("got true");
            return true;
        } else {
            console.log("got false");
            return false;
        }  
    }
    