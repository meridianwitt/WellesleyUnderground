//server is where the links to the external API are
//where the keys are 
//method to call the api and get the response
//define callback function?

var oAuth = "wLtyjO5g0zQWJHFRycQxzWIMUjr3j1l16JpWr4aKirMFg6u8cL";
var secret = "5UZ7LPnwK3QhWltoPbwSHc5g8VMSBFZEoc4dnv2ADlLm1g5IHA";

var bioURL = "http://api.tumblr.com/v2/blog/wellesleyunderground.tumblr.com/info?api_key=wLtyjO5g0zQWJHFRycQxzWIMUjr3j1l16JpWr4aKirMFg6u8cL";
var taggedURL1 = "http://api.tumblr.com/v2/blog/wellesleyunderground.tumblr.com/posts/?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4"

var taggedURL2 = "wellesley%20in%20comedy"; //encode URI

  Meteor.methods({
    callTumblr:function(){
        console.log("callTumblr")
        var response = HTTP.call("GET", taggedURL1);
        console.log("got response:", response);
        return response.data.response.posts;
  
    }
      
  });
      
