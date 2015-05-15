var filter;
var arrayTags = [];
//when server is ready
Meteor.subscribe('thePosts');
Meteor.subscribe('theTags');
Posts = new Mongo.Collection("posts");
//PostsF = new Mongo.Collection("postsF");
Tags = new Meteor.Collection("tags");
Session.setDefault("filter", "");
Session.setDefault("newFilter", "");
//Session.setDefault('selectedPost', "");
Session.setDefault('userClick', false);
Session.setDefault('counters', []);
var counters = [];
Session.setDefault('names', []);
var names = [];


Template.nav.events({ //give all the buttons a filter class, innerHTML will be used as session variable, 
      "click .filter": function(event){
//           var filterB = event.target.innerHTML; //also go to thge WU site and get the EXACT TAGS
//           var filterB = $(event.target).attr("value");
//           var filterB;
          //also go to thge WU site and get the EXACT TAGS
           if ($(event.target).attr("value") == undefined){ //have to click twice, to get the undefined first
             $("#dropdown-list li").click(function() {
                 filter = $(this).attr("value")});
           } else {
             filter = $(event.target).attr("value");
           } 
//           filter = filterB;
            console.log("This is the value of the filter I clicked: " + filter)
//           console.log(filter); 
           Session.set("filter", filter);
   }
})

Template.posts.helpers({ 
   postList: function(){ //received session variable and filters accordingly
       var curFilter = Session.get("filter");
       var curClick = Session.get("userClick");
       
    
       var counter = 0;
//        if (curFilter != "" && userClick == false) {
        if (curFilter != "" && curClick == false) {
                console.log("This is the current filter " + curFilter)
                Session.set("numPosts", Posts.find({tags: {$in: [curFilter]}}).count())
//                Session.set("newFilter", "Posts.find({tags: {$in: [curFilter]}})");
                return Posts.find({tags: {$in: [curFilter]}}); 
//              return PostListF; //need a method to find button value in the array of tags
        } else if (curClick == true){
            Session.set("numPosts", Posts.find({user_saved: true}).count())
//            Session.set("userClick", false)
            return Posts.find({user_saved: true})
        } else {
        Session.set("numPosts", Posts.find().count())
        return Posts.find(); //Posts.find() works here
//        counter = Posts.find().count
        } 
   },
            
    tagList: function(){
        return Tags.find({}, {sort: {count: -1}});
    },
    
    postListCount: function(){
        return Session.get("numPosts");
    },
    
    tagCount: function(button){
        var tag = Tags.find({name: "wellesley"}).fetch();
        return tag[0].count;
    },
    
    body1: function(){ ///FIX FOR POSTS WITH IMAGES, ones with pictures begin with undefined?
        //an image
        //var wholeBody = actualBody;
        //wholeBody.getElementsByTagName("figure") or img?
        //try getting .attr("img"), if has .attr()
        //or if actualbody[0] or actualBody[1] = "figure.tmblr-full" or figure {insert <img src=actualbody[0].firstElementChild.currentSrc></img>}
        
        var body = "";
        var actualBody = $.parseHTML(this.body); //gives an array and the text is innerText of each item in the array...
//        console.log(actualBody);
//        console.log("Beginning of one post")
//        if (actualBody[0] == undefined){
//            actualBody[0] = "<img src=actualBody[0]></img>"
//        }
        for (var i in actualBody){
//            console.log("Body pieces: " + actualBody[i]); //if I could make all of these one string...
            body += actualBody[i].innerText;
        }
//        console.log("This is my body: " + body);
        return body;
//        console.log(actualBody);
//        return actualBody;
//        console.log("#"+this.id);
    }
})

Template.posts.events({
    'click #saveIcon':function(){
        if ($(event.target).attr("class") == "glyphicon glyphicon-star-empty"){
            $(event.target).attr("class", "glyphicon glyphicon-star")
        } else {
            $(event.target).attr("class", "glyphicon glyphicon-star-empty");
        }
//        var postId = this._id;
//	    Session.set('selectedPost', postId);
//        console.log(this._id);
        Posts.update(this._id, {$set: {user_saved: ! this.user_saved}});
    }
})
//Meteor.wrapAsync(counter, buttonVal); //with this, threw error that the function does not exist

