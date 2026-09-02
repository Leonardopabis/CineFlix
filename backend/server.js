import express from 'express'
import cors from 'cors'

import { getHeroFilms, getNowPlaying, getPopularMovies, getTopRated, getUpcoming, searchMovies  } from './api.js'
import db from './db/db.js'

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

app.get('/api/movies/search', async (req, res) => {
    try {
        const {query, page} = req.query
        if (!query) {
            return res.status(400).json({
                message: 'informe o termo de busca'
            })
        }
        const results = await searchMovies(query, page)
        res.json(results)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Erro ao realizar busca'
        })
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})

//database
app.get('/api/favorites', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM favorites ORDER BY added_at DESC')
        res.json(rows)
    } catch (error){
        console.log(error)
        res.status(500).json({message: 'Erro ao buscar favoritos'})
    }
})

app.get('/api/favorites/ids', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT movie_id, media_type FROM favorites')
        res.json(rows)
    } catch (error){
        console.log(error)
        res.status(500).json({message: 'Erro ao buscar favoritos'})
    }
})

app.post('/api/favorites', async (req, res) => {
    try {
        const {movie_id, media_type, title, poster_path, vote_average} = req.body
        if (!movie_id || !title) {
            return res.status(400).json({message: 'Dados incompletos'})
        }

        await db.query('INSERT IGNORE INTO favorites (movie_id, media_type, title, poster_path, vote_average) VALUES (?, ?, ?, ?, ?)', [movie_id, media_type || 'movie', title, poster_path, vote_average])

        res.status(201).json({message: 'favoritado'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Erro ao favoritar'})
    }
})

app.delete('/api/favorites/:movie_id/:media_type', async (req, res) => {
    try {
        const {movie_id, media_type} = req.params

        await db.query('DELETE FROM favorites WHERE movie_id = ? AND media_type = ?', [movie_id, media_type])

        res.json({message: 'Removido dos favoritos'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Erro ao remover dos favoritos'})
    }
})