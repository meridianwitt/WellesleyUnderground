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

Meteor.startUp({
   
    var gotPosts = Session.get("gotPosts");
            console.log("Got session variable:" + gotPosts);
           for(var i = 0; i<gotPosts.length; i++){ //erroring here. done before calling any of the other callTumblr functions, so i added if statement
                    var onePost = gotPosts[i];
    //                console.log(onePost.title);
                    var onePostDiv = document.createElement("div");
                    onePostDiv.setAttribute("class","well");
                    onePostDiv.innerHTML = "<span class='title'>"+onePost.title+"</span>" + "<p>" +onePost.body+"</p>";

                    $(this).hover(function() {$(this).addClass("hovering");}, function() { $(this).removeClass("hovering");}); //hover on this div

                    var allPosts = document.getElementById("allPosts");
                    allPosts.appendChild(onePostDiv);
                }
})