const express = require('express');
const { db } = require('../database/db');
const cors = require('cors');
const { usersRouter } = require('../routes/user.router');
const { repairsRouter } = require('../routes/repair.router');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.paths = {
      user: '/api/v1/users',
      repair: '/api/v1/repairs',
    };

    this.database();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.user, usersRouter);
    this.app.use(this.paths.repair, repairsRouter);
  }

  database() {
    db.authenticate()
      .then(() => {
        console.log('Database authenticate');
      })
      .catch(err => console.log(err));

    db.sync()
      .then(() => {
        console.log('Database Synced');
      })
      .catch(err => {
        console.log(err);
      });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port', this.port);
    });
  }
}

module.exports = Server;
