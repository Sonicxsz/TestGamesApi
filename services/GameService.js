import useHttp from '../common/hooks/useHttp';


const GameService = () => {
    const _apiKey = 'key=ecde0efd01614fc68d0ef9efb4520852';
    const _api = 'https://api.rawg.io/api/games?';
    const _page = 1
    const  {request} = useHttp()
    const getAllGames = async (page = _page, order = '', platform= '' ) =>{

        const res = await request(`${_api}${_apiKey}
            &dates=2007-01-01,2023-12-31&page_size=16&page=${page}${order}${platform}`)
        return _transformGames(res)

    }

    function _transformGames (res){

        const {results} = res;
        return results
        
    }

    return {getAllGames}
}


export default GameService

