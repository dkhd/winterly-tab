import React, { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { retrieveImage } from "../util/index";

import Clock from "../components/clock";
import About from "../components/about";

function Home(props) {
  const [data, setData] = useState({});
  const [openAbout, setOpenAbout] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleFullscreen = useFullScreenHandle();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchText.length){
      window.location = `https://www.google.com/search?q=${searchText}`
    }
  }

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

  const handleAboutModal = (value) => {
    setOpenAbout(value)
  }

  return (
    <div>
      {data.hasOwnProperty("blur_hash") ? (
        <FullScreen handle={handleFullscreen}>
          <About open={openAbout} toggleModal={handleAboutModal}/>
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
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 p-3">
              <div class="relative flex items-center w-third-screen h-12 rounded-md bg-opacity-20 bg-black overflow-hidden">
                <div class="grid place-items-center h-full w-12 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <input
                  class="peer h-full w-full outline-none text-sm text-white pr-2 bg-transparent placeholder-gray-100"
                  type="text"
                  id="search"
                  placeholder="Search something.."
                  value={searchText}
                  onChange={(e)=>setSearchText(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </div>
            </div>
            <div className="absolute bottom-5 left-5 flex flex-row w-100 text-sm text-white p-3 bg-opacity-20 bg-black rounded-sm">
              <Clock></Clock>
            </div>
            <div className="absolute bottom-5 right-5 flex flex-row w-100 text-sm text-white p-3 bg-opacity-20 bg-black rounded-sm">
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
                onClick={!handleFullscreen.active ? handleFullscreen.enter : handleFullscreen.exit}
              >
                Fullscreen
              </button>
              &nbsp; &middot; &nbsp;
              <button
                className="flex flex-row items-center gap-1 font-medium"
                onClick={() => { handleAboutModal(true) }}
              >
                About
              </button>
            </div>
          </div>
        </FullScreen>
      ) : null}
    </div>
  );
}

export default Home;
