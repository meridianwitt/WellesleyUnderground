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

Posts = new Mongo.Collection("posts");
//Session.setDefault("filter","");

var URL = "http://api.tumblr.com/v2/blog/wellesleyunderground.tumblr.com/posts/?api_key=wLtyjO5g0zQWJHFRycQxzWIMUjr3j1l16JpWr4aKirMFg6u8cL&offset=";  // notice that I made some changes to the URL
var bioURL = "http://api.tumblr.com/v2/blog/wellesleyunderground.tumblr.com/info?api_key=wLtyjO5g0zQWJHFRycQxzWIMUjr3j1l16JpWr4aKirMFg6u8cL";
var inDB; //number of posts in db
var numPosts; //number of posts grabbed from Tumblr
var difPosts; //difference between number of posts and number in the database
var offset = 0; //offset needs to change 20 everytime we call for posts so if we called 75 times, offset 75(20), not just 75

function retrieve(offset){ 
    var response = HTTP.call("GET", URL + offset);
//    console.log("offset=", offset, response.data.response.posts.length)
    for (var i in response.data.response.posts){
      Posts.insert( {
          title: response.data.response.posts[i].title,
          id: response.data.response.posts[i].id,
          body: response.data.response.posts[i].body,
          link: response.data.response.posts[i].short_url,
          tags: response.data.response.posts[i].tags,
          user_saved: false, //change with .update when user clicks on the star or whatever
          filter: false
      }) // store posts in the Posts collection
    }
//    Session.set("gotPosts", Posts);
}

//compare that number to the total number of posts already stored in the database (Posts.find().count())
//if they are different, calculate that difference and use that to either specify number of times you'll need to repeat the request with a different offset, or if the number is less than 20, than use that number to specify the limit value. 

  Meteor.startup(function(){  //work on edge cases later, took too long on this
    
    var getNumPosts = HTTP.call("GET", bioURL);
    inDB = Posts.find().count();
    console.log("Num in db: " + inDB);
    numPosts = getNumPosts.data.response.blog.posts;
    console.log("Num posts: " + numPosts);
    difPosts = numPosts - inDB;
    console.log("Dif posts: " + difPosts);

   if(difPosts == numPosts){ //or null?
      console.log("Num iterations: " + numPosts/20);
              
//for (var i=0; i < numPosts/20; i++
    for (var i=0; i < numPosts/20; i++){ //Eni had it as 3 to grab 60 posts, consider pulling 60 at first, next button triggers pull more posts
      retrieve(i*20);
    }
   }
      console.log("Number in database after: " + inDB);
      
    Meteor.methods({
    filtered: function(sess){
        var curFilter = sess; 
        console.log("This is the current filter: " + curFilter)
//        var postF = Posts.find({}); //assume it would work here
////        console.log("Number of posts: " + Posts.find({}).count())
//              postF.forEach(function(post){ 
//                  console.log("Post title: " + post.title); //only printed once? only pulls one title
////                  Posts.update(this, {filter:false}, {multi:true});
////                  Posts.update(post._id, {filter:false}, {multi:true}); 
//                  Posts.update({$set: {filter:false}}, {multi:true}); //set all to false, no need for this
//                  console.log("test"); //never printed...never gets past update
//                if(findTags(post, curFilter)){ 
////                    Posts.update(this, {filter: true})
////                    Posts.update(this,{$set:{filter:true}}, {multi:true}); //this is undefined?
//                }})
                    
                    console.log("Number of filtered posts: " + Posts.find({tags: {$in: [curFilter]}}).count());
                    console.log("What is being returned: " + Posts.find({tags: {$in: [curFilter]}}).fetch())
                    return Posts.find({tags: {$in: [curFilter]}}).fetch();
//                    return Posts.find({filter: true});
    }
  })
      
      Meteor.publish('thePosts', function(){
       return Posts.find({});
      })
    })
  
  
  
  
function findTags(onePost, curFilter){ //findTags(Posts[i], ignoreCase
    arrayTags = onePost.tags;
    var index;
    for(var i in arrayTags){ //try to ignore case 
      arrayTags[i] = arrayTags[i].toLowerCase();}
      console.log("array tags: " + arrayTags);
      index = $.inArray(curFilter, arrayTags);
        if(index != -1){
            console.log("got true");
            return true;
        } else {
            console.log("got false");
            return false;
        }  
    }