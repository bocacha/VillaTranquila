const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true}).then(() => {
  server.listen(process.env.PORT || 3001, () => {
    console.log('Server listening at port 3001'); // eslint-disable-line no-console
  });
});
