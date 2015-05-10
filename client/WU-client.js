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
              return Events.find({tag: curLoc});
        } else {
        return Events.find(); }
                
    
//    return Posts.find({});
   }
})
    