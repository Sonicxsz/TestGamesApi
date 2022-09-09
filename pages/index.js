import Head from 'next/head';
import GameItem from '../components/gameItem/gameItem';
import Layout from '../common/layout/layout';
import { useState, useEffect } from 'react';
import GameService from '../services/GameService';
import { Context } from '../common/context';


export default function Home(props) {
  const {results} = props;

  const [games, setGames] = useState(results); // массив игр для отрисовки
  const [firstLoad, setFirstLoad] = useState(true); // предотвращения повторного запроса при первом рендеринге
  //настройки для запроса
  const [page, setPage] = useState(2); // номер страницы 
  const [actualPlatform, setActialPlatform] = useState('');//платформа
  const [order, setOrder] = useState('&ordering=-metacritic&metacritic=1,100'); // сортировка по рейтингу или дате выхода
  const [fetching, setFetching] = useState(false); //запрос 
 


const {getAllGames} = GameService(); //сервис для запроса

//Функция для запроса с автоматической дозагрузкой
const onRequest = (page, order, platform) =>{
    getAllGames(page, order, platform)
        .then(res => {
          setGames(games => [...games,...res])
          setPage(page => page + 1)
          setFetching(false)
        })
        .catch(err => console.log(err))
}


//Функция для запроса при изменении фильтра или сортировки
const onFilterChangeRequest = ( order, platform ) =>{
  getAllGames(1, order, platform)
      .then(res => {
        setGames(games => [...res])
        setPage(page => page + 1)
        setFetching(false)
      })
}


  //Отслеж скролла для подгрузки
  useEffect(() =>{
    document.addEventListener('scroll', scrollLoad)
    
    return () =>{
      document.removeEventListener('scroll', scrollLoad)
    }   
  },[])



  useEffect(() =>{
    if(!firstLoad){
      onFilterChangeRequest(order, actualPlatform)
    }
    if(firstLoad){
      setFirstLoad(false)
    }
  },[order, actualPlatform])

  useEffect(() =>{
    if(fetching){
      onRequest(page, order, actualPlatform)
    }
  },[fetching])


  const scrollLoad = (e) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100){
      setFetching(true)
    }
  }
  
  return (
    <Context.Provider value={{
      setActialPlatform,
      setOrder
    }}>
      <Head>
        <title>All Games Page</title>
        <meta name="keywords" content='games, pc, ps, xbox' />
        <meta charSet='utf-8'/>
      </Head>
    <Layout>
     
      
        {games.length > 0 && games.map(i => {
          return <GameItem key={i.id}
          platforms={i.platforms} 
          name={i.name}
          metacritic={i.metacritic} 
          background_image={i.background_image}
          id={i.id}
          released={i.released}  />
        })}
    </Layout>
    </Context.Provider>
  )
}


//статический метод для реализации ssr и получения начальных данных для рендера страницы на сервере
export async function getStaticProps(ctx){

  let response = await fetch('https://api.rawg.io/api/games?key=ecde0efd01614fc68d0ef9efb4520852&dates=2007-01-01,2023-12-31&page_size=16&page=1&ordering=-metacritic&metacritic=1,100')

  response = await response.json()
  return {
    props:response
  }
}
