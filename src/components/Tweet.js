import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

const Tweet = ({ id }) => {
  const options = {
    cards: "hidden",
    align: "left",
    width: "550",
    conversation: "none",
  };

  return <TwitterTweetEmbed options={options} tweetId={id} />;
};

export default Tweet;
