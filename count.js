const moment = require("moment");
const tweets = {
  data: [
    {
      created_at: "2020-07-28T00:44:54.000Z",
      id: "1287911879214534662",
      text:
        "Position: Software Engineer  Full Stack\nCompany: Tokensoft\nLocation: No Remote, San Francisco, CA\ntags: #hiring\nweb: https://t.co/LAJXqeC95N\nTweet send: 20-44",
    },
    {
      created_at: "2020-07-27T22:49:38.000Z",
      id: "1287882871579881472",
      text:
        "Position: Full Stack Developer  Ethereum Dapps\nCompany: Blockchain Developers Inc.\nLocation: No Remote, San Francisco | Seattle\ntags: #hiring\nweb: https://t.co/TmcrO0Xn29\nTweet send: 18-49",
    },
    {
      created_at: "2020-07-27T21:15:03.000Z",
      id: "1287859067998871554",
      text:
        "New #remote #job Senior Software Engineer (Ruby/Rails/JS) at @doximity\nhttps://t.co/qYnS3IdbD1\n#remotework #hiring",
    },
    {
      created_at: "2020-07-27T20:40:53.000Z",
      id: "1287850467167539200",
      text:
        "Position: Web Developer, React Native  Blockchain Gaming\nCompany: Horizon Blockchain Games\nLocation: No Remote, Toronto\ntags: #hiring\nweb: https://t.co/SLzF9Yg0jw\nTweet send: 16-40",
    },
    {
      created_at: "2020-07-27T19:47:32.000Z",
      id: "1287837042550988800",
      text:
        "Position: Software Engineer  Full Stack\nCompany: Tokensoft\nLocation: No Remote, San Francisco, CA\ntags: #hiring\nweb: https://t.co/LAJXqeC95N\nTweet send: 15-47",
    },
    {
      created_at: "2020-07-27T19:41:09.000Z",
      id: "1287835435612475394",
      text:
        "Auth0  is now #hiring! Looking for a #remote Senior Fullstack Software Engineer, Growth and Enablement. Apply here 👉 https://t.co/DHyWxIdcsD #diversity #inclusion #remotework #remotejobs https://t.co/DHyWxIdcsD",
    },
    {
      created_at: "2020-07-27T19:38:01.000Z",
      id: "1287834646999441409",
      text:
        "Eaze is looking for a Senior Software Engineer!\n\n 📍 Remote\n 👉🏾 Apply now! https://t.co/lZJqwJxJl0\n\n#DiversifyTech #JobAlert",
    },
    {
      created_at: "2020-07-27T19:20:03.000Z",
      id: "1287830125183148032",
      text:
        "✨ Auth0 is now looking for a Senior Fullstack Software Engineer, Growth and Enablement #typescript #reactjs #nodejs #javascript #remotejobs #remotework #JobSearch #RemoteWork #workfromhome  👉 https://t.co/NRraE1tRzS",
    },
  ],
};

const countsByDay = tweets.data.reduce(
  (totals, tweet) => ({
    ...totals,
    [moment(tweet.created_at).format("YYYY-MM-DD")]:
      (totals[moment(tweet.created_at).format("YYYY-MM-DD")] || 0) + 1,
  }),
  {}
);

// const data = tweets.data.map((tweet) =>
//   countsByDay[moment(tweet.created_at).format("YYYY-MM-DD")],
//   {}
// );

console.log(countsByDay);
