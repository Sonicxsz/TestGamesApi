import Head from 'next/head'
import GameItem from '../components/gameItem/gameItem'
import Layout from '../layout/layout'
import { useState, useEffect } from 'react'
import GameService from '../services/GameService'




export default function Home() {
  const [games, setGames] = useState([])
  const [page, setPage] = useState(1)
  const {getAllGames} = GameService()
  const [fetching, setFetching] = useState(false)
  const xbox = 'platforms=1,186'
  const psn = 'platforms=18,187'
  const ps = 'platforms=4'


const onRequest = (page) =>{
    getAllGames(page)
        .then(res => {
          setGames(games => [...games, ...res])
          setPage(page => page + 1)
          setFetching(false)
        })
    
}

  useEffect(() =>{
    onRequest(page)
  
    document.addEventListener('scroll', scrollLoad)

    return () =>{
      document.removeEventListener('scroll', scrollLoad)
    }
  },[])

  useEffect(() =>{
    if(fetching){
      onRequest(page)
    }
  },[fetching])


  const scrollLoad = (e) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100){
      setFetching(true)
    }
  }
  

 

  
  return (
    <>
    <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
    </Head>
    <Layout>
        {games.length > 0 && games.map(i => {
          return <GameItem key={i.id} 
          name={i.name}
          metacritic={i.metacritic} 
          background_image={i.background_image}
          released={i.released}  />
        })}
    </Layout>
    </>
  )
}
