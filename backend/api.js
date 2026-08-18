const TMBD_URL = 'https://api.themoviedb.org/3'

export async function getPopularMovies() {
    const response = await fetch(
        `${TMBD_URL}/movie/popular?language=pt-BR&page=1`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMB_ACESS_TOKEN}`,
                accept:'application/json'
            }
        }
    )

    if (!response.ok) {
        throw new Error('Erro ao buscar filmes na tbmd')
    }

    return response.json()
}