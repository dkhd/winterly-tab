import React, { useEffect, useState } from "react";
import { DateTime } from "luxon";

function Clock({ timeFormat }) {
  const [time, setTime] = useState(
    DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const hourFormat = timeFormat === "12" ? "hh" : "HH"
      setTime(DateTime.now().toFormat(`cccc · LLLL dd, yyyy · ${hourFormat}:mm:ss a`));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timeFormat]);

  return <div data-testid="clock">{time}</div>;
}

export default Clock;
