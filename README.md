# Achieve_Atlas

Achieve_Atlas is a Steam achievement tracker application built with Electron, Vite, and React. It allows users to view their owned games and track their achievement progress. The primary purpose of this project was to learn and experiment with the Steam Web API.

## Technologies Used

- **Electron**: A framework for creating native applications with web technologies like JavaScript, HTML, and CSS.
- **Vite**: A fast build tool that provides a quicker and leaner development experience for modern web projects.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **React Router**: A declarative routing library for React.

## Features

- Fetches and displays a user's owned games from the Steam API.
- Caches the list of owned games for 24 hours to improve performance.
- Fetches and displays achievement data for each game.
- Allows users to pin achievements to a dashboard for easy tracking.
- Secure communication between the main and renderer processes using `contextIsolation`.

## Project Structure

The project is organized into the following main directories:

- **`electron/`**: Contains the Electron main process and preload scripts.
  - **`main/`**: The main process of the Electron application.
    - **`index.ts`**: The entry point of the main process.
    - **`api/`**: Handles Steam API requests and user data management.
  - **`preload/`**: The preload script for the `BrowserWindow`.
- **`src/`**: Contains the React renderer process code.
  - **`renderer/`**: The main renderer process.
    - **`pages/`**: The different pages of the application.
    - **`components/`**: The reusable components.
    - **`api/`**: Handles communication with the main process.
- **`public/`**: Contains the static assets of the application.

## How to Use

### Prerequisites

- Node.js and npm installed on your system.
- A Steam API key and your Steam ID.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/Achieve_Atlas.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Achieve_Atlas
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root of the project and add your Steam API key and Steam ID:
   ```
   STEAM_KEY=your_steam_api_key
   STEAM_ID=your_steam_id
   ```

### Running the Application

To run the application in development mode, use the following command:

```bash
npm run dev
```

To build the application for production, use the following command:

```bash
npm run build
```

This will create a distributable file in the `dist` directory.
