# Challenge Summary

The challenge requires implementing and testing an input which makes a call to a backend. The main tasks are: understand the requirements, frontend development, backend development, tests, and documentation. I'll chunk up work into small PRs and I've completed the work across a sporadic 4 hours.

## Folder Structure

This repository consists of both frontend and backend components with a directory for end to end tests:

- `/sh24-client` - React application
- `/sh24-server` - API service
- `/e2e` - End to end tests
- `decisions.md` - Tracker of decisions and thinking
- `plan.md` - The plan for my time on this

## Getting up and running

I have used `pnpm` for quick package management across the stack, you will need this first. I have used version `10.9.0` for this project.

```bash
# Install pnpm if you don't have it
npm install -g pnpm@10.9.0
```

You can go into each directory to install the necessary dependencies:

```bash
# from the root
pnpm i
cd sh24-client && pnpm i
cd ../sh24-server && pnpm i
```

## Start commands

Start commands for the client and server can be found in their respective directories:

```bash
# from sh24-client/
pnpm run dev
```

```bash
# from sh24-server/
pnpm start
```

## Testing

Tests are split by stack and each directory has it's own test

### Client

For client unit tests

```bash
pnpm test
```

### Server

For all tests:

```bash
pnpm test
```

For unit tests:

```bash
pnpm test:unit
```

For integration tests:

```bash
pnpm test:integration
```

### End to end

End to end tests are run from the root directory:

```bash
pnpm test:e2e
```

Or with the Playwright UI:

```bash
pnpm test:e2e:ui
```
