## Project configuration

### 1. Install all dependencies of the project:

```bash
  cd measure-service
  npm install
```

### 2. Set up environment variables:

1.  Create a `.env` file in the root of the project, following the example in [default.env](./default.env).

### 3. Run Docker Compose:

Docker Compose will take care of image creation and container initialization for you.

Build and start the containers:

```bash
  docker-compose up --build
```

## Test setup

- Unit Test

  With your project configured, there are two ways to run the unit tests:

  1. Using npm directly:

     ```shell
     # Navigate to the project folder
     cd <rootfolder>/<measure-service>
     # Run the test command
     npm run test
     ```

  2. Using Docker
     ```shell
      # After starting the application containers
      # Run the test command with Docker
      docker-compose exec app npm run test
     ```
