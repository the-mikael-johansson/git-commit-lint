const colors = require('./colors');
const { getFirstLine, hasCorrectType, hasNoDotsIntheEnd, isLeadingLowerCase, firstVerbIsInTheImperativeMood, firstVerbIsInLowerCase } = require('./validationRules');

const executeCallback = (error, stdout, stderr) => {
    if (error) {
        console.error(`Error occurred while executing Git command: ${error.message}`);
        process.exit(1);
    }

    if (stderr) {
        console.error(`Git command execution error: ${stderr}`);
        process.exit(1);
    }

    const lastCommitMessage = stdout.trim();

    const firstLine = getFirstLine(lastCommitMessage);

    console.log(`Evaluating commit "${lastCommitMessage}"`);

    let errors = [];
    if (!hasCorrectType(firstLine)) {
        errors = [...errors, ' - Has inforrect type (prefix).'];
    }

    if (!hasNoDotsIntheEnd(firstLine)) {
        errors = [...errors, ' - Ends with a dot.'];
    }

    if (!isLeadingLowerCase(firstLine)) {
        errors = [...errors, ' - The first letter of the commit message should be lowercase.'];
    }

    if (!firstVerbIsInTheImperativeMood(firstLine)) {
        errors = [...errors, ' - The first verb of the commit message should be in the imperative mood.'];
    }

    if (!firstVerbIsInLowerCase(firstLine)) {
        errors = [...errors, ' - The first verb of the commit message should be in lower case.'];
    }

    if (errors.length > 0) {
        console.error(colors.red + '[FAILED]' + colors.reset +' The last commit message does not follow the Conventional Commits style.');
        console.error(errors.join('\n'));
        process.exit(1);
    }

    console.log(colors.green + '[OK]' + colors.reset +' The last commit message follows the Conventional Commits style.');
};
exports.executeCallback = executeCallback;