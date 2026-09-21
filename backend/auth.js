import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import db from './db/db.js'

const SALT_ROUNDS = 10

export async function registerUser(name, email, password) {
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email])

    if (existing.length > 0) {
        throw new Error('E-mail já cadastrado')
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

    const [result] = await db.query(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
        [name, email, passwordHash]
    )

    return { id: result.insertId, name, email }
}

export async function loginUser(email, password) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])

    if (rows.length === 0) {
        throw new Error('E-mail ou senha inválidos')
    }

    const user = rows[0]
    const passwordMatches = await bcrypt.compare(password, user.password_hash)

    if (!passwordMatches) {
        throw new Error('E-mail ou senha inválidos')
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    return { token, user: { id: user.id, name: user.name, email: user.email } }
}

export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido ou expirado' })
    }
}