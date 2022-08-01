var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "issuedb.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
   if (err) {
      console.error(err.message)
      throw err
   }
   else {
      console.log('Connected to the SQLite database.')
      db.run(`CREATE TABLE user (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         username text, 
         password text
         )`,
            (err) => {
               if (err) {
                  console.log(err);
               }
               else {
                  let insertUser = 'INSERT INTO user (username, password) VALUES (?,?)'

                  db.run(insertUser, ['admin', 'admin'])
                  db.run(insertUser, ['user', 'user'])
               }
            }
      );
      db.run(`CREATE TABLE issue (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         title text,
         userId integer,
         state text, 
         comments real, 
         issueNumber real, 
         stateDate text,
         issueText text,
         FOREIGN KEY(userId) REFERENCES user(id)
         )`,
            (err) => {
               if (err) {
                  console.log(err);
               }
               else {
                  let insert = 'INSERT INTO issue (title, userId, state, comments, issueNumber, stateDate, issueText) VALUES (?,?,?,?,?,?,?)'

                  db.run(insert, ['Angular', 1, 'open', 1, 1, '2020-05-26 10:10', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas.'])
                  db.run(insert, ['Angular', 1, 'open', 2, 2, '2020-05-28 11:10', 'text'])
                  db.run(insert, ['Angular', 1, 'open', 1, 3, '2020-05-29 09:22', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas.'])
                  db.run(insert, ['Java', 1, 'open', 1, 4, '2020-06-06 16:18', 'text'])
                  db.run(insert, ['Angular', 1, 'closed', 4, 5, '2020-06-01 18:14', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas.'])
                  db.run(insert, ['Java', 1, 'closed', 1, 6, '2020-06-01 18:14', 'text'])
                  db.run(insert, ['React', 1, 'closed', 2, 7, '2020-06-01 18:14', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas.'])
                  db.run(insert, ['Javascript', 1, 'open', 1, 8, '2020-05-29 09:22', 'text'])
                  db.run(insert, ['Javascript', 1, 'closed', 2, 9, '2020-01-29 09:22', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas.'])
                  db.run(insert, ['React', 1, 'closed', 1, 10, '2020-06-01 18:14', 'text'])
                  db.run(insert, ['Python', 1, 'open', 3, 11, '2020-06-01 18:14', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam sequi voluptate quas.'])
               }
            }
      );  
   }
});

module.exports = db