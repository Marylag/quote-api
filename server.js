const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/api/quotes/random', (req, res) => {
    const randomQuote = getRandomElement(quotes);
    res.json({
        quote: randomQuote});
});
  
app.get('/api/quotes', (req, res) => {
    const { person } = req.query;

    if(person) {
        const quotesByPerson = quotes.filter(quote => quote.person === person);
        res.json({
            quotes: quotesByPerson
        });
    } else {
        res.json({
            quotes: quotes
        });
    }    
});

app.post('/api/quotes', (req, res) => {
    const { quote, person } = req.query;

    if(!quote || !person) {
        return res.status(400).json({ error: 'Both quote and person are required' });
    }

    const newQuote = {
        quote: quote,
        person: person
    };

    quotes.push(newQuote);

    res.json({
        quote: newQuote
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});