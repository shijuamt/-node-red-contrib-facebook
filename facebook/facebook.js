module.exports = function (RED) {
    "use strict";
	var graph = require('fbgraph');
	graph.setAccessToken("EAACEdEose0cBABKrvyH5iCXWa5AWuy1eXCtoMdFW6M6yL4YWqncr0n0pC52wFZAM43sfTwNcMjUedHlp1mosUEZC58pROC4DS4sfkp6vsAqOISKx1ZBRqtDMcCb6mtV0BF1aqcxQOQZBHoqZAJEBlWBIv9UGNpsv80Cvxq4Cv8AEWjUu9hVQZB");
	
	// get authorization url 
    var authUrl = graph.getOauthUrl({
        "client_id":    "1616871815308713"
      , "redirect_uri":  "579b3ccd00771ea9eb88b719c6167788"
    });
 
    // shows dialog 
    res.redirect(authUrl);
 
    // after user click, auth `code` will be set 
    // we'll send that and get the access token 
   /* graph.authorize({
        "client_id":      conf.client_id
      , "redirect_uri":   conf.redirect_uri
      , "client_secret":  conf.client_secret
      , "code":           req.query.code
    }, function (err, facebookRes) {
      res.redirect('/loggedIn');
    });*/

    function FacebookPostNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.on('input', function (msg) {
			var wallPost = {
			  message: "I'm gonna come at you like a spider monkey, chip!"
			};		 
			graph.post("/feed", wallPost, function(err, res) {
			  // returns the post id 
			msg.payload = res;
            node.send(msg);
			});
        });
    }
    RED.nodes.registerType("facebook", FacebookPostNode);
};
