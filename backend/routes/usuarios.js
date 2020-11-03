const { Router } = require('express');
const router = Router();
const mysqlconection = require('../db/db');
/* inicio de sesion */
router.get('/:usuario', (req, res) => {
    const { usuario } = req.params;
    mysqlconection.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario], (error, rows, fields) => {
        if (error) {
            console.error(error);
        } else {
            res.json(rows);
        }
    });
});
/* registrar usuario */
router.post('/', (req, res) => {
    const { nombre, apellido, genero, fecha_n, edad, usuario, contraseña, correo } = req.body;
    let usuarioA = [nombre, apellido, genero, fecha_n, edad, usuario, contraseña, correo];
    let queryUsuario = 'INSERT INTO usuarios(nombre, apellido, genero, fecha_n, edad, usuario, contraseña, correo) VALUES(?,?,?,?,?,?,?,?)';
    mysqlconection.query(queryUsuario, usuarioA, (err, results, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json({ message: 'Usuario fue registrado.' });
        }
    });
});
/* cerrar sesion */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    let querycerrarsesion = 'UPTADE usuarios SET estado=false WHERE id=?';
    mysqlconection.query(querycerrarsesion, [id], (err, results, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json({ message: 'se cerro sesion correctamente.' });
        }
    });
});
/* iniciar sesion */
router.put('/principal/:id', (req, res) => {
    const { id } = req.params;
    let queryiniciarsesion = 'UPTADE usuarios SET estado=true WHERE id=?';
    mysqlconection.query(queryiniciarsesion, [id], (err, results, fields) => {
        if (err) {
            console.error(err);
        } else {
            res.json({ message: 'se cerro sesion correctamente.' });
        }
    });
});
module.exports = router;