const express = require('express');
    morgan = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

app.use(morgan('common'));

app.use(express.static('public'));

//  Top 10  Movies
let topMov = [
    { // 1st movie 
        rank: '#1',
        title: 'The Matrix',
        year: '1999',
        genre: {
           genreName: 'Action,Sci-Fi',
           description: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.'      
        },
        director: {
            name: 'Lana Wachowski,Lilly Wachowski',
            bio: ' The American sisters are  film and television directors, writers and producers',
            born: 'June 21, 1965,December 29, 1967'
          },
        },
    { // 2 movie 
        rank: '#2',
        title: 'The Shawshank Redemption',
        year: '1994',
        genre: {
          genreName: 'Drama',
          description:'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.' },
       director: {
           name: 'Frank Darabont',
           bio: '  French-American film director, screenwriter and producer of Hungarian[2] descent.‚',
           born: ' January 28, 1959 in Montbéliard, Doubs, France'
         },
        
        
    },
    { //3rd movie 
        rank: '#3',
        title: 'Requiem for a Dream',
        year: '2000',
        genre: {
          genreName: 'Drama',
          description: 'The drug-induced utopias of four Coney Island people are shattered when their addictions run deep.'},
       director: {
           name: 'Darren Aronofsky',
           bio: ' American film director, producer, and screenwriter',
           born: 'February 12, 1969'
         },
        
      
    },
    { //4th movie 
        rank: '#4',
        title: 'The Pianist',
        year: '2002',
        genre: {
          genreName: 'Drama',
          description: ' A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto of World War II'},
       director: {
           name: 'Roman Polanski',
           bio: '  Polish-French film director, producer, writer, and actor.',
           born: ' August 18, 1933 in Paris, France'
         },
        
    },
    { //5th movie 
        rank: '#5',
        title: 'Les Misérables',
        year: '2012',
        genre: {
          genreName: 'Drama,History',
          description: 'In 19th-century France, Jean Valjean, who for decades has been hunted by the ruthless policeman Javert after breaking parole, agrees to care for a factory workers daughter. The decision changes their lives forever.'},
       director: {
           name: 'Tom Hooper',
           bio: ' British-Australian[n 1] film and television director and producer',
           born:  'October 5, 1972 in London, England, UK'
         },
        
        
    },
    { //6th movie 
        rank: '#6',
        title: 'Taxi Driver',
        year: '1976',
        genre: {
          genreName: 'Drama,Crime',
          description: 'A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence and sleaze fuels his urge for violent action by attempting to liberate a presidential campaign worker and an underage prostitute.'},
       director: {
           name: 'Martin Scorsese',
           bio: 'American film director, producer, screenwriter, and actor',
           born: 'November 17, 1942 in Queens, New York City, New York, USA'
         },
    },
    { //7th movie 
        rank: '#7',
        title: 'Scarface',
        year: '1983',
        genre: {
          genreName: 'Drama,Crime',
          description: 'In 1980 Miami, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.'},
       director: {
           name: 'Brian De Palma',
           bio: ' American film director and screenwriter',
           born: ' September 11, 1940 in Newark, New Jersey, USA'
         },
        
    },
    { // 8th movie
        rank: '#8',
        title: 'The Pursuit of Happyness',
        year: '2006',
        genre: {
          genreName: 'Drama,Biography',
          description: 'A struggling salesman takes custody of his son as he is poised to begin a life-changing professional career.'},
       director: {
           name: 'Gabriele Muccino',
           bio: 'Italian film director.',
           born: 'May 20, 1967 in Rome, Lazio, Italy'
         }
    },
    { //9th movie 
        rank: '#9',
        title: 'Inception',
        year: '2010',
        genre: {
          genreName: 'Action,Sci-Fi,Adventure',
          description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O. '},
       director: {
           name: 'Christopher Nolan',
           bio: 'British-American film director, producer, and screenwrite ',
           born: ' July 30, 1970 in London, England, UK '
         },
        
        
    },
    { //10th movie 
        rank: '#10',
        title: 'The Godfather',
		year: '1972',
    genre: {
      genreName: 'Thriller',
      description: ' An organized crime dynasty is aging patriarch transfers control of his clandestine empire to his reluctant son.'},
   director: {
       name: 'Francis Ford Coppola',
       bio: 'American film director, producer, and screenwriter.',
       born: 'April 7, 1939 in Detroit, Michigan, USA'
     },
    }
  ];

  let users = []

  // GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my Movie Database');
  });
  
  

  // Get  a list of Movies 
  app.get('/movies', (req, res) =>{
    res.json(topMov);
});

// Gets the data about a movie , by name

app.get('/movies/:title', (req, res) => {
    res.json(topMov.find((movie) =>
      { return movie.title === req.params.title
    }));
  });

  // Gets the data about the name of the director
  app.get('/movies/directors/:name', (req, res) => {
    res.json(topMov.find((movie) => {
      return movie.director.name === req.params.name;
    }));
  });

  // Gets the data bout the genre of the movie 
  app.get('/movies/genre/:name', (req, res) => {
    res.json(topMov.find((movie) => {
      return movie.genre.genreName === req.params.name;
    }));
  });

  // Allow new users to register
app.post('/users', (req, res) => {
	let newUser = req.body;

	if (!newUser.name) {
		const message = 'Missing name in request body';
		res.status(400).send(message);
	} else {
		newUser.id = uuid.v4();
		users.push(newUser);
		res.status(201).send(newUser);
	}
});

 // User info will displayed about the searched Username
 app.put('/users/:username', (req, res) => {
	let userName = users.find((username) => 
			res.send('Student with the name was not found.'));
});
  

// Error-handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });