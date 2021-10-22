require('dotenv').config();

const app = require('./app');
require('./database');

app.listen(app.get('port'), () => {
    console.log('Servidor en línea. Puerto:', app.get('port'))
})