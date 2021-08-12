const express = require('express');
    morgan = require('morgan');
    const app = express();
    path = require('path'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

mongoose.connect('mongodb://localhost:27017/myFlixDB', {
   useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(morgan('common'));
app.use(express.static('public'));
/*
//  Top 10  Movies
let topMov = [
    { // 1st movie 
        rank: '#1',
        title: 'The Matrix',
        year: '1999',
        genre: {
           genreName: 'Action',
           description: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.'      
        },
        director: {
            name: 'Lana Wachowski',
            bio: ' The American sisters are  film and television directors, writers and producers',
            born: 'June 21, 1965'
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
           bio: 'French-American film director, screenwriter and producer.',
           born: 'January 28, 1959'
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
          description: 'A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto of World War II'},
       director: {
           name: 'Roman Polanski',
           bio: 'Polish-French film director, producer, writer, and actor.',
           born: 'August 18, 1933'
         },
        
    },
    { //5th movie 
        rank: '#5',
        title: 'Les Misérables',
        year: '2012',
        genre: {
          genreName: 'Drama',
          description: 'In 19th-century France, Jean Valjean, who for decades has been hunted by the ruthless policeman Javert after breaking parole, agrees to care for a factory workers daughter. The decision changes their lives forever.'},
       director: {
           name: 'Tom Hooper',
           bio: ' British-Australian film and television director and producer',
           born:  'October 5, 1972'
         },
        
        
    },
    { //6th movie 
        rank: '#6',
        title: 'Taxi Driver',
        year: '1976',
        genre: {
          genreName: 'Drama',
          description: 'A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence and sleaze fuels his urge for violent action by attempting to liberate a presidential campaign worker and an underage prostitute.'},
       director: {
           name: 'Martin Scorsese',
           bio: 'American film director, producer, screenwriter, and actor',
           born: 'November 17, 1942'
         },
    },
    { //7th movie 
        rank: '#7',
        title: 'Scarface',
        year: '1983',
        genre: {
          genreName: 'Drama',
          description: 'In 1980 Miami, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.'},
       director: {
           name: 'Brian De Palma',
           bio: ' American film director and screenwriter',
           born: 'September 11, 1940'
         },
        
    },
    { // 8th movie
        rank: '#8',
        title: 'The Pursuit of Happyness',
        year: '2006',
        genre: {
          genreName: 'Drama',
          description: 'A struggling salesman takes custody of his son as he is poised to begin a life-changing professional career.'},
       director: {
           name: 'Gabriele Muccino',
           bio: 'Italian film director.',
           born: 'May 20, 1967'
         }
    },
    { //9th movie 
        rank: '#9',
        title: 'Inception',
        year: '2010',
        genre: {
          genreName: 'Action',
          description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'},
       director: {
           name: 'Christopher Nolan',
           bio: 'British-American film director, producer, and screenwriter ',
           born: 'July 30, 1970'
         },
        
        
    },
    { //10th movie 
        rank: '#10',
        title: 'The Godfather',
		year: '1972',
    genre: {
      genreName: 'Thriller',
      description: 'An organized crime dynasty is aging patriarch transfers control of his clandestine empire to his reluctant son.'},
   director: {
       name: 'Francis Ford Coppola',
       bio: 'American film director, producer, and screenwriter.',
       born: 'April 7, 1939'
     },
    }
  ]; 
*/
  let users = []

  // GET requests 
app.get('/', (req, res) => {
    res.send('Welcome to my Movie Database');
  });
  
  

  // Get all Movies
app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get movie by a title

app.get('/movies/:title', (req, res) => {
  Movies.findOne({ 
      Title: req.params.title
    })
    .then((movie) => {
      res.json(movie);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })
});

// Get all Directors 
app.get('/directors', (req, res) => {
  Directors.find()
    .then((director) => {
      res.status(200).json(director);
    }).catch((err) => {
      console.error(err);
      res.status(500).sned('Error: ' + err);
    });
});

// Gets the data about the name of the director
app.get('/directors', (req, res) => {
  Directors.find()
    .then((director) => {
      res.status(200).json(director);
    }).catch((err) => {
      console.error(err);
      res.status(500).sned('Error: ' + err);
    });
});


// Get genres 
app.get('/genres', (req, res) => {
  Genres.find()
    .then((genre) => {
      res.status(200).json(genre);
    }).catch((err) => {
      console.error(err);
      res.status(500).sned('Error: ' + err);
    });
});

// Get genres by name 
app.get('/genres/:Name', (req, res) => {
  Genres.findOne({
      Name: req.params.Name
    })
    .then((genre) => {
      res.json(genre);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })
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

 // Get Users
 app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get user by name 
app.get('/users/:Username', (req, res) => {
  Users.findOne({
      Username: req.params.Username
    })
    .then((user) => {
      res.json(user);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Add a user 
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Update a user's username 
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, 
  // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, 
   // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Remove a movie form user's fav list 
app.delete('/users/:Username/favorites/:_id', (req,res) => {
  users.findOneAndUpdate ({ Username: req.params.Username},
    { $pull: { FavoritMovies: req.params._id} },
    {new: true},
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Delete a user by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Error-handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });
