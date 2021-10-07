import React, { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { retrieveImage } from "../util/index";

import Clock from "../components/clock";

function Home(props) {
  const [data, setData] = useState({});

  const handleFullscreen = useFullScreenHandle();

  useEffect(() => {
    const update = async () => {
      imageHandler();
      const timer = setInterval(() => {
        imageHandler();
      }, 30000);
      return () => {
        clearInterval(timer);
      };
    };
    update();
  }, []);
  console.log(data);

  const imageHandler = async () => {
    const temp = await retrieveImage();
    setData(temp);
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
                backgroundImage: "url(" + data.urls.regular + ")",
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
                onClick={imageHandler}
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
