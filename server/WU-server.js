////server is where the links to the external API are
////where the keys are 
////method to call the api and get the response
////define callback function?
//
//var oAuth = "wLtyjO5g0zQWJHFRycQxzWIMUjr3j1l16JpWr4aKirMFg6u8cL";
//var secret = "5UZ7LPnwK3QhWltoPbwSHc5g8VMSBFZEoc4dnv2ADlLm1g5IHA";
//
//var taggedURL1 = "http://api.tumblr.com/v2/blog/wellesleyunderground.tumblr.com/posts/?&limit=20&offset=0&api_key=wLtyjO5g0zQWJHFRycQxzWIMUjr3j1l16JpWr4aKirMFg6u8cL"
//
//var taggedURL2 = "wellesley%20in%20comedy"; //encode URI
//
//var URL = "http://api.tumblr.com/v2/blog/wellesleyunderground.tumblr.com/posts/?&limit=20&offset="
//var key = "&?api_key=wLtyjO5g0zQWJHFRycQxzWIMUjr3j1l16JpWr4aKirMFg6u8cL"
//var offset = 0;
//
//  Meteor.methods({
//    callTumblr:function(){
//        console.log("callTumblr")
//        console.log("URL: " + URL+offset+key)
//          var response = HTTP.call("GET", URL+offset+key);
//          console.log("Result before calling for more: "+ response) //because var response doesnt mean anything yet...
//          Session.set("results", Meteor.call('retrieveMore', response));
//        
//          },
//                
//      
//      retrieveMore:function(response){ //try a helper method
//            if (response.data.response.posts.length == 20) { //cannot find posts of undefined
//                offset += 20;
//                var allPosts = HTTP.call("GET", URL+offset+key);
//                return allPosts;
//            }
//      }       
//
//        
//      
//                
//        
////        var response = HTTP.call("GET", taggedURL1);
////        console.log("got response:", response);
////        return response.data.response.posts;
//  
//   })
//      
// 
//      

Posts = new Mongo.Collection("posts");

var URL = "http://api.tumblr.com/v2/blog/wellesleyunderground.tumblr.com/posts/?api_key=wLtyjO5g0zQWJHFRycQxzWIMUjr3j1l16JpWr4aKirMFg6u8cL&offset="  // notice that I made some changes to the URL
var bioURL = "http://api.tumblr.com/v2/blog/wellesleyunderground.tumblr.com/info?api_key=wLtyjO5g0zQWJHFRycQxzWIMUjr3j1l16JpWr4aKirMFg6u8cL";
var inDB; //number of posts in db
var numPosts; //number of posts grabbed from Tumblr
var difPosts; //difference between number of posts and number in the database

function retrieve(offset){ 
    var response = HTTP.call("GET", URL + offset)
//    console.log("offset=", offset, response.data.response.posts.length)
    for (var i in response.data.response.posts){
      Posts.insert( response.data.response.posts[i]) // store posts in the Posts collection
    }
}

//compare that number to the total number of posts already stored in the database (Posts.find().count())
//if they are different, calculate that difference and use that to either specify number of times you'll need to repeat the request with a different offset, or if the number is less than 20, than use that number to specify the limit value. 



  Meteor.startup(function(){  
    
    var getNumPosts = HTTP.call("GET", bioURL);
    inDB = Posts.find().count();
    numPosts = getNumPosts.data.response.blog.posts;
    difPosts = numPosts - inDB;
   /* Scenarios: difPosts = 0 (all posts are in) and don't call anymore, inDB less than numPosts and need to iterate more, specifically if inDB is less than numPosts and dif is less than 20, change the limit appropriately 
    if()
   */
    console.log("The number of posts gathered: " + numPosts);
    for (var i=0; i < numPosts/20; i++){
      retrieve(i*20)
    } 
    
//    console.log("Number of posts: " + Posts.find().count());
    
  });
