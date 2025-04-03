# Marvel Wikipedia Challenge

## Description

This project is an Angular application that displays a table with information about Marvel superheroes, using data provided in a JSON file. The interface is built with Angular Material.

## Implemented Features

- **Data visualization** in a table with sorting options.
- **Name filtering** using the Angular Material chips component.
- **Detail view** in a modal when clicking on a row.
- **Additional functionalities** such as creating, editing, and deleting heroes.
- **Graphs** to represent data metrics.
- **Unit tests with Jasmine.**

## Installation and Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   ng serve
   ```
   Then, access `http://localhost:4200/` in your browser.

## Project Structure

```bash
src/
├── app/
│   ├── core/
│   │   ├── models/         # Data models and interfaces
│   │   ├── services/       # Services for data handling
│   ├── features/
│   │   ├── heroes/
│   │   │   ├── components/  # Hero-related components
│   │   │   ├── pages/       # Hero-related pages
│   ├── shared/
│   │   ├── components/      # Reusabel components
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.routes.ts
├── assets/
```

## Testing

Unit tests can be executed with:

```bash
npm run test
```

## Technical Decisions

- **Angular Material** was used to facilitate design and accessibility.
- Data management is handled through an **Angular service**.
- The table uses `MatTableDataSource` for functionalities such as filtering and sorting.
- **Data persistence** using `indexedDB`.
- **Graph implementation** with `Chart.js`.

## Possible Improvements

- Integration with a real API instead of a JSON file.
- Implementation of table pagination.
- Implementation of more unit and integration tests.

