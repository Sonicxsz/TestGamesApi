import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import GameItem from '../components/gameItem/gameItem'
import Layout from '../layout/layout'




const Wrapper = styled.div`
    width: 600px;
    margin: 80px auto 0 auto;
    background-color: red;
    
    
`

export default function Home() {

  return (
    <>
    <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
    </Head>
    <Layout>
    <GameItem />
    <GameItem />
    <GameItem />
    <GameItem />
    <GameItem />
    <GameItem />
    <GameItem />
    <GameItem />
    <GameItem />
    </Layout>
    </>
  )
}
