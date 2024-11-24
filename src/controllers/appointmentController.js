const prisma = require('../models/prismaClient');

// Book an Appointment
const bookAppointment = async (req, res) => {
  try {
    const { professorId, startTime, endTime } = req.body;
    const studentId = req.user.id;

    // Validate that professor is available during the specified time range
    const availability = await prisma.availability.findFirst({
      where: {
        professorId,
        startTime: { lte: new Date(startTime) }, // Availability starts before or at the requested start time
        endTime: { gte: new Date(endTime) },   // Availability ends after or at the requested end time
      },
    });

    if (!availability) {
      return res.status(400).json({ message: 'No available slot for the professor during the specified time range.' });
    }

    // Create the appointment
    const appointment = await prisma.appointment.create({
      data: {
        professorId,
        studentId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });

    // Remove the professor's availability
    await prisma.availability.delete({
      where: { id: availability.id },
    });

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ error: 'Error booking appointment', details: error });
  }
};

// Cancel an Appointment
const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the appointment exists
    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }

    // Delete the appointment
    await prisma.appointment.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ error: 'Error cancelling appointment', details: error });
  }
};

// Get Appointments
const getAppointments = async (req, res) => {
  try {
    const userId = req.user.id;

    const appointments = await prisma.appointment.findMany({
      where: {
        OR: [{ studentId: userId }, { professorId: userId }],
      },
      include: {
        student: { select: { id: true, name: true, email: true } },
        professor: { select: { id: true, name: true, email: true } },
      },
    });

    if (!appointments.length) {
      return res.status(404).json({ message: 'No appointments found.' });
    }

    res.json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Error fetching appointments', details: error });
  }
};

module.exports = { bookAppointment, cancelAppointment, getAppointments };
