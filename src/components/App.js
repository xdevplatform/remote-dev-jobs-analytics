import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Tweets from "./Tweets";

const App = () => {
  return (
    <div className="ui container">
      <div className="introduction"></div>

      <h1 className="ui header">
        <img
          className="ui image"
          src="/Twitter_Logo_Blue.png"
          alt="Twitter Logo"
        />
        <div className="content">
          Remote Developer Job Analytics
          <div className="sub header">Powered by Twitter data</div>
        </div>
      </h1>

      <div className="ui grid">
        <BrowserRouter>
          <Route exact path="/" component={Tweets} />
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
