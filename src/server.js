const { connectToDB } = require('./common/db.mongo');
const { PORT } = require('./common/config');
const app = require('./app');

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
