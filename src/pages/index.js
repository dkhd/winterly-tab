import React, { useEffect, useState } from "react";
import axios from "axios";
import { Blurhash } from "react-blurhash";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import Clock from "../components/clock";

function Home(props) {
  const [data, setData] = useState({});

  const handleFullscreen = useFullScreenHandle();

  useEffect(() => {
    retrieveImage();
    const timer = setInterval(() => {
      retrieveImage();
    }, 30000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const retrieveImage = () => {
    axios.get("https://qolqi.sse.codesandbox.io/images").then((res) => {
      const totalImage = res.data.length;
      const min = Math.ceil(0);
      const max = Math.floor(totalImage);
      const n = Math.floor(Math.random() * (max - min + 1)) + min;
      setData(res.data[n]);
    });
  };
  return (
    <div>
      {data.hasOwnProperty("blur_hash") ? (
        <FullScreen handle={handleFullscreen}>
          <div className="w-screen h-screen overflow-hidden">
            <Blurhash hash={data.blur_hash} width="100%" height="100%" />
            <div
              className="absolute top-0 left-0 w-screen min-h-screen"
              style={{
                backgroundImage: "url(" + data.urls.full + ")",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              }}
            />
            Any fullscreen content here
            <div className="absolute bottom-5 left-5 flex flex-row w-100 text-sm text-white p-3 bg-opacity-10 bg-black">
              <Clock></Clock>
            </div>
            <div className="absolute bottom-5 right-5 flex flex-row w-100 text-sm text-white p-3 bg-opacity-10 bg-black">
              <span>
                Photo by{" "}
                <a
                  href={data.links.html}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium"
                >
                  {data.user.name}
                </a>
              </span>
              &nbsp; &middot; &nbsp;
              <button
                className="flex flex-row items-center gap-1"
                onClick={retrieveImage}
              >
                <span className="font-medium">Change Background</span>
              </button>{" "}
              &nbsp; &middot; &nbsp;
              <button
                className="flex flex-row items-center gap-1 font-medium"
                onClick={handleFullscreen.enter}
              >
                Fullscreen
              </button>
              &nbsp; &middot; &nbsp;
              <span>
                Winterly Tab by{" "}
                <a
                  href="https://hadna.space"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium"
                >
                  Diky Hadna
                </a>
              </span>
            </div>
          </div>
        </FullScreen>
      ) : null}
    </div>
  );
}

export default Home;
