import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Spinner from "./Spinner";

const Day = () => {
  const [countByDay, setCountByDay] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getDays();
  }, []);

  const style = {
    marginTop: "0px",
  };

  const data = {
    labels: Object.keys(countByDay),
    datasets: [
      {
        label: "Tweets",
        backgroundColor: "rgba(77,160,236,0.2)",
        borderColor: "rgba(77,160,236,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(77,160,236,0.4)",
        hoverBorderColor: "rgba(77,160,236,1)",
        data: Object.values(countByDay),
      },
    ],
  };

  const getDays = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/search/recent/count?group=day");
    setCountByDay(response.data.count);
    setIsLoading(false);
  };

  const jobsByDay = () => {
    if (!isLoading) {
      return (
        <React.Fragment>
          <Bar data={data} />
        </React.Fragment>
      );
    } else {
      return <Spinner />;
    }
  };

  return (
    <React.Fragment>
      <div style={style} className="ui header">
        Tweeted Jobs By Day
      </div>
      {jobsByDay()}
    </React.Fragment>
  );
};

export default Day;
