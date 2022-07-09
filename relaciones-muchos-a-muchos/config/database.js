const mongoose = require('mongoose');
const dbName = 'local_web_service_database'

module.exports = {
  connect: () => mongoose.connect(`mongodb://localhost/${dbName}`),
  dbName,
  connection: () => {
    if(mongoose.connection) return mongoose.connection;
    
    return this.connect();
  }
}