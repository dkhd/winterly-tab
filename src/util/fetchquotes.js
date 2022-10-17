const fetchQuotes = () => {
  return fetch("https://type.fit/api/quotes", {
    mode: "cors",
  })
    .then(function (res) {
      return res.json();
    })
    .catch(function (err) {
      console.log(err);
      return err;
    });
};

export { fetchQuotes };
