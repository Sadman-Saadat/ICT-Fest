//login.html e jei plugins gula ase ogula use korar jonne build, dist, plugins add korsi public e

//ekhon resource gula use korar jonne app.js e static folder ta detect kore dite hobe. ete view folder bujhbe je amar resource static er modhhe ase

const app = require('./app');
require('dotenv').config();     //dotenv file er port address jate index e access korte pari
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`App is running at http:\\localhost: ${PORT}`);
})
