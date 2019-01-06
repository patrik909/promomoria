# PROMOMORIA

## Client-side

## Server-side (server/server.js)

Name a phpmyadmin database to - promomoria.
Then import the db.sql

Change values in - server/mailCredentials.js. If your not using gmail, change line 27 (server/server.js).
Please change line 141 (server/server.js) too, otherwise i'll get the info about new user registered :)

The mail function doesn't really have any functionally atm, just giving the admin an notification about a new user. The user should be set to active = 0 in myphpadmin, but at the moment the user is activated already from the time user is registered..

Also add the folder uploads + artwork & tracks subfolder.
(server/uploads/artwork)
(server/uploads/tracks)

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
