const app = require('./app.js');
const port = 4200;

app.listen(port, () => {
  console.log(`Glimpse is listening on port ${port}`);
});
