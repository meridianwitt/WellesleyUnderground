var filter;
var arrayTags = [];
//when server is ready
Meteor.subscribe('thePosts');
Meteor.subscribe('theTags');
Posts = new Mongo.Collection("posts");
//PostsF = new Mongo.Collection("postsF");
Tags = new Meteor.Collection("tags");
Session.setDefault("filter", "");
Session.setDefault("newFilter", "");

Template.nav.events({ //give all the buttons a filter class, innerHTML will be used as session variable, 
      "click .filter": function(event){
//           var filterB = event.target.innerHTML; //also go to thge WU site and get the EXACT TAGS
//           var filterB = $(event.target).attr("value");
//           var filterB;
          //also go to thge WU site and get the EXACT TAGS
           if ($(event.target).attr("value") == undefined){ //have to click twice, to get the undefined first
             $("#dropdown-list li").click(function() {
                 filter = $(this).attr("value")});
           } else {
             filter = $(event.target).attr("value");
           } 
//           filter = filterB;
            console.log("This is the value of the filter I clicked: " + filter)
//           console.log(filter); 
           Session.set("filter", filter);
   }
})

Template.posts.helpers({ 
   postList: function(){ //received session variable and filters accordingly
       var curFilter = Session.get("filter");
       
    
       var counter = 0;
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
//                Meteor.call('filtered', returnSess());
                console.log("This is the current filter " + curFilter)
                Session.set("numPosts", Posts.find({tags: {$in: [curFilter]}}).count())
                Session.set("newFilter", "Posts.find({tags: {$in: [curFilter]}})");
                return Posts.find({tags: {$in: [curFilter]}}); 
//              return PostListF; //need a method to find button value in the array of tags
        } else {
        Session.set("numPosts", Posts.find().count())
        return Posts.find(); //Posts.find() works here
//        counter = Posts.find().count
        }
   },
            
    tagList: function(){
        return Tags.find({}, {sort: {count: -1}});
    },
    
    postListCount: function(){
        return Session.get("numPosts");
    },
    
    tagCount: function(button){
        var tag = Tags.find({name: "wellesley"}).fetch();
        return tag[0].count;
    },
    
//    return Posts.find({});
    body1: function(){ ///FIX FOR POSTS WITH IMAGES, ones with pictures begin with undefined?
        //an image
        //var wholeBody = actualBody;
        //wholeBody.getElementsByTagName("figure") or img?
        //try getting .attr("img"), if has .attr()
        //or if actualbody[0] or actualBody[1] = "figure.tmblr-full" or figure {insert <img src=actualbody[0].firstElementChild.currentSrc></img>}
        
        var body = "";
        var actualBody = $.parseHTML(this.body); //gives an array and the text is innerText of each item in the array...
//        console.log(actualBody);
//        console.log("Beginning of one post")
//        if (actualBody[0] == undefined){
//            actualBody[0] = "<img src=actualBody[0]></img>"
//        }
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
})

Template.posts.events({
    'click .glyphicon-star-empty':function(){
        $(event.target).attr("class", "glyphicon glyphicon-star");
        
//        var postId = this._id;
//	    Session.set('selectedPost', postId);
    }
})
//Meteor.wrapAsync(counter, buttonVal); //with this, threw error that the function does not exist

Template.nav.helpers({ //don't know how to load this at the appropriate time
    counter: function(buttonVal){ //another way to use one counter helper method?
//        var tag = Tags.find({name: buttonVal}) //undefined?
//        
//        console.log("Why is this tag undefined: " + tag)
//        console.log("Why is this inside the array: " + tag[0])
//        console.log("Why is this count undefined: " + tag[0].count)
//        return tag[0].count //find the count of a particular tags

//        return Tags.find({name: buttonVal}, {count: true, _id:0}) //find the count of a particular tags
//        Session.set("tags",Tags.find({name: buttonVal}, {count: true, _id:0})) //find the count of a particular tags

//        return Session.get("tags");
//    })
    }
})

Template.nav.events({
    'keyup #ex3': function(){
//       
        var input = document.getElementById("ex3");
        var searchTerm = input.value;
    
        var typed = document.getElementById("typed");
        typed.innerText = "The text box contains: "+searchTerm;
        Session.set("filter",+searchTerm); 
//        console.log("This is typing: " + Session.get("filter"))
    },
    
    'click #save':{
        //create new filter Posts.find({tags: {$in: [curFilter]}})
    }

})

//Template.d3.helpers({
//    var allCounters = [1,2,3] //testing with random numbers for now so I can just plug in
//    .data(allCounters)
//    .enter
//    .append
//})

Template.d3.helpers({
    make:function(){}
   
})

function returnSess(){
    return Session.get("filter");
}