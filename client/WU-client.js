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
//when server is ready
Meteor.subscribe('thePosts');
Posts = new Mongo.Collection("posts");
Session.set("allPosts", Posts);
console.log("Session variables: " + allPosts);

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
//            Session.set("allPosts", Posts.find({tag: curFilter}));
            return Posts.find({tag: curFilter}); //need a method to find button value in the array of tags
        } else {
//        Session.set("allPosts", Posts.find());
        return Posts.find(); }
                
    
//    return Posts.find({});
   }
    ,
    body1: function(){
        $("#"+this.id).html(this.body);
//        console.log("#"+this.id);
    }
})

Template.allPosts.helpers({
    makeDivs: function(){
    
       var allPosts = Session.get("allPosts");
       console.log("Got session variable:" + allPosts);
       for(var i = 0; i<allPosts.length; i++){ //erroring here. done before calling any of the other callTumblr functions, so i added if statement
                var onePost = allPosts[i];
//                console.log(onePost.title);
                var onePostDiv = document.createElement("div");
                onePostDiv.setAttribute("class","well");
                onePostDiv.innerHTML = "<span class='title'>"+onePost.title+"</span>" + "<p>" +onePost.body+"</p>";
           
	            $(this).hover(function() {$(this).addClass("hovering");}, function() { $(this).removeClass("hovering");}); //hover on this div
           
                var allPosts = document.getElementById("allPosts");
                allPosts.appendChild(onePostDiv);
            }
    }
})

function findTags(arrayTag, curFilter){
    var index = arrayTag.indexOf(curFilter)
    if(index != -1){
        return Posts.find
    }
}
