Project Name: Backend API Testing
This repository contains the backend API for managing user authentication, availability settings for professors, and appointment bookings. The testing suite is built using Jest and Supertest for API testing, with a Prisma-based database.

Table of Contents
Description
Prerequisites
Installation
Running Tests
Test Structure
Contributing
License
Description
This project implements routes for user authentication, professor availability management, and appointment booking. The testing suite ensures that these routes function correctly. The routes include:

Auth Routes: Register and login users.
Availability Routes: Professors can set their availability.
Appointment Routes: Users can book and manage appointments with professors.
Prerequisites
Ensure that the following tools are installed on your machine before setting up the project:

Node.js (version 14 or higher)
npm or Yarn
Prisma for database ORM
Supertest for API testing
Jest for testing framework
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
Install dependencies:

If you're using npm:

bash
Copy code
npm install
Or with Yarn:

bash
Copy code
yarn install
Set up the database:

If you haven't already set up Prisma with your database, follow the instructions in the Prisma docs.

Then, run the Prisma migrations to create the necessary tables:

bash
Copy code
npx prisma migrate dev
Running Tests
To run the tests, use the following command:

bash
Copy code
npm test
This will trigger Jest to run the tests and use Supertest to simulate HTTP requests to your backend.

Test Coverage
The test suite covers the following routes:

Auth Routes:

Register a new user
Login an existing user
Availability Routes:

Set professor availability
Retrieve professor availability
Appointment Routes:

Book an appointment
Retrieve appointments for a user
Cancel an appointment
Test Structure
The tests are located in the __tests__ directory.

Example Test for Auth Routes
javascript
Copy code
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
Example Test for Availability Routes
javascript
Copy code
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
Example Test for Appointment Routes
javascript
Copy code
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
Contributing
If you'd like to contribute to this project, feel free to fork the repository and submit pull requests. Ensure that all new code is properly tested and follows the style guidelines used in the project.

Fork the repo
Create a new branch (git checkout -b feature/your-feature)
Make your changes
Commit your changes (git commit -am 'Add new feature')
Push to the branch (git push origin feature/your-feature)
Create a new pull request
License
This project is licensed under the MIT License - see the LICENSE file for details.
