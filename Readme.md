## Project configuration

### 1. Install all dependencies of the project:

```bash
  cd measure-service
  npm install
```

### 2. Set up environment variables:

1.  Create a `.env` file in the root of the project, following the example in [default.env](default.env).

### 3. Run Docker Compose:

Docker Compose will take care of image creation and container initialization for you.

Build and start the containers:

```bash
  docker-compose up --build
```
