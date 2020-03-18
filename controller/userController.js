const users = [
  { id: 1, username: "test", password: "$2a$05$HxENBmuZVunGE0n7Xbv5Wui8IN1Oi0eS8bXdMEygOoaTeDPBVobR2" } // test/test
]

function checkUsername(input) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === input) {
      return users[i];
    }
  }
}

module.exports = { checkUsername, users }