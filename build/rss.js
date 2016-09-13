const RSS = require('rss')

const blogContents = require('./util').blogContents

var feed = new RSS({
  title: "Alice Pote's blog",
  description: 'Yet Another Programming Blog',
  feed_url: 'https://aliceriot.github.io/rss.xml',
  site_url: 'https://aliceriot.github.io'
})

Object.keys(blogContents).forEach(key => {
  let entry = blogContents[key]

  feed.item({
    title: entry.title,
    description: entry.title,
    url: 'https://aliceriot.github.io/blog/' + key,
    guid: key,
    author: 'Alice Pote',
    date: entry.date
  })
})

console.log(feed.xml())
