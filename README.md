# Adonis.js TypeScript Project with SQLite

This is a CRUD project for Adonis.js using TypeScript and SQLite. It includes instructions for running the project locally and with Docker Compose.

## Prerequisites

Make sure you have the following installed:

- Node.js and npm
- Adonis CLI
- Docker and Docker Compose (optional, for running with Docker)

## Local Setup

1. Clone the repository:

    ```bash
    [git clone https://github.com/your-username/your-adonis-ts-sqlite-project.git](https://github.com/mahmoudamrr/apricot-task.git)
    ```

2. Change into the project directory:

    ```bash
    cd church-plan-task-backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up the database:

    ```bash
    node ace migration:run
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

6. Open your browser and visit [http://localhost:3333](http://localhost:3333) to see the app.

## Docker Setup

If you prefer running the project with Docker, follow these steps:

1. Clone the backend repository:

    ```bash
    git clone https://github.com/mahmoudamrr/church-plan-task-backend.git
    ```

2. Clone the admin repository:

    ```bash
    git clone https://github.com/mahmoudamrr/church-plan-task-admin.git
    ```

2. Change into the project directory:

    ```bash
    cd church-plan-task-backend
    ```

3. Build the Docker image:

    ```bash
    docker-compose up --build
    ```
    
4. Set up the database migration:

    ```bash
    docker-compose exec adonis-app node ace migration:run
    ```

5. Open your browser and visit [http://localhost:4200](http://localhost:4200) to see the app.
