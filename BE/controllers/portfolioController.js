const portfolioService = require('../services/portfolioService');

exports.getPortfolios = async (req, res) => {
    try {
        const events = await portfolioService.fetchAll();
        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch events' });
    }
};

exports.getPortfolioById = async (req, res) => {
    try {
        const { id } = req.params;
        const portfolio = await portfolioService.fetchById(id);
        if (!portfolio) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(portfolio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch portfolio', error: error.message });
    }
};