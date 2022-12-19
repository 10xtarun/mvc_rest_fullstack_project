
const shutDownHandler = (server) => {
  if (server) {
    console.info('initiating graceful server shutdown')
    server.close(() => {
      console.log('server closed')
      if (global.app && global.app.db) {
        global.app.db.connection.close(false, () => console.info('database connection closed'))
      }
      process.exit(0)
    })
    return
  }
  console.warn('initiating hard server shutdown')
  process.exit(1)
}

const gracefulShutdown = (server) => {
  process.on('SIGINT', () => {
    console.error('SIGINT signal recieved')
    shutDownHandler(server)
  })
  process.on('SIGTERM', () => {
    console.error('SIGTERM signal recieved')
    shutDownHandler(server)
  })
}

module.exports = {
  shutDownHandler,
  gracefulShutdown
}