Template.nav.helpers({ //don't know how to load this at the appropriate time
    counter: function(buttonVal){ //another way to use one counter helper method?
//        var tag = Tags.find({name: buttonVal}) //undefined?
//        
//        console.log("Why is this tag undefined: " + tag)
//        console.log("Why is this inside the array: " + tag[0])
//        console.log("Why is this count undefined: " + tag[0].count)
//        return tag[0].count //find the count of a particular tags

//        return Tags.find({name: buttonVal}, {count: true, _id:0}) //find the count of a particular tags
//        Session.set("tags",Tags.find({name: buttonVal}, {count: true, _id:0})) //find the count of a particular tags

//        return Session.get("tags");
//    })
    }
})

Template.nav.events({
    'keyup #ex3': function(){
//       
        var input = document.getElementById("ex3");
        var searchTerm = input.value;
    
        var typed = document.getElementById("typed");
        typed.innerText = "The text box contains: "+searchTerm;
        Session.set("filter",+searchTerm); 
//        console.log("This is typing: " + Session.get("filter"))
    },
    
    'click #savedArt':function(){
        //create new filter Posts.find({tags: {$in: [curFilter]}})
        Session.set("userClick", true);
    }

})

Template.d3.helpers({
    popularPosts:function(){
        var tagsArrays =  Tags.find({}, {sort: {count: -1}, limit:10});
        var tagCountArray = [];
        var i=0;
            tagsArrays.forEach(function(tag){
    //          console.log("Score: " + tag.count);
                Session.set("array"+i, tag.count)
                i++;
            }) 
        return Tags.find({}, {sort: {count: -1}, limit:10});

    },
    
       popularPostsNames:function(){
        var tagsArrays =  Tags.find({}, {sort: {count: -1}, limit:10});
        var tagCountArray = [];
        var i=0;
            tagsArrays.forEach(function(tag){
                Session.set("arrayName"+i, tag.name)
                i++;
            }) 
//        return Tags.find({}, {sort: {count: -1}, limit:10});

    },
    
      popularPostsNameArray:function(){
        
        for(var i=0; i<10; i++){
            names[i] = Session.get("arrayName"+i);
        }
        
        Session.set("names", names);
    },
    
    popularPostsArray:function(){
        
        for(var i=0; i<10; i++){
            counters[i] = Session.get("array"+i);
        }
        
        Session.set("counters", counters);
        
//    var allCounters = [1,2,3] //testing with random numbers for now so I can just plug in
//    .data(counters)
//    .enter
//    .append
    }
})

Template.d3.onRendered(function(){
//    var svgArea = d3.select("#barGraphSpace");
    
    var w = 300;
    var h = 125;
    
    var counters = Session.get("counters");
    var names = Session.get("names");
    
    	var xScale = d3.scale.ordinal()
							.domain(d3.range(counters.length))
							.rangeRoundBands([0, w], 0.05); //rounds and put space between
			var yScale = d3.scale.linear()
							.domain([0, d3.max(counters)])
							.range([0, h]);
			
			//Create SVG element
			var svg = d3.select("#barGraphSpace")
						.append("svg")
						.attr("width", w)
						.attr("height", h);
			//Create bars
			svg.selectAll("rect")
			   .data(counters)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return xScale(i);
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d);
			   })
			   .attr("width", xScale.rangeBand())
			   .attr("height", function(d) {
			   		return yScale(d);
			   })
			   .attr("fill", function(d) {
					return "rgb(0, 0, " + (d * 10) + ")";
			   });
			//Create labels
			svg.selectAll("text")
//			   .data(names)
			   .data(counters)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return xScale(i) + xScale.rangeBand() / 2;
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");
})