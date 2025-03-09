# Hooks Documentation

## Overview

Hooks are custom functions that allow you to reuse stateful logic across multiple components in our React application. They help in abstracting complex logic and improving code reusability while keeping components clean.

## When to Use

- Use hooks when you find yourself needing to share logic (such as data fetching, form handling, etc.) across different components.
- Create custom hooks to encapsulate and reuse common functionality.

## Best Practices

- Name custom hooks with a 'use' prefix (e.g., useFetch, useAuth).
- Avoid calling hooks conditionally to maintain the rules of hooks.
- Use absolute paths when importing hooks to ensure consistency.
- Keep hooks focused on a single responsibility.

## Guidance

When developing new features, assess if any repetitive logic can be extracted into a custom hook. Write small, reusable hooks that encapsulate your logic, and always import them using absolute paths for maintainability.
