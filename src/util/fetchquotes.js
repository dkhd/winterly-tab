
let quotesCollection = [];

fetch('https://type.fit/api/quotes', {
    mode: 'cors'
})
    .then(function (res) {
        return res.json();
    })
    .then(function (res) {
        quotesCollection = res
    })
    .catch(function (err) {
        console.log(err);
    })

export { quotesCollection };