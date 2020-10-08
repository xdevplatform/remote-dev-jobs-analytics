import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const Top = () => {
  const [countByLanguage, setCountByLanguage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const style = {
    fontSize: "17px",
  };

  useEffect(() => {
    getTopLanguages();
  }, []);

  const getTopLanguages = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/search/recent/language");
    setCountByLanguage(response.data.count);
    setIsLoading(false);
  };

  const capitalize = (word) => {
    const first_letter = word.slice(0, 1).toUpperCase();
    return first_letter + word.slice(1);
  };

  const displayTopLanuguages = () => {
    {
      if (!isLoading) {
        return countByLanguage.map((count, i) => (
          <div style={style} className="item">
            {i + 1}. {capitalize(count.name)}
          </div>
        ));
      } else {
        return <Spinner />;
      }
    }
  };

  return (
    <React.Fragment>
      <div className="ui header">Top Programming Languages</div>
      <ul className="ui relaxed list"> {displayTopLanuguages()}</ul>
    </React.Fragment>
  );
};

export default Top;
