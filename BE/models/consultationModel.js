const db = require('../config/dbConfig');

exports.insert = async (data) => {
    const query = `INSERT INTO consultations 
        (possible_start_date, possible_end_date, desired_date, address, area, apartment_name, apartment_type, project_details, project_area, estimated_budget)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await db.query(query, [
        data.possible_start_date, data.possible_end_date, data.desired_date, data.address, data.area,
        data.apartment_name, data.apartment_type, data.project_details, data.project_area, data.estimated_budget,
    ]);
};

// 모든 문의 데이터 가져오기
exports.findAll = async () => {
    const [rows] = await db.query('SELECT * FROM consultations');
    return rows; // 첫 번째 배열만 반환
};

exports.findById = async (id) => {
    const [rows] = await db.query('SELECT * FROM consultations WHERE id = ?', [id]);
    return rows[0]; // 첫 번째 배열에서 첫 번째 객체 반환
};