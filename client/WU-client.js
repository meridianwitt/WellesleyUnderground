 Posts = new Meteor.Collection('posts');

  Session.setDefault("totalPosts", 0);

  Template.body.helpers({
	total: function(){
      return Session.get("totalPosts");
    },
    });

  Template.body.events({
     'click #button': function(){
 		Meteor.call('callTumblr', function(error, result){
 		 console.log(result);
 		}
	  )}
 	})