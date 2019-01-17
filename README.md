#PROMOMORIA

## Get started with your local application

### Server side

git clone https://github.com/patrik909/promomoria.git

cd promomoria

Set up your local server and open myPhpAdmin. create an database named promomoria.
You can find db.sql in promomoria/server/, the file includes all the tables and columns for the database.

Create subfolders in promomoria/server/: <br>
promomoria/server/uploads/artwork <br>
promomoria/server/uploads/tracks

Add an js file to promomoria/server/ named mailCredentials.js and include this code:
module.exports = {
	USER: Your mail here,
	PASS: Your password here
};

If your not using gmail, change line 27 (server/server.js).
Please change line 141 (server/server.js) too, otherwise i'll get the info about new user registered.

Now everything is ready to be installed, open up the terminal again!

cd server
npm install
npm start

Now your terminal should leave you this message: App listening on port 3001!

Open up a new tab in your terminal and cd ..

### Client-side

cd promo
npm install
npm start

Now your local Promomoria should be up and running :) You can add an account and login. In the live version i've have to active an new user trough myPhpAdmin. In the local version active is set to 1 by default.

### SASS
Organized properties by:
* Includes
* Position
* Display
* Height & Width
* Margin & Padding 
* Box - Border & Overflow etc
* Background/Color/Opacity
* Text 
* Other (Alphabetically)
