import Head from 'next/head';
import GameItem from '../components/gameItem/gameItem';
import Layout from '../common/layout/layout';
import { useState, useEffect } from 'react';
import GameService from '../services/GameService';
import { Context } from '../common/context';


export default function Home({results}) {
    const [games, setGames] = useState(results); 
    const [firstLoad, setFirstLoad] = useState(true); // Предотвращения повторного запроса при первом рендеринге

    const [numberOfPage, setNumberOfPage] = useState(2);
    const [actualPlatform, setActialPlatform] = useState('');// Платформа

    const [order, setOrder] = useState('&ordering=-metacritic&metacritic=1,100'); // Сортировка по рейтингу или дате выхода
    const [fetching, setFetching] = useState(false); // Запрос 
 


    const {getMoreGames} = GameService(); // Сервис для запроса

    // Функция для запроса с автоматической дозагрузкой
    const onRequest = async(page, order, platform) =>{
      const res = await getMoreGames(page, order, platform)
        setGames(games => [...games,...res])
        setNumberOfPage(numberOfPage => numberOfPage + 1)
        setFetching(false)
    }


    // Функция для запроса при изменении фильтра или сортировки
    const onFilterChangeRequest = async( order, platform ) =>{
      const pageNumber = 1;
      const res = await getMoreGames(pageNumber, order, platform)
        setGames([...res])
        setNumberOfPage(numberOfPage => numberOfPage + 1)
        setFetching(false)
    }
    
    const scrollLoad = (e) => {
      if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100){
          setFetching(true)
      }
  }

    // Отслеж скролла для подгрузки
    useEffect(() =>{
      if(fetching){
        onRequest(numberOfPage, order, actualPlatform)
      }
        document.addEventListener('scroll', scrollLoad)
    
        return () =>{
            document.removeEventListener('scroll', scrollLoad)
        }   
    },[fetching])


    useEffect(() =>{
        if(!firstLoad){
            onFilterChangeRequest(order, actualPlatform)
        }

        if(firstLoad){
            setFirstLoad(false)
        }
    },[order, actualPlatform])
  
  
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
                {games.length > 0 && games.map(i => <GameItem key={i.id}
                    platforms={i.platforms} 
                    name={i.name}
                    metacritic={i.metacritic} 
                    background_image={i.background_image}
                    id={i.id}
                    released={i.released}  />)}
            </Layout>
        </Context.Provider>
    )
}

export async function getStaticProps(ctx){
    const {getStartData} = GameService()
    const res = await getStartData()
 
    return {
        props:res
    }
}
