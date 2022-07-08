function buildParams(validParams, body) {
  //Actualizar un recurso
  let params = {};

  //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
  validParams.forEach(attr => {
    if (Object.prototype.hasOwnProperty.call(body, attr))
      params[attr] = body[attr];
  })

  return params;
}

module.exports = { buildParams } 