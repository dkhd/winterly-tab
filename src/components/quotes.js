import React, { useState, useEffect } from "react";
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
            
        }, 60*1000)
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
        <div onMouseEnter={showAuthor} onMouseLeave={hideAuthor}>
            <p className="font-bold text-lg z-10">{quoteText}</p>
            {authorActive && (<p className="text-gray-100 mt-1.5 font-medium">{quoteAuthor || "Anonymous"}</p>)}
        </div>
    );
}

export default Quote;