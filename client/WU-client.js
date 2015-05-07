 Posts = new Meteor.Collection('posts');
 var gotPosts;

  Session.setDefault("totalPosts", 0);

Meteor.call('callTumblr', function(error, result){
       console.log("callTumblr called")
       console.log(result)
    }),

//Meteor.startup(function(){ 
//   
//   Meteor.call('parse', gotPosts, function(error, result){
//       console.log("parse")
//       console.log(result);
//    })
//  })

  Meteor.methods({
    callTumblr:function(){
        console.log("callTumblr")
        var response = HTTP.call("GET", taggedURL1);
//        console.log("got response:", response);
//        console.log(response);
        return reponse.data;
    }
//      ,
      
//    parse: function(tumblr){
//        var parsed = JSON.parse(tumblr).response.data.posts;
//        console.log(parsed);
//    }
  })

 Template.body.helpers({
	total: function(){
      return Session.get("totalPosts");
    },
    });

//  Template.body.events({
//     'click #button': function(){
// 		Meteor.call('callTumblr', function(error, result){
// 		 console.log(result);
// 		}
//	  )}
// 	})
  
  //what do I want to do?
  //maybe iterate through the posts 
  //each post in a div with outline
  //function to display just because the screen appear, so just "each post" in HTML
  //