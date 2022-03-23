# Contributing to Data Validation Tools

First off, thanks for taking the time to contribute!

The following is a set of guidelines for contributing to this project. These are mostly guidelines, not rules. Use your best judgment and feel free to propose changes to this document in a pull request.

## How Can I Contribute?

When writing any code for this package, please follow the [node style guide](https://github.com/felixge/node-style-guide).

### Branch Off Main

Please create a new branch to put your changes on and use the branch name styling of

`{first_initial}+{last_initial} / {feature}`

so if your name is John Doe and your adding a new test case for aliens, you should create a new branch called

`jd/alienTest`

### Use Helpful Commit Messages

Commit messages should be verb based, using the following pattern:

-   `Fix ...`
-   `Add ...`
-   `Update ...`
-   `Remove ...`

### Testing

Please update the test file to reflect your code changes any time you make changes to the code base. We reserve the right to deny pull requests if unit test are failing locally.

### Documentation

Please update the [README](README.md) with any relevant changes so that they can be understood by other users.

### Developing

-   `yarn test` run the jest tests
-   `yarn build` run the formatter and bundle the source files

### Create a Pull Request Back to Main

Don't just merge your changes into main, please create a pull request with a detailed explanation of your changes, why you made them, how to test them, and what the expected outcome is. This will expedite the process of reviewing your edits/additions and including them in the project.

Thanks!
