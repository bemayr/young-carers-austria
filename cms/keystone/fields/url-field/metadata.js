var url = "https://www.youtube.com/watch?v=YMcu2a0Z0cQ";

const ogs = require('open-graph-scraper');
ogs({url}, (error, results, response) => {
    console.log("=== open-graph-scraper ===")
  console.log('error:', error); // This returns true or false. True if there was an error. The error itself is inside the results object.
  console.log('results:', results); // This contains all of the Open Graph results
});
