const consultationService = require('../services/consultationService');

exports.createConsultation = async (req, res) => {
    try {
        await consultationService.create(req.body);
        res.status(201).json({ message: 'Consultation created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create consultation' });
    }
};

// 관리자: 모든 문의 내역 확인
exports.getAllConsultations = async (req, res) => {
    try {
        const consultations = await consultationService.fetchAll();
        res.status(200).json(consultations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch consultations' });
    }
};

exports.getConsultationById = async (req, res) => {
    try {
        const { id } = req.params; // URL에서 ID 가져오기
        const consultation = await consultationService.fetchById(id);

        if (!consultation) {
            return res.status(404).json({ message: 'Consultation not found' });
        }

        res.status(200).json(consultation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch consultation details', error: error.message });
    }
};

// 일반 사용자: 본인 문의 확인
exports.authenticateConsultation = async (req, res) => {
    try {
        const { id, password } = req.body;
        const consultation = await consultationService.authenticate(id, password);
        if (!consultation) {
            return res.status(401).json({ message: 'Authentication failed: Invalid password' });
        }
        res.status(200).json(consultation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to authenticate consultation', error: error.message });
    }
};
