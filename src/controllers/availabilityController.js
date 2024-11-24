const prisma = require('../models/prismaClient');

const setAvailability = async (req, res) => {
  try {
    const { startTime, endTime } = req.body;
    const professorId = req.user.id;

    const availability = await prisma.availability.create({
      data: { professorId, startTime: new Date(startTime), endTime: new Date(endTime) },
    });

    res.status(201).json({ message: 'Availability set successfully', availability });
  } catch (error) {
    res.status(500).json({ error: 'Error setting availability', details: error });
  }
};

const getAvailability = async (req, res) => {
  try {
    const { professorId } = req.params;

    const availability = await prisma.availability.findMany({
      where: { professorId: parseInt(professorId) },
    });

    res.json({ availability });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error fetching availability', details: error });
  }
};

module.exports = { setAvailability, getAvailability };
