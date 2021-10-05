import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

function Clock(props) {
  const [time, setTime] = useState(
    DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(DateTime.now().toFormat("cccc · LLLL dd, yyyy · hh:mm:ss a"));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div>{time}</div>;
}

export default Clock;
