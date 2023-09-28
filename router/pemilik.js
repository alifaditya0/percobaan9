const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');


router.get('/:id', function (req, res) {
    let id = req.params.id;


    connection.query(`SELECT * FROM pemilik where id_pemilik = ${id}`, 
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
                    message: 'pemilik :',
                    data: rows,
                });
            }
        }
    );
});

router.get('/', function (req, res) {
    connection.query('SELECT * FROM pemilik order by id_pemilik desc', function (err, rows) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                status: false,
                message: 'Server Failed',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data Pemilik',
                data: rows,
            });
        }
    });
});

router.post('/store', [
    body('nama_pemilik').notEmpty(),
    body('alamat').notEmpty(),
    body('no_hp').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array(),
        });
    }
    let data = {
        nama_pemilik: req.body.nama_pemilik,
        alamat: req.body.alamat,
        no_hp: req.body.no_hp,
        
    };
    connection.query('INSERT INTO pemilik SET ?', data, function (err, result) {
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
                message: 'Pemilik Telah dibuat.',
                data: data,
            });
        }
    });
});

router.patch('/update/:id', [
    body('nama_pemilik').notEmpty(),
    body('alamat').notEmpty(),
    body('no_hp').notEmpty(),
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        nama_pemilik: req.body.nama_pemilik,
        alamat: req.body.alamat,
        no_hp: req.body.no_hp,
    }
    connection.query(`update pemilik set ? where id_pemilik = ${id}`, Data, function (err, rows){
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
    connection.query('DELETE FROM dpi WHERE id_dpi = ?', [id], function (err, result) {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                status: false,
                message: 'Server Error',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'DPI Terhapus',
            });
        }
    });
});

module.exports = router;
