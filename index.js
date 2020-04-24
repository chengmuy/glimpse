const httpServer = require('./server/app.js');
const PORT = process.env.PORT || 4200;

httpServer.listen(PORT, () => {
  console.log(`Glimpse is listening on port ${PORT}`);
});
