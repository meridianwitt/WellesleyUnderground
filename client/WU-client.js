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

//when server is ready
Meteor.subscribe('thePosts');
Posts = new Mongo.Collection("posts");

Template.hello.helpers({
   postList: function(){
    return Posts.find({});
   }
})
    