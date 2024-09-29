# CinemaCalc

This project is a React application for managing and calculating expenses related to movies. It utilizes Vite for fast development and provides a smooth user experience with Hot Module Replacement (HMR).

## Table of Contents

1. [Running the Project Locally](#running-the-project-locally)
2. [Project Structure](#project-structure)
3. [State Management](#state-management)
4. [Precision in Number Calculations](#precision-in-number-calculations)
5. [Task Breakdown](#task-breakdown)

## Running the Project Locally

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shahzaibimran7/CinemaCalc.git
   cd CinemaCalc
   ```
2. **Install dependencies**:
   npm install
3. **Start the Development Server**
   npm run dev

## Project Structure

The overall structure of the code is as follows:
/CinemaCalc
|-- /public # Static assets
|-- /src # Source code
| |-- /Components # Reusable components
| |-- /Services # API services for data management
| |-- App.jsx # Main application component
| |-- main.jsx # Entry point for the React application
|-- index.html # Main HTML file
|-- package.json # Project metadata and dependencies

## State Management

State in this application is managed using the built-in useState and useEffect hooks from React. This solution was chosen for its simplicity and efficiency for a project of this scale. Using hooks allows for straightforward management of component-level state, which is ideal for the dynamic data updates needed for expense calculations.

## Precision in Number Calculations

To ensure precise number calculations, especially when dealing with currency, the application uses the following approaches:

Fixed Decimal Places: Calculations are rounded to two decimal places using toFixed(2) to maintain standard currency formatting.
Number Conversion: Values from input fields are converted to numbers using Number() to prevent issues with string manipulation and arithmetic operations.
This approach ensures that calculations are accurate and consistent, avoiding floating-point precision errors that can occur with JavaScript.

## Task Breakdown

Throughout the development of this project, the following tasks were identified and broken down into deliverables:

1. **Setup and Configuration**:
   Set up the project with Vite and React.
   Configure ESLint for code quality.

2. **UI Components**:
   Develop reusable components such as AddEntryModal for adding expenses and an editable list for displaying expenses.

3. **State Management**:

Implement state management for entries and total calculations using React hooks.

4. **API Integration**:

Create API service functions to handle data fetching, adding, editing, and deleting entries.

By breaking down the project into smaller tasks, development remained organized and focused, making it easier to track progress and manage deliverables.

### How to Use

1. **Copy the code snippets** into the respective files in your React project.
2. **Make sure to update the API URL** in `CinemaCalcAPIServices.js` to point to your actual API.
3. **Run the project** following the instructions in the `README.md`.
