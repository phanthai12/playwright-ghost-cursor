---
description: Build and validate the codebase before committing or finishing a task
---

To ensure code changes do not break the pre-commit hook, follow these steps before concluding any code modification task:

1. Execute the format and build script by running `npm run prepare` in the terminal.
   // turbo-all
2. Wait for the command to finish and check the output.
3. If the command fails, review the lint errors (e.g., from `ts-standard`) or build errors (from `tsc`), and fix the underlying issues in the code.
4. Run `npm run prepare` again until it exists with a successful 0 status code.
5. Only announce that the task is finished after the prepare script passes seamlessly.
