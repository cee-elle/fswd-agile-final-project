const users = [
  { id: 1, username: "test", password: "test" }
]

function checkUsername(input) {
  for(let i = 0; i < users.length; i++) {
    if(users[i].username === input) {
      return users[i];
    }
  }
}

module.exports = { checkUsername, users }