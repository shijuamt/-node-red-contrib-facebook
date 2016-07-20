module.exports = function (RED) {
    "use strict";
	var graph = require('fbgraph'),
	    fs = require("fs"),
        ursa = require("ursa"),
        url = require("url");
	    graph.setAccessToken("");
	
	// get authorization url 
    var authUrl = graph.getOauthUrl({
        "client_id":    "",
		"redirect_uri":  ""
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
