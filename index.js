const { createTables } = require('./db/tables');
const express = require('express');
const app = express();
const playersRouter = require('./routes/players');
const teamsRouter = require('./routes/teams');
const seasonsRouter = require('./routes/seasons');

createTables();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use('/', playersRouter);
app.use('/', teamsRouter);
app.use('/', seasonsRouter);

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(3000, () => {
	console.log('Server running at http://localhost:3000');
});
