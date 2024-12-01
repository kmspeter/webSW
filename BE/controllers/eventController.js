const eventService = require('../services/eventService');

exports.createEvent = async (req, res) => {
    try {
        await eventService.create(req.body);
        res.status(201).json({ message: 'Event created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create event' });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await eventService.fetchAll();
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch events' });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await eventService.fetchById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch event', error: error.message });
    }
};