const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");

const app = express();
let port = process.env.PORT || 3000;

const BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const searchURL = "https://api.twitter.com/2/tweets/search/recent";
const query =
  '(developer OR software) remote (context:66.961961812492148736 OR context:66.850073441055133696) -is:retweet -"business developer"';
const maxResults = 100;

const requestConfig = {
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
  params: {
    max_results: maxResults,
    query: query,
    "tweet.fields": "context_annotations,created_at,public_metrics",
  },
};

const authMessage = {
  title: "Could not authenticate",
  detail: `Please make sure your bearer token is correct. 
      If using Glitch, remix this app and add it to the .env file`,
  type: "https://developer.twitter.com/en/docs/authentication",
};

app.get("/api/search/recent", async (req, res) => {
  if (!BEARER_TOKEN) {
    res.status(401).send(authMessage);
  }

  try {
    const response = await getSearchResults();
    res.send(response);
  } catch (e) {
    console.log(e);
  }
});

const getSearchResults = async (config = requestConfig) => {
  try {
    const response = await axios.get(searchURL, config);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const getAllTweets = async () => {
  let response = await getSearchResults();
  let tweets = [];

  while (response.meta.next_token) {
    let config = {
      ...requestConfig,
      params: {
        ...requestConfig.params,
        next_token: response.meta.next_token,
      },
    };

    response = await getSearchResults(config);
    tweets = tweets.concat(response.data);
  }

  return tweets;
};

const getCount = async () => {
  let response = await getSearchResults();
  let resultCount = response.meta.result_count;

  while (response.meta.next_token) {
    let config = {
      ...requestConfig,
      params: {
        ...requestConfig.params,
        next_token: response.meta.next_token,
      },
    };

    response = await getSearchResults(config);
    resultCount = resultCount + response.meta.result_count;
  }

  return resultCount;
};

const countsByDay = async () => {
  let tweets = await getAllTweets();

  return tweets.reduce(
    (counts, tweet) => ({
      ...counts,
      [moment(tweet.created_at).format("ddd - MM/DD")]:
        (counts[moment(tweet.created_at).format("ddd - MM/DD")] || 0) + 1,
    }),
    {}
  );
};

const countsByLanguage = async () => {
  let counts = {};

  const languages = [
    "javascript",
    "JavaScript",
    "android",
    "frontend",
    "ios",
    "backend",
    "node",
    "nodejs",
    "python",
    "react",
    "scala",
    "c#",
    "rails",
    "ruby",
    "php",
    "java",
    "blockchain",
    ".net",
    "sql",
    "java",
    "php",
    "golang",
    "go",
    "wordpress",
  ];

  const tweets = await getAllTweets();

  for (tweet of tweets) {
    for (language of languages) {
      if (
        tweet.text.includes(language) ||
        tweet.text.includes(language.toUpperCase())
      ) {
        counts[language] = (counts[language] || 0) + 1;
      }
    }
  }

  if (counts["JavaScript"]) {
    counts["javascript"] += counts["JavaScript"];
    delete counts.JavaScript;
  }

  if (counts["node"]) {
    counts["nodejs"] += counts["node"];
    delete counts.node;
  }

  if (counts["golang"]) {
    counts["go"] += counts["golang"];
    delete counts.node;
  }

  return counts;
};

const sortCounts = (counts, keyName = "name") => {
  let sortedCounts = Object.keys(counts).map((language) => ({
    [keyName]: language,
    total: counts[language],
  }));

  sortedCounts.sort((a, b) => {
    return b.total - a.total;
  });

  return sortedCounts;
};

app.get("/api/search/recent/top", async (req, res) => {
  if (!BEARER_TOKEN) {
    res.status(401).send(authMessage);
  }

  const tweets = await getAllTweets();
  let tweetsByEngagement = {};
  for (tweet of tweets) {
    const total_engagement = Object.values(tweet.public_metrics).reduce(
      (total_engagement, public_metric) => total_engagement + public_metric
    );
    tweetsByEngagement[tweet.id] = total_engagement;
  }

  res.send({ result: sortCounts(tweetsByEngagement, "id")[0] });
});

app.get("/api/search/recent/count", async (req, res) => {
  if (!BEARER_TOKEN) {
    res.status(401).send(authMessage);
  }

  const results =
    req.query.group === "day" ? await countsByDay() : await getCount();

  res.send({ count: results });
});

app.get("/api/search/recent/language", async (req, res) => {
  if (!BEARER_TOKEN) {
    res.status(401).send(authMessage);
  }

  try {
    let results = await countsByLanguage();
    results = sortCounts(results);
    res.send({ count: results.slice(0, 10) });
  } catch (e) {
    console.log(e);
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, res) => {
    res.sendFile(path.join(__dirname, ".../build", "index.html"));
  });
} else {
  port = 3001;
}

app.listen(port, () => console.log(`Listening on port ${port}`));
