//  Template.body.helpers({
//	total: function(){
//      return Session.get("totalPosts");
//    },
//    });
//
//  Template.body.events({
//     'click #button': function(){
// 		Meteor.call('callTumblr', function(error, result){
//        Session.get("results");
//        console.log(results)
// 		}
//	  )}
// 	})

var filter;
var arrayTags = [];
//when server is ready
Meteor.subscribe('thePosts');
Posts = new Mongo.Collection("posts");

Template.nav.events({ //give all the buttons a filter class, innerHTML will be used as session variable, 
      "click .filter": function(event){
        Session.set("filter", "");
            filter = event.target.innerHTML; 
            console.log(filter); 
           Session.set("filter", filter);
   }
})

Template.posts.helpers({
   postList: function(){ //received session variable and filters accordingly
       var curFilter = Session.get("filter");
        if (curFilter != "") {
            var PostListF = [];
              for(var i in Posts){
                if(findTags(Posts[i], curFilter)){
                    PostListF.push(Posts[i]);
                }
              }
              return PostListF; //need a method to find button value in the array of tags
        } else {
        return Posts.find(); }
                
    
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
    },
    
    filter: function(){
    
    }
})

function findTags(onePost, curFilter){ //findTags(Posts[i]
    arrayTags = onePost.tags;
    var index = arrayTags.indexOf(curFilter)
    if(index != -1){
        return true;
    } else{
        return false;
    }
    
}
    