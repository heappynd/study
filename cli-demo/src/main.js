const commander = require('commander') // (normal include)
const program = new commander.Command()

program
  .name('connect')
  .argument('<server>', 'connect to the specified server')
  .argument('[user]', 'user account for connection', 'guest')
  .description('Example program with argument descriptions')
  .action((server, user) => {
    console.log('server:', server)
    console.log('user:', user)
  })

program.parse()
