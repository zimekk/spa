import React, { useEffect, useState } from 'react';

const UserList = ({ users, deleteUser }) => {
  return (
    <ul>
      {users.map(({ id, name }) => (
        <li key={id}>
          {name}
          <button type="button" onClick={e => deleteUser(id)}>Usuń</button>
        </li>
      ))}
    </ul>
  );
}

const INITIAL_NAME = '';

const UserForm = ({ createUser }) => {
  const [name, setName] = useState(INITIAL_NAME);
  return (
    <form onSubmit={e => {
      e.preventDefault();
      createUser(name);
      setName(INITIAL_NAME);
    }}>
      <label>
        Nazwa
    <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <button type="submit" disabled={name === INITIAL_NAME}>Dodaj</button>
    </form>
  );
}

const App = () => {
  const [users, setUsers] = useState(null);

  const fetchUsers = () => fetch('/api/users')
    .then(response => response.json())
    .then(users => setUsers(users))
    .catch(console.error);

  const createUser = (name) => fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  })
    .then(response => response.json())
    .then(user => setUsers(users.concat(user)))
    .catch(console.error);

  const deleteUser = (id) => fetch(`/api/users/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(user => setUsers(users.filter(({ id }) => user.id !== id)))
    .catch(console.error);

  useEffect(() => {
    fetchUsers();
  }, []);
  return users ? (
    <div>
      <UserList users={users} deleteUser={deleteUser} />
      <UserForm createUser={createUser} />
    </div>
  ) : (
      <div>Ładowanie...</div>
    );
}

export default App;
