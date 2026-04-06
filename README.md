# Testing

An Angular application built with TypeScript, Node.js, and CSS.

## Tech Stack

- **Angular**: Modern web framework for building scalable applications
- **TypeScript**: Strongly typed programming language for enhanced development experience
- **Node.js**: JavaScript runtime for the development environment
- **CSS**: Styling language for application design

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Development Server

Run the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### 3. Build

Build the project for production:

```bash
npm run build:prod
```

The build artifacts will be stored in the `dist/` directory.

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the project for development
- `npm run build:prod` - Build the project for production
- `npm test` - Execute unit tests via Karma
- `npm run lint` - Lint the project files
- `npm run format` - Format code using Prettier
- `npm run format:check` - Check code formatting

## Project Structure

```
testing/
├── src/
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.component.spec.ts
│   │   └── app.config.ts
│   ├── assets/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Testing

### Unit Tests

Run unit tests:

```bash
npm test
```

## Linting and Formatting

This project uses ESLint for linting and Prettier for code formatting.

### Lint Code

```bash
npm run lint
```

### Format Code

```bash
npm run format
```

### Check Formatting

```bash
npm run format:check
```

## Further Help

To get more help on the Angular CLI use `ng help` or check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## License

This project is licensed under the MIT License.
