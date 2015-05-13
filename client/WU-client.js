var filter;
var arrayTags = [];
//when server is ready
Meteor.subscribe('thePosts');
Posts = new Mongo.Collection("posts");
//PostsF = new Mongo.Collection("postsF");
//Session.set("postList", []);

Template.nav.events({ //give all the buttons a filter class, innerHTML will be used as session variable, 
      "click .filter": function(event){
           var filterB = event.target.innerHTML; //also go to thge WU site and get the EXACT TAGS
           filter = filterB.toLowerCase();
//           console.log(filter); 
           Session.set("filter", filter);
   }
})

Template.posts.helpers({
   postList: function(){ //received session variable and filters accordingly
       var curFilter = Session.get("filter");
        if (curFilter != "") {
//               console.log("This is the filter because the Session variable is set and saved: " + curFilter)
//            PostListF = [];
//            var postF = Posts.find(); //assume it would work here
//              postF.forEach(function(post){ //also useful for counter
//                  Posts.update(this, {filter:false});
////                  console.log("test"); //proof that it is going through eachs
//                if(findTags(post, curFilter)){ //up to here seems to be right...
//                    Posts.update(this, {filter: true})}})
//                    return Posts.find({filter: true});
                Meteor.call('filtered', returnSess());
                return Session.get("postList");
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
//
//function findTags(onePost, curFilter){ //findTags(Posts[i], ignoreCase
//    arrayTags = onePost.tags;
//    var index;
//    for(var i in arrayTags){ //try to ignore case 
//      arrayTags[i] = arrayTags[i].toLowerCase();}
//      console.log("array tags: " + arrayTags);
//      index = $.inArray(curFilter, arrayTags);
//        if(index != -1){
//            console.log("got true");
//            return true;
//        } else {
//            console.log("got false");
//            return false;
//        }  
//    }
    
function returnSess(){
    return Session.get("filter");
}