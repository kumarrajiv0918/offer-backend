const XLSX = require('xlsx');
const pool = require('../../config/database/db');

const uploadVendorExcel = async (req, res) => {
    try {
        const workbook = XLSX.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const vendorData = jsonData.map(row => ([
            row['Business Name'],
            row['Business Representative'],
            row['Email'],
            row['Phone'],
            row['Address'],
            row['Message'],
            row['Submission ID'],
            new Date(row['Submission Create Date']),
        ]));

        const connection = await pool.getConnection();
        const insertQuery = `
            INSERT INTO VendorData 
            (businessName, businessRepresentative, email, phoneNo, address, message, submissionID, submissionCreateDate)
            VALUES ?`;

        await connection.query(insertQuery, [vendorData]);
        connection.release();

        res.status(200).json({ message: 'Vendor Excel data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload Vendor Excel' });
    }
};

const uploadCustomerExcel = async (req, res) => {
    try {
        const workbook = XLSX.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const connection = await pool.getConnection();

        for (const row of jsonData) {
            const {
                Name,
                Email,
                Categories,
                PhoneNo,
                Location,
                Message,
                SubmissionID,
                SubmissionCreateDate,
                SubmissionStatus,
            } = row;

            const insertQuery = `
                INSERT INTO CustomerData 
                (name, email, categories, phoneNo, location, message, submissionID, submissionCreateDate, submissionStatus)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            await connection.query(insertQuery, [
                Name,
                Email,
                Categories,
                PhoneNo,
                Location,
                Message,
                SubmissionID,
                new Date(SubmissionCreateDate),
                SubmissionStatus,
            ]);
        }

        connection.release();

        res.status(200).json({ message: 'Customer Excel data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload Customer Excel' });
    }
};

const getAllVendors = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM VendorData');
        connection.release();

        res.status(200).json({
            status: true,
            message: "Retrive data successfully!",
            data: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch vendor data' });
    }
};

const getAllCustomers = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM CustomerData');
        connection.release();

        res.status(200).json({
            status: true,
            message: "Retrive data successfully!",
            data: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch customer data' });
    }
};

module.exports = {
    uploadVendorExcel,
    uploadCustomerExcel,
    getAllVendors,
    getAllCustomers
};
