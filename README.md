# Project Name: Backend API Testing

This repository contains the backend API for managing user authentication, availability settings for professors, and appointment bookings. The testing suite is built using **Jest** and **Supertest** for API testing, with a Prisma-based database.

## Table of Contents
- [Description](#description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Contributing](#contributing)
- [License](#license)

## Description

This project implements routes for **user authentication**, **professor availability management**, and **appointment booking**. The testing suite ensures that these routes function correctly. The routes include:

- **Auth Routes**: Register and login users.
- **Availability Routes**: Professors can set their availability.
- **Appointment Routes**: Users can book and manage appointments with professors.

## Prerequisites

Ensure that the following tools are installed on your machine before setting up the project:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Prisma](https://www.prisma.io/) for database ORM
- [Supertest](https://github.com/visionmedia/supertest) for API testing
- [Jest](https://jestjs.io/) for testing framework

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. **Install dependencies:**

    If you're using npm:

    ```bash
    npm install
    ```

    Or with Yarn:

    ```bash
    yarn install
    ```

3. **Set up the database:**

    If you haven't already set up Prisma with your database, follow the instructions in the [Prisma docs](https://www.prisma.io/docs/getting-started).

    Then, run the Prisma migrations to create the necessary tables:

    ```bash
    npx prisma migrate dev
    ```

## Running Tests

To run the tests, use the following command:

```bash
npm test
```

This will trigger Jest to run the tests and use Supertest to simulate HTTP requests to your backend.

### Test Coverage
The test suite covers the following routes:

- **Auth Routes**:
    - Register a new user
    - Login an existing user

- **Availability Routes**:
    - Set professor availability
    - Retrieve professor availability

- **Appointment Routes**:
    - Book an appointment
    - Retrieve appointments for a user
    - Cancel an appointment

## Test Structure

The tests are located in the `__tests__` directory.

### Example Test for Auth Routes

```javascript
it('should register a new user', async () => {
  const response = await request(app)
    .post('/auth/register')
    .send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'STUDENT',
    });

  expect(response.status).toBe(201);
  expect(response.body.message).toBe('User registered successfully');
});
```

### Example Test for Availability Routes

```javascript
it('should set availability for professor', async () => {
  const response = await request(app)
    .post('/availability/set')
    .set('Authorization', `Bearer ${token}`)
    .send({
      startTime: '2024-11-25T09:00:00Z',
      endTime: '2024-11-25T12:00:00Z',
    });

  expect(response.status).toBe(201);
  expect(response.body.message).toBe('Availability set successfully');
});
```

### Example Test for Appointment Routes

```javascript
it('should book an appointment', async () => {
  const response = await request(app)
    .post('/appointments/book')
    .set('Authorization', `Bearer ${token}`)
    .send({
      professorId: 1, // Replace with an actual professor ID
      startTime: '2024-11-25T09:00:00Z',
      endTime: '2024-11-25T10:00:00Z',
    });

  expect(response.status).toBe(201);
  expect(response.body.message).toBe('Appointment booked successfully');
});
```

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit pull requests. Ensure that all new code is properly tested and follows the style guidelines used in the project.

1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Create a new pull request
