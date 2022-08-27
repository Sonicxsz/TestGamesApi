import Head from 'next/head'
import GameItem from '../components/gameItem/gameItem'
import Layout from '../layout/layout'
import { useState, useEffect, useContext } from 'react'
import GameService from '../services/GameService'
import { Context } from '../context'



export default function Home() {
  const [games, setGames] = useState([]) // массив игр для отрисовки
  
//настройки для запроса
  const [page, setPage] = useState(1) // номер страницы 
  const [actualPlatform, setActialPlatform] = useState('')//платформа
  const [order, setOrder] = useState('&ordering=-metacritic&metacritic=1,100') // сортировка по рейтингу или дате выхода
  
  
  const [fetching, setFetching] = useState(false) //запрос 



  const {getAllGames} = GameService() //сервис для запроса


const onRequest = (page, order, platform) =>{
    getAllGames(page, order, platform)
        .then(res => {
          setGames(games => [...games,...res])
          setPage(page => page + 1)
          setFetching(false)
        })
}

const onFilterChangeRequest = ( order, platform ) =>{
  getAllGames(1, order, platform)
      .then(res => {
        setGames(games => [...res])
        setPage(page => page + 1)
        setFetching(false)
      })
}

  useEffect(() =>{
    document.addEventListener('scroll', scrollLoad)
    
    return () =>{
      document.removeEventListener('scroll', scrollLoad)
    }
    
  },[])

  useEffect(() =>{
    onFilterChangeRequest(order, actualPlatform)
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
    </Head>
    <Layout>
        {games.length > 0 && games.map(i => {
          return <GameItem key={i.id}
          platforms={i.platforms} 
          name={i.name}
          metacritic={i.metacritic} 
          background_image={i.background_image}
          released={i.released}  />
        })}
    </Layout>
    </Context.Provider>
  )
}
