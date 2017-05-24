var authDetails = require('./authDetails');

module.exports = {
    
    getDbConnectionString: function() {
        return 'mongodb://'+ authDetails.uname +':'+ authDetails.pwd +'@pokecatchapi-shard-00-00-jrqxq.mongodb.net:27017,pokecatchapi-shard-00-01-jrqxq.mongodb.net:27017,pokecatchapi-shard-00-02-jrqxq.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=PokeCatchApi-shard-0&authSource=admin';
    }
    
}