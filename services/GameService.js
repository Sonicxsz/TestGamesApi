import axios from "axios";

const GameService = () => {
  let _apiKey = "key=ecde0efd01614fc68d0ef9efb4520852";
  let _api = 'https://api.rawg.io/api/games?';
  let _page = 1


  const xbox = 'platforms=1,186'
  const psn = 'platforms=18,187'
  const ps = 'platforms=4'

    const getAllGames = async (page = _page) =>{
        let res = await axios(`${_api}${_apiKey}&dates=2008-01-01,2023-12-31&page_size=20&page=${page}&ordering=released&}`)

        return _transformGames(res)
    }


    function _transformGames (res){
        let {results} = res.data;
        return results
    }

    return {getAllGames}
}




export default GameService