module.exports = (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*'); //liberado para qualquer origem - SAP
  response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, OPTIONS, POST, PUT, DELETE');//metodos liberados
  next();
};
