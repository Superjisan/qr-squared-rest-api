# Quarantine Recipe Repository

This repo is the backend node express server that runs Apollo Server to allow graphql queries on a postgresql db

## Installation

* `git clone https://github.com/Superjisan/qr-squared-rest-api.git`
* `cd qr-squared-rest-api`
* `touch .env`
* `npm install`
* fill out *.env file* (see below)
* start PostgreSQL database (if DB hosted on google cloud, open up proxy connection)
    * [reference](https://cloud.google.com/sql/docs/mysql/quickstart-proxy-test)
    * download cloud_sql_proxy: 
    `curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.amd64
    ` 
    * make it executable `chmod +x cloud_sql_proxy`

    * Run `./cloud_sql_proxy -instances=<INSTANCE_CONNECTION_NAME>=tcp:5432`

* `npm start`
* visit `http://localhost:8000` for GraphQL playground

#### .env file

After you have created a database and a database user, you can fill out the environment variables in the *server/.env* file.

```
#
DATABASE_URL=postgres://db_user:db_password@url:5432/qr-squared


SECRET=boomshakalaka
```

The `SECRET` is just a random string for your authentication. Keep all these information secure by adding the *.env* file to your *.gitignore* file. No third-party should have access to this information.


