import inquirer from 'inquirer'

inquirer
  .prompt([
    // {
    //   type: 'confirm',
    //   name: 'choice',
    //   message: 'your choice',
    //   default: false,
    // },
    // {
    //   // type: 'list',
    //   type: 'rawlist',
    //   name: 'choice',
    //   message: 'your choice',
    //   default: 0, //! default 是 index
    //   choices: [
    //     { value: 1, name: 'a' },
    //     { value: 2, name: 'b' },
    //     { value: 5, name: 'c' },
    //   ],
    // },
    // {
    //   type: 'expand',
    //   name: 'choice',
    //   message: 'your choice',
    //   default: 'red',
    //   choices: [
    //     { key: 'R', value: 'red' },
    //     { key: 'G', value: 'green' },
    //     { key: 'B', value: 'blue' },
    //   ],
    // },
    {
      type: 'checkbox',
      name: 'choice',
      message: 'your choice',
      choices: [
        { value: 1, name: 'a' },
        { value: 2, name: 'b' },
        { value: 5, name: 'c' },
      ],
    },
    {
      type: 'password',
      name: 'passwd',
      message: 'your passwd',
    },
    {
      type: 'editor',
      name: 'code',
      message: 'your code',
    },
  ])
  .then((answers) => {
    console.log('answers', answers)
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  })
