const express = require('express');
const consultationController = require('../controllers/consultationController');

const router = express.Router();

router.post('/', consultationController.createConsultation);

// 관리자: 모든 문의 내역 확인
router.get('/', consultationController.getAllConsultations);

router.get('/:id', consultationController.getConsultationById);

// 사용자: 본인 문의 확인
router.post('/authenticate', consultationController.authenticateConsultation);

module.exports = router;
