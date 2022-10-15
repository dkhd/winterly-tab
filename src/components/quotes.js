import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

import { fetchQuotes } from "../util/fetchquotes";

function Quote(props) {
  const [collections, setCollections] = useState([]);
  const [quote, setQuote] = useState({});
  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");
  const [authorActive, setAuthorActive] = useState(false);

  const showAuthor = () => {
    setAuthorActive(true);
  };

  const hideAuthor = () => {
    setAuthorActive(false);
  };

  useEffect(() => {
    fetchQuotes().then((data) => {
      setCollections(data);
    });
  }, []);

  useEffect(() => {
    const generateQoute = () => {
      if (collections.length < 1) return;
      let random = Math.floor(Math.random() * collections.length);
      setQuote(collections[random]);
    };

    generateQoute();

    const quotesTimer = setInterval(generateQoute, 15 * 60 * 1000);

    return () => {
      clearInterval(quotesTimer);
    };
  }, [collections]);

  useEffect(() => {
    setQuoteText(quote.text);
    setQuoteAuthor(quote.author);
  }, [quote]);

  return (
    <div className="p-3" onMouseEnter={showAuthor} onMouseLeave={hideAuthor}>
      <p className="font-bold text-lg z-10">{quoteText}</p>
      <Transition
        show={authorActive}
        enter="transition-all duration-500"
        enterFrom="opacity-75 -mt-5"
        enterTo="opacity-100 mt-1.5"
        leave="transition-all duration-250"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <p className="text-gray-100 font-medium m-1.5">
          {quoteAuthor || "Anonymous"}
        </p>
      </Transition>
    </div>
  );
}

export default Quote;
