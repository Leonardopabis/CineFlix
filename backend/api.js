const TMBD_URL = 'https://api.themoviedb.org/3'

export async function getPopularMovies(pageNumber) {
    const response = await fetch(
        `${TMBD_URL}/movie/popular?language=pt-BR&page=${pageNumber}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
                accept:'application/json'
            }
        }
    )

    if (!response.ok) {
        console.log('Status TMDB: ', response.status)
        console.log('Resposta TMDB: ', await response.text())
        throw new Error('Erro ao buscar filmes na tbmd')
    }

    return response.json()
}