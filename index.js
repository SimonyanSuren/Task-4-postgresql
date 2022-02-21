const express = require('express');
const routesUsers = require('./routes/users.route');
const routesOneUser = require('./routes/oneuser.route');
const routePosts = require('./routes/posts.route');
const apiError = require('./errors/api.erorr');

const client = require('./db/connect');

const app = express();

app.use(express.json());
app.use(routesOneUser);
app.use(routesUsers);
app.use(routePosts);
app.use(apiError);
client.connect().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on: 3000');
  });
});

process.on('exit', async () => {
  await client.end();
});
