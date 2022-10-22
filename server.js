const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5433,
      user : 'postgres',
      password : '452263632',
      database : 'superhero_app'
    }
  });

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req,res) => {
	res.send('Success')
})

app.get('/get_heroes', (req,res) => {
	db.select('*').from('heroes')
	.then(data => res.json(data))
	.catch(err => res.status(400).json('Unable to get heroes from db'))
})

app.post('/new_hero', (req,res) => {
	const {nickname, real_name, origin_description, superpowers, catch_phrase, images, main_image_index} = req.body;
	db('heroes').insert({
		nickname: nickname,
		real_name: real_name,
		origin_description: origin_description,
		superpowers: superpowers,
		catch_phrase: catch_phrase,
		images: images,
		main_image_index: main_image_index
	})
	.then(() => {
		db.select('*').from('heroes')
		.then(data => res.json(data))
		.catch(err => res.status(400).json('Unable to get new data after add new hero'))
	})
	.catch(err => res.status(400).json('Unable to add new hero('))
})

app.delete('/delete_hero', (req,res) => {
	const { heroname } = req.body;
	db('heroes').where('nickname', heroname).del()
	.then(() => {
		db.select('*').from('heroes')
		.then(data => res.json(data))
		.catch(err => res.status(400).json('Unable to get new data after deleting hero'))
	})
	.catch(err => res.status(400).json('Unable to delete hero('))
})

app.put('/add_image', (req,res) => {
	const { data, heroname } = req.body;
	db('heroes').where('nickname', heroname).update('images', data)
	.then(() => {
		db.select('*').from('heroes')
		.then(data => res.json(data))
		.catch(err => res.status(400).json('Unable to get new data after adding hero image'))
	})
	.catch(err => res.status(400).json('Unable to add new hero image('))

})

app.put('/delete_image', (req,res) => {
	const { data, heroname } = req.body;
	db('heroes').where('nickname', heroname).update('images', data)
	.then(() => {
		db.select('*').from('heroes')
		.then(data => res.json(data))
		.catch(err => res.status(400).json('Unable to get new data after deleting hero image'))
	})
	.catch(err => res.status(400).json('Unable to delete hero image('))
})

app.put('/update_image', (req,res) => {
	const { index, heroname } = req.body;
	db('heroes').where('nickname', heroname).update('main_image_index', index)
	.then(() => {
		db.select('*').from('heroes')
		.then(data => res.json(data))
		.catch(err => res.status(400).json('Unable to get new data after updating hero image'))
	})
	.catch(err => res.status(400).json('Unable to update hero image('))
})

app.listen(3001); 