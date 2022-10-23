# Superhero_app_server
This is a server side of my superhero app. Please use PostgreSQL.

# Installation
1. Clone this repo
2. Run `npm install`
3. Create your own database and table 'heroes' using `DB_setup_hero_app.txt` in this repo
4. Add your own database credentials to `server.js` line 6
  Your code will be something like this:
            `const db = knex({
                client: 'pg',
                connection: {
                  host : '127.0.0.1',
                  port : 'YOUR PORT',
                  user : 'postgres',
                  password : 'YOUR PASS',
                  database : 'YOUR DB NAME'
                }
              });`
5. Run `npm start`

