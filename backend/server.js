import express from 'express'
import cors from 'cors'

import { getPopularMovies  } from './api.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/movies/popular', async (req, res) => {
    try {
        const pageNumber = req.query.page || 1
        const movies = await getPopularMovies(pageNumber);

        res.json(movies)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'erro ao buscar filmes'
        })
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})