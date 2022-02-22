const express = require('express');
const routesUsers = require('./routes/users.route');
const routePosts = require('./routes/posts.route');
const apiError = require('./errors/api.erorr');

const client = require('./db/connect');

const port = process.env.PORT || 3000;


const app = express();

app.use(express.json());
app.use(routesUsers);
app.use(routePosts);
app.use(apiError);

client.connect().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on: ${port}`);
  });
});

process.on('exit', () => {
  client.end();
});
