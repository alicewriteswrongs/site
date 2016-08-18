const rss = require('rss');

const blogContents = require("./util").blogContents;

var feed = new rss({
  title: "Alice Pote's blog",
  description: "JS, functional programming, and Linux",
  feed_url: "https://aliceriot.github.io/rss.xml",
  site_url: "https://aliceriot.github.io",
});

Object.keys(blogContents).forEach(key => {
  let entry = blogContents[key];

  let url = key;

  feed.item({
    title: entry.title,
    description: entry.title,
    url: "https://aliceriot.github.io/blog/" + key,
    guid: key,
    author: "Alice Pote",
    date: entry.date,
  });
});

console.log(feed.xml())
