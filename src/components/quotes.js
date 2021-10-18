import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

import { quotesCollection } from "../util/fetchquotes"


function Quote(props) {

    const [quote, setQuote] = useState(quotesCollection[(Math.floor(Math.random() * quotesCollection.length))]); 
    const [quoteText, setQuoteText] = useState(quote.text);
    const [quoteAuthor, setQuoteAuthor] = useState(quote.author);
    const [authorActive, setAuthorActive] = useState(false)

    const showAuthor = () => {
        setAuthorActive(true);
    }

    const hideAuthor = () => {
        setAuthorActive(false);
    }

    useEffect(() => {
        const quotesTimer = setInterval(() => {
            let random = Math.floor(Math.random() * quotesCollection.length);
            setQuote(quotesCollection[random]);
            
        }, 15*60*1000)
        return () => {
            clearInterval(quotesTimer);
        }
    }, []);

    useEffect(() => {
        setQuoteText(quote.text);
    }, [quote]);

    useEffect(() => {
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
                leaveTo="opacity-0">
                <p className="text-gray-100 font-medium m-1.5">{quoteAuthor || "Anonymous"}</p>
            </Transition>
        </div>
    );
}

export default Quote;