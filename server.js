const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for Notes page
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/pages/notes.html'))
);

// Wildcard route to redirect users to the homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log('\x1b[35m' + `📝 App listening at http://localhost:${PORT} 📝` + '\x1b[0m')
);