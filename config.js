var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';  //postgres://YOURUSER:YOURPASSWORD@localhost/dev

module.exports = connectionString;