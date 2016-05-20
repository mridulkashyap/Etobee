var connectionString = process.env.OPENSHIFT_POSTGRE_DB_URL || 'postgres://postgres:postgre@localhost:5432/todo';  //postgres://YOURUSER:YOURPASSWORD@localhost/dev
//var connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgre@localhost:5432/todo';  //postgres://YOURUSER:YOURPASSWORD@localhost/dev

module.exports = connectionString;