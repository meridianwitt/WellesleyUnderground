//server is where the links to the external API are
//where the keys are 
//method to call the api and get the response
//define callback function?

var oAuth = "wLtyjO5g0zQWJHFRycQxzWIMUjr3j1l16JpWr4aKirMFg6u8cL";
var secret = "5UZ7LPnwK3QhWltoPbwSHc5g8VMSBFZEoc4dnv2ADlLm1g5IHA";

//var bioURL = "http://api.tumblr.com/v2/blog/wellesleyunderground.tumblr.com/info?api_key=wLtyjO5g0zQWJHFRycQxzWIMUjr3j1l16JpWr4aKirMFg6u8cL";
var fullURL = "http://api.tumblr.com/v2/blog/wellesleyunderground.tumblr.com/posts/?&api_key=wLtyjO5g0zQWJHFRycQxzWIMUjr3j1l16JpWr4aKirMFg6u8cL"
var URL = "http://api.tumblr.com/v2/blog/wellesleyunderground.tumblr.com/posts/?&limit=20&offset="
var key = "&?api_key=wLtyjO5g0zQWJHFRycQxzWIMUjr3j1l16JpWr4aKirMFg6u8cL"

var taggedURL2 = "wellesley%20in%20comedy"; //encode URI

  Meteor.methods({
    callTumblr:function(){
//        console.log("callTumblr")

//    var retrieve_more = function (offset) {
//        console.log("Starting retrieve_more function");
//        console.log(URL + offset + key);
//        var response = HTTP.call(URL + offset + key, function(error,result) { //supposed to be async
//            if (result.data.response.posts.length == 20) {
//                console.log("num of post: expected 20, got:" + result.data.response.posts.length);
//                retrieve_more(offset + 20);
//            } else{
//                 console.log(response);
//            }    return response; //return shuts it all down, do +=?
//        });
//    };
//
//    retrieve_more(0);
//}        
    
        var response = HTTP.call("GET", fullURL);
//        console.log("got response:", response);
//        return response.data.response.posts; //now the objects are not properly parsed in the console.
        return response.data.response.posts;

      
//  });
    }})
      
