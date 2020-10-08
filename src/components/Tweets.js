import React, { useEffect, useState } from "react";
import axios from "axios";
import Tweet from "./Tweet";
import Top from "./Top";
import Day from "./Day";
import Spinner from "./Spinner";

const initialState = {
  tweets: [],
};

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [tweetCount, setTweetCount] = useState(0);
  const [topTweetId, setTopTweetId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTweets();
    getTweetCount();
    getTopTweetId();
  }, []);

  const getTweets = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/search/recent");
      setTweets(response.data.data);
      setIsLoading(false);
    } catch (e) {
      setError(e.response.data);
      setIsLoading(false);
    }
  };

  const getTweetCount = async () => {
    try {
      const response = await axios.get("/api/search/recent/count");
      setTweetCount(response.data.count);
    } catch (e) {
      setError(e.response.data);
    }
  };

  const getTopTweetId = async () => {
    const response = await axios.get("/api/search/recent/top");
    setTopTweetId(response.data.result.id);
  };

  const errors = () => {
    if (error) {
      return (
        <div className="sixteen wide column">
          <div className="ui message negative">
            <div className="header">{error.title}</div>
            <p key={error.detail}>{error.detail}</p>
            <em>
              See
              <a href={error.type} target="_blank" rel="noopener noreferrer">
                {" "}
                Twitter documentation{" "}
              </a>
              for further details.
            </em>
          </div>
        </div>
      );
    }
  };

  const dashboard = () => {
    if (!isLoading) {
      if (!error) {
        return (
          <React.Fragment>
            <div className="sixteen wide column">
              <div className="ui segment">
                <div className="ui header center aligned ">
                  Total number of Tweets
                </div>
                <div className="ui header center aligned ">{tweetCount}</div>
              </div>
            </div>
            <div className="eight wide column">
              <div className="ui segment">
                <Top />
              </div>
            </div>
            <div className="eight wide column">
              <div className="ui segment">
                <Day />
              </div>
            </div>
            <div className="eight wide column">
              <div className="ui header">Top Tweet</div>
              <Tweet key={topTweetId} id={topTweetId} />
            </div>
            <div className="eight wide column">
              <div className="ui basic segment">
                <div className="ui header">Recent Tweets</div>
                {tweets.map((tweet) => (
                  <Tweet key={tweet.id} id={tweet.id} />
                ))}
              </div>
            </div>
          </React.Fragment>
        );
      }
    } else {
      return <Spinner />;
    }
  };

  return (
    <React.Fragment>
      {errors()}
      {dashboard()}
    </React.Fragment>
  );
};

export default Tweets;
