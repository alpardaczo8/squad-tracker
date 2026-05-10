const { createTables } = require('./db/tables');
const express = require('express');
const app = express();

createTables();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public'));

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(3000, () => {
	console.log('Server running at http://localhost:3000');
});
