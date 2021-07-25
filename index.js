const express = require('express');
    morgan = require('morgan');

const app = express();


//  Top 10  Movies
let topMov = [
    {
        movie: 'The Matrix',
        year: '1999',
        directors: 'Lana Wachowski,Lilly Wachowski',
        genre: 'Action,Sci-Fi'
    },
    {
        movie: 'The Shawshank Redemption',
        year: '1994',
        director: 'Frank Darabont',
        genre: 'Drama'
    },
    {
        movie: 'Requiem for a Dream',
        year: '2000',
        director: 'Darren Aronofsky',
        genre: 'Drama'
    },
    {
        movie: 'The Pianist',
        year: '2002',
        director: 'Roman Polanski',
        genre: 'Drama'
    },
    {
        movie: 'Les Misérables',
        year: '2012',
        director: 'Tom Hooper',
        genre: 'Drama,History'
    },
    {
        movie: 'Taxi Driver',
        year: '1976',
        director: 'Martin Scorsese',
        genre: 'Drama,Crime'
    },
    {
        movie: 'Scarface',
        year: '1983',
        director: 'Brian De Palma',
        genre: 'Drama,Crime'
    },
    {
        movie: 'The Pursuit of Happyness',
        year: '2006',
        director: 'Gabriele Muccino',
        genre: 'Biography,Drama'
    },
    {
        movie: 'Inception',
        year: '2010',
        director: 'Christopher Nolan',
        genre: 'Action,Sci-Fi,Adventure'
    },
    {
        movie: 'The Godfather',
		year: '1972',
		director: 'Francis Ford Coppola',
		genre: 'thriller'
    }
  ];

  app.use(morgan('common'));

  // GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my Movie Database');
  });
  
  app.use(express.static('public'));

  // Returns a list of Movies 
  app.get('/movies', (req, res) =>{
    res.json(topMov);
});

// Error-handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });