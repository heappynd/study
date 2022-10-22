const { Command } = require('commander')

const program = new Command()

program
  .option('-t,--test', 'a test option')
  .option('--source-map', 'generate source maps')
  .option('--no-foo', 'not generate source maps')
  .option('-p,--port <char>', 'export a port', '8080')
  .option('-c, --cheese [type]', 'Add cheese with optional type')
  // .requiredOption()
  .version('1.0.0')
  // .version('1.0.0', '-v, --vers', 'output the current version')
  .command('clone <source> [destination]')
  .description('clone a repository into a newly created directory')
  .action((source, destination) => {
    console.log('clone command called')
  })

// console.log(process.argv)
program.parse()
// serve -p 80
// serve -p80
// serve --port 80
console.log(program.opts())
console.log(program.optsWithGlobals())
console.log(program.getOptionValue('port'))
console.log(program.getOptionValueSource('port'))
