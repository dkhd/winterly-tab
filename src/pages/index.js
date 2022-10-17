import React, { useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { retrieveImage } from "../util/index";
import { getStorageItem, setStorageItem } from "../util/localstorage";
import {
  Info as InfoIcon,
  Fullscreen as FullscreenIcon,
  Autorenew as AutorenewIcon,
  Camera as CameraIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

import { ReactComponent as BingLogo } from "../svg/bing.svg";
import { ReactComponent as GoogleLogo } from "../svg/google.svg";
import { ReactComponent as YahooLogo } from "../svg/yahoo.svg";

import Clock from "../components/clock";
import About from "../components/about";
import Quote from "../components/quotes";
import Settings from "../components/settings";
import Tooltip from "../components/Tooltip/tooltip";

function Home(props) {
  let [baseURL, toggleBaseURL] = useState("https://www.google.com");
  const [showSearch, toggleSearch] = useState("google");
  const [dim, setDim] = useState("");
  const [data, setData] = useState({});
  const [openAbout, setOpenAbout] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [openSettings, setOpenSettings] = useState(false);
  const [timeFormat, setTimeFormat] = useState(
    getStorageItem("timeFormat") || "12"
  );
  const [name, setName] = useState(getStorageItem("name") || "");

  const handleFullscreen = useFullScreenHandle();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchText.length) {
      window.location = `${baseURL}/search?q=${searchText}`;
    }
  };

  useEffect(() => {
    switch (showSearch) {
      case "yahoo":
        toggleBaseURL("https://search.yahoo.com");
        break;
      case "bing":
        toggleBaseURL("https://www.bing.com");
        break;

      default:
        toggleBaseURL("https://www.google.com");
        break;
    }
  }, [showSearch]);

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
  // console.log(data);

  const imageHandler = async () => {
    const temp = await retrieveImage();
    setData(temp);
  };

  const handleAboutModal = (value) => {
    setOpenAbout(value);
  };

  const handleSettingsDrawer = (value) => {
    setOpenSettings(value);
  };

  const changeTimeFormat = (value) => {
    setStorageItem("timeFormat", value);
    setTimeFormat(value);
  };

  const changeName = (value) => {
    console.log("asdasd");
    setStorageItem("name", value);
    setName(value);
  };

  const changeSearchEngine = () => {
    const engines = ["google", "bing", "yahoo"];
    let idx = 0;

    const engineIdx = engines.findIndex((e) => showSearch === e);

    if (engineIdx > -1) idx = engineIdx + 1;

    if (idx > 2) idx = 0;

    toggleSearch(engines[idx]);
  };

  const renderSearchIcon = (engine) => {
    let cmp;
    switch (showSearch) {
      case "bing":
        cmp = <BingLogo className="h-full w-full" />;
        break;
      case "yahoo":
        cmp = <YahooLogo className="h-full w-full" />;
        break;

      default:
        cmp = <GoogleLogo className="h-full w-full" />;
        break;
    }
    return cmp;
  };

  return (
    <div>
      {data.hasOwnProperty("blur_hash") ? (
        <FullScreen handle={handleFullscreen}>
          <About open={openAbout} toggleModal={handleAboutModal} />
          <div className="w-screen h-screen overflow-hidden">
            <Blurhash hash={data.blur_hash} width="100%" height="100%" />
            <div
              className={"absolute top-0 left-0 w-screen min-h-screen " + dim}
              style={{
                backgroundImage: `url(${data.urls.full}), url(${data.urls.regular})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              }}
            />

            <div className="flex absolute top-0 left-1/2 transform -translate-x-1/2 p-3 my-48">
              <div className="grid grid-cols-12 grid-rows-1 rounded-md bg-opacity-40 bg-black overflow-hidden">
                <div className="pl-4 col-span-2 h-14 w-full">
                  {renderSearchIcon(showSearch)}
                </div>
                <div className="col-span-10 h-full w-full">
                  <input
                    onFocus={(e) => {
                      setDim("filter brightness-50");
                    }}
                    onBlur={(e) => {
                      setDim("");
                    }}
                    className="pl-4 h-full w-full outline-none text-sm text-white bg-transparent placeholder-gray-100"
                    type="text"
                    id="search"
                  
                    placeholder={ (name.length > 0 ? "Hello " + name + "! " : "") + "Search something.."}
                    value={searchText}
                    autoComplete="off"
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={handleSearch}
                  />
                </div>
              </div>
            </div>
            <div className="absolute bottom-5 left-5 flex flex-row w-100 text-sm text-white p-3 bg-opacity-20 bg-black rounded-sm">
              <Clock timeFormat={timeFormat}></Clock>
            </div>
            <div className="absolute bottom-5 left-2/4 transform -translate-x-2/4 w-100 text-base text-white text-center bg-opacity-20 bg-black rounded-sm">
              <Quote />
            </div>
            <div className="absolute bottom-5 right-5 flex flex-row w-100 text-sm text-white p-3 bg-opacity-20 bg-black rounded-sm">
              <Tooltip tooltip={`Photo by ${data.user.name}`}>
                <a
                  href={data.links.html}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium hover:text-gray-200"
                >
                  <CameraIcon />
                </a>
              </Tooltip>
              &nbsp; &middot; &nbsp;
              <Tooltip tooltip="Change Background">
                <button
                  className="flex flex-row items-center gap-1 hover:text-gray-200"
                  onClick={imageHandler}
                >
                  <AutorenewIcon />
                </button>{" "}
              </Tooltip>
              &nbsp; &middot; &nbsp;
              <Tooltip tooltip="Fullscreen">
                <button
                  className="flex flex-row items-center gap-1 font-medium hover:text-gray-200"
                  onClick={
                    !handleFullscreen.active
                      ? handleFullscreen.enter
                      : handleFullscreen.exit
                  }
                >
                  <FullscreenIcon />
                </button>
              </Tooltip>
              &nbsp; &middot; &nbsp;
              <Tooltip tooltip="About">
                <button
                  className="flex flex-row items-center gap-1 font-medium hover:text-gray-200"
                  onClick={() => {
                    handleAboutModal(true);
                  }}
                >
                  <InfoIcon />
                </button>
              </Tooltip>
              &nbsp; &middot; &nbsp;
              <Tooltip tooltip="Change search engine" addon="break-word">
                <button
                  className="flex flex-row items-center gap-1 font-medium hover:text-gray-200"
                  onClick={changeSearchEngine}
                >
                  <SearchIcon />
                </button>
              </Tooltip>
              &nbsp; &middot; &nbsp;
              <Tooltip tooltip="Settings" addon="break-word">
                <button
                  className="flex flex-row items-center gap-1 font-medium hover:text-gray-200"
                  onClick={() => {
                    handleSettingsDrawer(true);
                  }}
                >
                  <SettingsIcon />
                </button>
              </Tooltip>
            </div>
          </div>
        </FullScreen>
      ) : null}
      <Settings
        open={openSettings}
        closeModal={() => handleSettingsDrawer(false)}
        checkedFormat={timeFormat === "24"}
        changeTimeFormat={changeTimeFormat}
        username={name}
        changeName={changeName}
      />
    </div>
  );
}

export default Home;
