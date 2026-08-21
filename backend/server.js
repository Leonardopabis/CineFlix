import express from 'express'
import cors from 'cors'

import { getHeroFilms, getNowPlaying, getPopularMovies, getTopRated, getUpcoming  } from './api.js'

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

app.get('/api/movies/top_rated', async (req, res) => {
    try {
        const pageNumber = req.query.page || 1
        const movies = await getTopRated(pageNumber);

        res.json(movies)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'erro ao buscar filmes'
        })
    }
})

app.get('/api/movies/now_playing', async (req, res) => {
    try {
        const pageNumber = req.query.page || 1
        const movies = await getNowPlaying(pageNumber);

        res.json(movies)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'erro ao buscar filmes'
        })
    }
})

app.get('/api/movies/upcoming', async (req, res) => {
    try {
        const pageNumber = req.query.page || 1
        const movies = await getUpcoming(pageNumber);

        res.json(movies)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'erro ao buscar filmes'
        })
    }
})

app.get('/api/movies/heroFilms', async (req, res) => {
    try {
        const movies = await getHeroFilms();

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