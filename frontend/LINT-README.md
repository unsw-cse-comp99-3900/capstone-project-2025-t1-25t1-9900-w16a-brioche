# Frontend Code Standards Check

This project uses ESLint and Prettier to ensure code quality and consistency. Additionally, we leverage GitHub Actions to automatically enforce these standards in our CI/CD pipeline.

## Local Commands

You can use the following commands to check and fix your code:

```bash
# Check ESLint rules
pnpm lint

# Automatically fix ESLint issues
pnpm lint:fix

# Check Prettier formatting
pnpm format:check

# Automatically format code with Prettier
pnpm format
```

## CI/CD Checks

We use GitHub Actions to automatically run code quality checks in our CI/CD process. Every push to the `main` branch or pull request triggers ESLint and Prettier checks.

The GitHub Actions workflow configuration file is located at `.github/workflows/frontend-lint.yml`.

## Code Standards

### ESLint

This project uses ESLint to enforce code quality for JavaScript/TypeScript. The ESLint configuration file is located at `frontend/eslint.config.js`.

### Prettier

This project uses the default Prettier configuration to format the code.
