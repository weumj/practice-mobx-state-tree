#!/usr/bin/env node

/**
 * Git COMMIT-MSG hook for validating commit message
 *
 * https://github.com/angular/angular.js/blob/v1.5.9/validate-commit-msg.js

 */

const { promisify } = require("util");
const fs = require("fs");
const [readFile, appendFile, exec] = [
	fs.readFile,
	fs.appendFile,
	require("child_process").exec,
].map(promisify);

const chalk = require("chalk");

// ignore merge/wip commit message
const IGNORED = /(^((WIP|Merge) .*))|(^Init project$)/;
// PATTERN: type(scope)?: some-message
const PATTERN = /^(\w*)(\(.+\))?: (.*)$/;
const IGNORE_BRANCH = [/^release\//];
const MAX_LENGTH = 120;
const TYPES = ["feat", "fix", "docs", "style", "refactor", "test", "chore", "env", "publish"];

const validateMessage = async message => {
	if (IGNORED.test(message)) {
		console.log(chalk.green(`Commit message validation ignored. [${message}]`));
		return true;
	}

	if (message.length > MAX_LENGTH) {
		console.error(
			chalk.redBright(
				`[INVALID Commit Message] message is longer than ${MAX_LENGTH} characters !`,
			),
		);
		return false;
	}

	const IO_currentBranch = await exec("git rev-parse --abbrev-ref HEAD");

	if (IO_currentBranch.stderr) {
		console.warn(chalk.yellow(`unexpected error on reading branch name`));
		return true;
	}

	const currentBranch = IO_currentBranch.stdout.trim();

	if (IGNORE_BRANCH.some(reg => reg.test(currentBranch))) {
		console.log(chalk.green(`Do not validate commit message in a branch[${currentBranch}]`));
		return true;
	}

	const match = PATTERN.exec(message);

	if (!match) {
		console.error(chalk.red('Does not match "type(scope)?: message".'));
		console.error(chalk.red(`given was : "${message}"`));
		return false;
	}

	const type = match[1];

	if (!TYPES.includes(type)) {
		console.error(chalk.red(`[${type}] is not allowed type !`));
		return false;
	}
	return true;
};

const commitMsgFile = ".git/COMMIT_EDITMSG";
const incorrectLogFile = commitMsgFile.replace("COMMIT_EDITMSG", "logs/incorrect-commit-msgs");

async () => {
	const buffer = await readFile(commitMsgFile);

	const firstLine = buffer
		.toString()
		.split("\n")
		.shift();

	if (!(await validateMessage(firstLine))) {
		try {
			await appendFile(incorrectLogFile, firstLine + "\n");
		} catch (e) {
			process.exit(1);
		}
	} else {
		process.exit(0);
	}
};
