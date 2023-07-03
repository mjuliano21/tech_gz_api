module.exports = (error, request, response, next) => {
  console.log('error', error);
  response.sendStatus(500);
};
