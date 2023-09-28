const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');


router.get('/:id', function (req, res) {
    let id = req.params.id;


    connection.query('SELECT id_kapal, nama_kapal, pemilik.nama_pemilik, dpi.nama_dpi, alat_tangkap.nama_alat_tangkap FROM kapal JOIN pemilik  ON kapal.id_pemilik =  pemilik.id_pemilik  JOIN dpi ON kapal.id_dpi = dpi.id_dpi  JOIN alat_tangkap ON kapal.id_alat_tangkap  = alat_tangkap.id_alat_tangkap',
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
                    message: 'kapal :',
                    data: rows,
                });
            }
        }
    );
});

router.get('/', function (req, res) {
    connection.query('SELECT id_kapal, nama_kapal, pemilik.nama_pemilik, dpi.nama_dpi, alat_tangkap.nama_alat_tangkap FROM kapal JOIN pemilik  ON kapal.id_pemilik =  pemilik.id_pemilik  JOIN dpi ON kapal.id_dpi = dpi.id_dpi  JOIN alat_tangkap ON kapal.id_alat_tangkap  = alat_tangkap.id_alat_tangkap', function (err, rows) {
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
    body('nama_kapal').notEmpty(),
    body('id_pemilik').notEmpty(),
    body('id_dpi').notEmpty(),
    body('id_alat_tangkap').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }
    let data = {
        nama_kapal: req.body.nama_kapal,
        id_pemilik: req.body.id_pemilik,
        id_dpi: req.body.id_dpi,
        id_alat_tangkap: req.body.id_alat_tangkap,
    };
    connection.query('INSERT INTO kapal SET ?', data, function (err, result) {
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
                message: 'kapal Telah dibuat.',
                data: data,
            });
        }
    });
});

router.patch('/update/:id', [
    body('nama_kapal').notEmpty(),
    body('id_pemilik').notEmpty(),
    body('id_dpi').notEmpty(),
    body('id_alat_tangkap').notEmpty(),
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        nama_kapal: req.body.nama_kapal,
        id_pemilik: req.body.id_pemilik,
        id_dpi: req.body.id_dpi,
        id_alat_tangkap: req.body.id_alat_tangkap,
    }
    connection.query(`update kapal set ? where id_kapal = ${id}`, Data, function (err, rows){
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
    connection.query('DELETE FROM kapal WHERE id_kapal = ?', [id], function (err, result) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'kapal Terhapus',
            });
        }
    });
});

module.exports = router;
