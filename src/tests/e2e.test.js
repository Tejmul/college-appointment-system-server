const request = require('supertest');
const app = require('../app'); // Adjust if your app's entry point is different
const prisma = require('../models/prismaClient');

let token = '';

beforeAll(async () => {
    
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'John De',
        email: 'j.doe@example.com',
        password: 'passord123',
        role: 'STUDENT', 
      });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should login the user', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123',
      });
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
    token = response.body.token; // Save token for authenticated routes
  });
});

describe('Availability Routes', () => {
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

  it('should get availability for a professor', async () => {
    const response = await request(app)
      .get('/availability/1') // Replace with an actual professor ID
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body.availability).toBeDefined();
  });
});

describe('Appointment Routes', () => {
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

  it('should get appointments for the user', async () => {
    const response = await request(app)
      .get('/appointments/my')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body.appointments).toBeDefined();
  });

  it('should cancel an appointment', async () => {
    const appointmentId = 3; // Replace with an actual appointment ID
    const response = await request(app)
      .delete(`/appointments/cancel/${appointmentId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Appointment cancelled successfully');
  });
});
