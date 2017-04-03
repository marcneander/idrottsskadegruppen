var contentful = require('contentful');

var client = contentful.createClient({
  space: 'rs46ftjpdzy2',
  accessToken: '978dde85f4fe077ce048b645c17fc5967b2ed83db35025a8202e3d3d8891bb4a'
})

client.getEntries({
  'content_type': 'personer'
})
  .then((entries) => {
      entries.items.forEach(function (entry) {
        console.log(entry.fields.bild);
      })
  })
