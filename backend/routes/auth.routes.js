const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const Config = require('../config/config'); 

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        const existing = await Usuario.findOne({ where: { username } });
        if (existing) {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuario = await Usuario.create({
            username,
            password: hashedPassword
        });

        res.status(201).json({ message: 'Usuario registrado con éxito', id: nuevoUsuario.id });
    } catch (error) {
        console.error('Error en /register:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Usuario.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username },
            Config.secreteWord,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Error en /login:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;