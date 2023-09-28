const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');


router.get('/:id', function (req, res) {
    let id = req.params.id;


    connection.query(`SELECT * FROM alat_tangkap where id_alat_tangkap = ${id}`, 
        function (err, rows) {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    status: false,
                    message: 'Server Error',
                    error: err
                });
            }
            if (rows.length <= 0) {
                return res.status(404).json({
                    status: false,
                    message: 'Not Found',
                
                });
            } else {
                return res.status(200).json({
                    status: true,
                    message: 'data alat :',
                    data: rows,
                });
            }
        }
    );
});

router.get('/', function (req, res) {
    connection.query('SELECT * FROM alat_tangkap order by id_alat_tangkap desc', function (err, rows) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Kapal',
                data: rows,
            });
        }
    });
});

router.post('/store', [
    body('nama_alat_tangkap').notEmpty(),
   
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }
    let data = {
        nama_alat_tangkap: req.body.nama_alat_tangkap,
        
    };
    connection.query('INSERT INTO alat_tangkap SET ?', data, function (err, result) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                status: false,
                message: 'Server Error',
                error: err
            });
        } else {
            return res.status(201).json({
                status: true,
                message: 'Alat Telah dibuat.',
                data: data,
            });
        }
    });
});

router.patch('/update/:id', [
    body('nama_alat_tangkap').notEmpty(),
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        nama_alat_tangkap: req.body.nama_alat_tangkap,
      
    }
    connection.query(`update alat_tangkap set ? where id_alat_tangkap = ${id}`, Data, function (err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Update Success..!'
            })
        }
    })
})

router.delete('/delete/:id', function (req, res) {
    let id = req.params.id;
    connection.query('DELETE FROM alat_tangkap WHERE id_alat_tangkap = ?', [id], function (err, result) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Alat Terhapus',
            });
        }
    });
});

module.exports = router;
