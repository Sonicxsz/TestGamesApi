import axios from "axios";
import useHttp from "../common/hooks/useHttp";


const GameService = () => {
  let _apiKey = "key=ecde0efd01614fc68d0ef9efb4520852";
  let _api = 'https://api.rawg.io/api/games?';
  let _page = 1
  const  {request} = useHttp()
    const getAllGames = async (page = _page, order = '', platform= '' ) =>{

        let res = await request(`${_api}${_apiKey}&dates=2007-01-01,2023-12-31&page_size=16&page=${page}${order}${platform}`)
        return _transformGames(res)
    }


    function _transformGames (res){
        let {results} = res;
        return results
    }



    return {getAllGames}
}


export default GameService

