# Containers Layer Documentation

## Overview

Containers serve as the smart layer in our architecture. They manage state, business logic and act as connectors between the data sources (like APIs or global state) and the UI components. They wrap Components to provide them with the necessary data and actions.

## When to Use

- Use Containers when you need to integrate data fetching, state management, or logic processing with your UI components.
- They should take care of all the business logic and keep the presentational Components as simple as possible.

## Best Practices

- Keep your containers lean and delegate presentation logic to Components wherever possible.
- Maintain clear separation of concerns by isolating stateful and logic-heavy code in Containers.

* Ensure each container encapsulates and manages all the business logic for its respective section, keeping the view layer clean.

## Guidance

When building features, start by assessing if the UI element is purely presentational. If not, encapsulate the necessary logic and data handling within a Container, and then pass the required props down to the Components.

- Note: All business logic and data processing should reside exclusively in the Container layer to ensure Pages remain purely for assembly.
