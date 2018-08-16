// import mongojs from 'mongojs';

import * as admin from 'firebase-admin';

var serviceAccount = require('../firebaseConfig.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://test-74eeb.firebaseio.com"
});

var db = admin.firestore();

module.exports = app => {

  app.post('/get', (req, res) => {
    
    const collection = req.body.collection;

    db.collection(collection).get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          // console.log(doc.id, '=>', doc.data());
          res.json({
            response: doc.data()
          })
        });
      })
      .catch((err) => {
        res.json({
          response: err
        })
        // console.log('Error getting documents', err);
      });
  });


  app.post('/post', (req, res) => {

    const collection = req.body.collection;
    const doc = req.body.doc;

    db.collection(collection).doc().set(doc).then(
      response => {

        res.json({
          response: {
            status: 'OK'
          }
        })
      }
    ).catch(
      error => {
        res.json({
          response: error
        })
      }
    )
  });


  app.post('/delete', (req, res) => {

    console.log(req.body)

    const collection = req.body.collection;
    const id = req.body.id;

    db.collection(collection).doc(id).delete().then(
      response => {

        res.json({
          response: {
            status: 'OK'
          }
        })
      }
    ).catch(
      error => {
        res.json({
          response: error
        })
      }
    )
  });

};
