 Posts = new Meteor.Collection('posts');

  Session.setDefault("gotPosts", []);

  Template.allPosts.events({
     'click #button': function(){
 		Meteor.call('callTumblr', function(error, result){
//            Session.set("gotPosts", result);
//            console.log(gotPosts); //why not recognized?
            console.log("result" + result) //why not parsing appropriately?
//            var parsedPosts = JSON.parse(gotPosts).response.posts;
           //on clicking a new filter button, change the size of the circle in the top right corner according to the number of posts in the filter
            
            
 		}
	  )}
 	})
  
  Template.allPosts.helpers({
    //get response from session variable
    //iterate through response, building div
      'tumblrBlocks':function(){
       console.log("In tumblrBlocks");
       var gotPosts = Session.get("gotPosts");
        console.log("Got seesion variable:" + gotPosts);
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
      }
  })