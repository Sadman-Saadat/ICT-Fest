const app = require('./app');
require('dotenv').config();     //dotenv file er port address jate index e access korte pari
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`App is running at http:\\localhost: ${PORT}`);
})
