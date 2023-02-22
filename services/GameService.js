


const GameService = () => {
    const _apiKey = '?key=ecde0efd01614fc68d0ef9efb4520852';
    const _api = 'https://api.rawg.io/api/games';
    const _page = 1
    
    const getMoreGames = async (page = _page, order = '', platform= '' ) => {

        const res = await fetch(`${_api}${_apiKey}&dates=2007-01-01,2023-12-31&page_size=16&page=
            ${page}${order}${platform}`)
        const response = await res.json()
        return _transformGames(response)

    }

    const getSingleGame = async (id) => {
        const game = await fetch(`${_api}/${id}${_apiKey}`)
        const image = await fetch(`${_api}/${id}/screenshots${_apiKey}`)
        
        const responseGame = await game.json()
        const responseImages = await image.json()

        return {responseGame, responseImages}
            
    }
    
    const findByName = async(name) => {
        const res = await fetch(`${_api}${_apiKey}&dates=2007-01-01,2023-12-31&page_size=5&page=1&search=${name}`)
        const response = await res.json()
        return response
    }

    const getStartData = async () => {
        const res = await fetch(`${_api}${_apiKey}&page_size=16&page=1&ordering=-metacritic&metacritic=1,100`)
        const response = await res.json()
        return response
    }

    function _transformGames (res){

        const {results} = res;
        return results
        
    }

    return {getMoreGames, getStartData, getSingleGame, findByName}
}


export default GameService

