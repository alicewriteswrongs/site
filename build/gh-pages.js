var ghpages = require('gh-pages');
var path = require('path');

var dist = path.join(__dirname, '../dist');

ghpages.publish(dist, { message: "build literate crypto" });
