#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const dedent = require("dedent");

// cli-test --help   --->   ['--help']
const arg = hideBin(process.argv);
const cli = yargs(arg);
cli
  .usage("Usage: cli-test <command> [options]")
  .demandCommand(1, "最少输入的命令个数")
  .alias("h", "help")
  .alias("v", "version")
  // .wrap(100)
  .wrap(cli.terminalWidth())
  .epilogue(
    dedent`  结尾
加上一句话`
  )
  .options({
    debug: {
      type: "boolean",
      describe: "Bootstrap debug mode",
      alias: "d",
    },
  })
  .option("registry", {
    type: "string",
    // hidden: true,
    describe: "Define global registry",
    alias: "r",
  })
  .group(["debug"], "Dev Options:")
  .group(["registry"], "Extra Options:")
  .command(
    "init [name]",
    "Do init a project",
    (yargs) => {
      yargs.option("name", {
        type: "string",
        describe: "Name of a project",
        alias: "n",
      });
    },
    (argv) => {
      console.log("argv", argv);
    }
  )
  .command({
    command: "list",
    aliases: ["ls", "la", "ll"],
    describe: "List local packages",
    builder(yargs) {},
    handler(argv) {
      console.log("argv", argv);
    },
  })
  .recommendCommands()
  .fail((err, msg) => {
    console.log("err", err);
    console.log("msg", msg);
  })
  .strict().argv;

// cli-test init -d -r npm -n vue-test
