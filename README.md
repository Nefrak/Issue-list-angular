# Issue-list-app
Folder also consist of folder with backend called Issue-list-server. This is my first app using angular, so there will probably be some mistakes.

## Issue-list
Use npm install to install node packages first.
Run using command: ng serve
Simple frontend app. Gets data from Issue-list-api. There are some simplifications, like username and password should be hashed.
There should be identification token and password shouldn't be saved in local storage.

## Issue-list-server
Located in Issue-list-server folder.
Run using command: npm run start
Create simple SQLite database and runs server.js. Server runs on port 8000 and returns data in JSON format.
