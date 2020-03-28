# fswd-agile-final-project

Users can search for meal suggestions by searching the main ingredient.

Filters to results can be applied through calorie per serving and specific diet restrictions.

Registered user credentials are stored on our MongoDB with passwords appropriately hashed.

To run locally:

1. install dependencies

```bash
npm install
```

1. run server

```bash
npm start
```

_or_

```bash
node server.js
```

---

### Current active endpoints for users:

```
* home
http://localhost:8888/

* login/sign-up
http://localhost:8888/login_and_signup

--- note you will be automatically redirected to the appropriate endpoints depending on the type of user ---

* dashboard
http://localhost:8888/secure

* admin panel
http://localhost:8888/admin/a

* normal user for admin
http://localhost:8888/admin/normal

* premium user for admin
http://localhost:8888/admin/premium

* logout
http://localhost:8888/user/logout

```

---

### Internal endpoints

```

* depreciated sign-up POST
http://localhost:8888/signup

* depreciated sheets.best POST
http://localhost:8888/admin/a

---

* user login POST
http://localhost:8888/user/gNQu5jGgxPL42r8g5zm6

* create user POST
http://localhost:8888/user/JKp7DeJXgaFtxaJ7FTXb

* premium user api route POST
http://localhost:8888/api/getinfo

* normal user api route POST
http://localhost:8888/api/getinfo_normal

* admin get user info GET
http://localhost:8888/admin/a

* admin update user UPDATE
http://localhost:8888/admin/update

* admin delete user DELETE
http://localhost:8888/admin/delete

* normal and premium dashboard access for admin
http://localhost:8888/admin/normal
http://localhost:8888/admin/premium

```
