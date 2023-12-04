## Frontend:
1. [Display users in cards format with pagination 20 users per page 🔗](https://github.com/gaonkarBhai/Heliverse-Assignment/blob/master/client/src/pages/Home/Home.jsx#L62)
2. [Search by Name🔗](https://github.com/gaonkarBhai/Heliverse-Assignment/blob/master/client/src/toolkit/users/usersSlice.js#L18)
3. [Add 3 filters: Implement three filters - Domain, Gender, and Availability.🔗](https://github.com/gaonkarBhai/Heliverse-Assignment/blob/master/client/src/pages/Home/Home.jsx#L42)
4. [Create a team: Users should be able to create a team by selecting users from the list with unique domains.🔗](https://github.com/gaonkarBhai/Heliverse-Assignment/blob/master/client/src/components/createTeam/CreateTeam.jsx#L16)
5. [Show team details🔗](https://github.com/gaonkarBhai/Heliverse-Assignment/blob/master/client/src/pages/Team/Team.jsx#L7)
6. [Make it responsive : tailwindcss🔗](https://github.com/gaonkarBhai/Heliverse-Assignment/blob/master/client/tailwind.config.js#L1)


## Backend:
Create CRUD API

| HTTP Method | Endpoint          | Description                     |
|-------------|-------------------|---------------------------------|
| GET         | [`/users`](https://github.com/gaonkarBhai/Heliverse-Assignment/blob/master/routes/usersRoute.js#L5)            | Retrieve all users              |
| GET         | [`/users/:id `](https://github.com/gaonkarBhai/Heliverse-Assignment/blob/master/routes/usersRoute.js#L6)       | Retrieve a single user by ID     |
| POST        | [`/users `](https://github.com/gaonkarBhai/Heliverse-Assignment/blob/master/routes/usersRoute.js#L7)           | Create a new user               |
| PUT         | [`/users/:id `](https://github.com/gaonkarBhai/Heliverse-Assignment/blob/master/routes/usersRoute.js#L8)       | Update a user by ID             |
| DELETE      | [`/users/:id `](https://github.com/gaonkarBhai/Heliverse-Assignment/blob/master/routes/usersRoute.js#L9)       | Delete a user by ID             |
| POST        | [`/team`](https://github.com/gaonkarBhai/Heliverse-Assignment/blob/master/routes/teamRoutes.js#L6)             | Create a new team               |
| GET         | [`/team/:id`](https://github.com/gaonkarBhai/Heliverse-Assignment/blob/master/routes/teamRoutes.js#L7)         | Retrieve a single team by ID     |

