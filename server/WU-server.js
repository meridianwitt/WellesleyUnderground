//server is where the links to the external API are
//where the keys are 
//method to call the api and get the response
//define callback function?

var oAuth = "wLtyjO5g0zQWJHFRycQxzWIMUjr3j1l16JpWr4aKirMFg6u8cL";
var secret = "5UZ7LPnwK3QhWltoPbwSHc5g8VMSBFZEoc4dnv2ADlLm1g5IHA";

var bioURL = "http://api.tumblr.com/v2/blog/wellesleyunderground.tumblr.com/info?api_key=wLtyjO5g0zQWJHFRycQxzWIMUjr3j1l16JpWr4aKirMFg6u8cL";
var taggedURL1 = "http://api.tumblr.com/v2/blog/wellesleyunderground.tumblr.com/posts/?&limit=20&offset=0&api_key=wLtyjO5g0zQWJHFRycQxzWIMUjr3j1l16JpWr4aKirMFg6u8cL"

var taggedURL2 = "wellesley%20in%20comedy"; //encode URI

var URL = "http://api.tumblr.com/v2/blog/wellesleyunderground.tumblr.com/posts/?&limit=20&offset="
var key = "&?api_key=wLtyjO5g0zQWJHFRycQxzWIMUjr3j1l16JpWr4aKirMFg6u8cL"
var offset = 0;

  Meteor.methods({
    callTumblr:function(){
        console.log("callTumblr")
          var response = HTTP.call("GET", URL+offset+key,
                function(error, result){
                    console.log("Result before calling for more: "+ result)
                    return Meteor.call('retrieveMore', result);
        
          })},
                
      
      retrieveMore:function(result){ //try a helper method
            if (result.response.posts.length == 20) { //cannot find posts of undefined
                offset += 20;
                var allPosts = HTTP.call("GET", URL+offset+key);
                return allPosts;
            }
      }       

        
      
                
        
//        var response = HTTP.call("GET", taggedURL1);
//        console.log("got response:", response);
//        return response.data.response.posts;
  
   })
      
 
      
