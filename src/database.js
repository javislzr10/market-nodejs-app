const mongoose =require('mongoose')

const {MARKET_NODEJS_APP_HOST, MARKET_NODEJS_APP_DATABASE} = process.env;
const MONGODB_URI = `mongodb://${MARKET_NODEJS_APP_HOST}/${MARKET_NODEJS_APP_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    
}, err => {
    if(err) throw err;
    console.log('Conectado a MongoDB')
    });

