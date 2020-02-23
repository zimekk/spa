const express = require('express')
const { Router } = express;

let serial = 1;
const createId = () => serial++;

const models = {
  users: ['Michał', 'Hania', 'Marcin']
    .map((name) => ({ id: createId(), name }))
    .reduce((users, user) => ({ ...users, [user.id]: user }), {})
};

const users = Router()
  .get('/', ({ context }, res) => res.send(Object.values(context.models.users)))
  .post('/', ({ context, body }, res) => {
    const user = { id: createId(), ...body };
    Object.assign(context.models, {
      users: { ...context.models.users, [user.id]: user }
    });
    res.send(user);
  })
  .delete('/:id', ({ context, params }, res) => {
    const { [params.id]: user, ...users } = context.models.users;
    Object.assign(context.models, {
      users
    });
    res.send(user);
  });

module.exports = Router().use((req, res, next) => {
  req.context = {
    models
  };
  next();
}).use(express.json()).use('/users', users);
