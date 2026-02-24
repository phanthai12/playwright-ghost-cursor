# Antigravity Agent - Project Instructions

## General Principles

You are working on the `playwright-ghost-cursor` project. As an AI assistant, follow these strict guidelines to ensure codebase integrity.

### 1. Pre-commit Verification Requirement

Whenever you make modifications to the codebase (TypeScript files, tests, or documentation), you **MUST** ensure that your changes do not break the project's build and lint strictness.

### 2. Mandatory Execution of `npm run prepare`

Before telling the user a task is complete, you must run the command `npm run prepare` in the integrated terminal.
This command executes `husky && yarn lint && yarn build`. Because the `ts-standard` linter is very strict (e.g. no unused variables, strict boolean expressions), you must proactively run this and fix any errors.

### 3. Handling Failures

If `npm run prepare` fails due to linting warnings, formatting errors, or broken builds, do not consider your task done. Analyze the terminal output, fix the corresponding files, and rerun the command until it succeeds.

## Using Workflows

Always refer to the `/validate-code` workflow when finalizing code changes. You can run the workflow to have the steps automatically verified.
