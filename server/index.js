const httpServer = require('./app.js');
const port = 4200;

httpServer.listen(port, () => {
  console.log(`Glimpse is listening on port ${port}`);
});
