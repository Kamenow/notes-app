### Notes App MonoRepo

I put everything in one repository for convenience's sake

### Frontend

run `npm i` in `client` folder
In `client/src/services/apiUrl.ts` there is the `PORT` and `URL` for the server. Feel free to change it if necessary.

All requests to backend are encaplusated in `client/src/services`
And are mostly used in the hooks located in `client/src/hooks`

All components are in `client/src/components`
Pages are separated from components in `client/src/pages`

Global types are in `client/src/types`

### Backend

I made a `postman` with example requests:
[postman](https://app.getpostman.com/join-team?invite_code=91a523aed7f77f5db847f9a10b2373ca&target_code=b5ad3ea1d6244e4cd38c9ea4113af07b)

i've created some environment variables:
![image](https://github.com/Kamenow/notes-app/assets/71972811/337604a0-a423-413f-b670-a5da22da7a0f)

On login you will receive a JWT token (keep in mind only it lasts an hour) it should be auto inserted in `token` variable, if not you should paste it in manually. It's needed in order to access the `notes` routes
The `url` field should be changed to the `server` endpoint

run `npm i` in `server` folder

for setup in the backend we have a `.env` file with database info:

``` .env
PORT=3000
TOKEN_SECRET=secret_token_need_long_long_name_secret_token_need_long_long_name
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
```
Tables should be created automatically. But you need to setup the database manually.

I left the token and port because they're usually the same, but feel free to change them if needed.

The starting location of the app is in `server/src/index.ts` where we setup middlewares, routes and connect to the database.

All routes are in `server/src/routes`, mostly all of them just point to the controllers, except the `notes` route which has an auth middleware.
Models for the `User` and `Notes` are defined in `server/src/models` folder

I only use `controllers` and `services`, and don't use a `repository` because `sequelizer` simplifies queries enough in my opinion.

If there is any issue with running the app feel free to message/call me. 
Didn't have time for tests.
I wish I added an object mapper middleware but was afraid it was gonna cause issues and slow me down.
