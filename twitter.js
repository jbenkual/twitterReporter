var Twitter = require('twitter');


var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

var status = `it("cannot write more code while hungry", function () {
        expect(programmer.hunger).to.be.below(80);
    });`;

var params = {screen_name: 'umbralangel'};

function getTweets() {
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	  if (!error) {
	    console.log(tweets);
	  }
	  console.log(error);
	});
}

function post(status) {


	client.post('statuses/update', {status: status}, function(error, tweet, response) {
		if(!error) {
			console.log(tweet);
		}
		console.log(error);
	});
}

function search (term) {
	client.get('search/tweets', {q: 'webpack'}, function(error, tweets, response){
	tweets.statuses.forEach(function(tweet) {
		console.log(`\n\n${tweet.user.name} (${tweet.user.screen_name})\n`);
		console.log(tweet.text + "\n\n");
	});
   //console.log(tweets);
});
}

search("webpack");
