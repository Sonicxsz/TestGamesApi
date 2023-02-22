import React, { useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { device } from '../../common/utils/size'
import Header from '../../modules/header/header'
import InformationComponent from '../../components/Information/Information'
import Slider from '../../modules/slider/Slider'
import MediaComponent from '../../components/media/media'
import AboutComponent from '../../modules/about/about'
import GameService from '../../services/GameService'

function SingleGame({responseGame, responseImages}) {
    const [showSlider, setShowSlider] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    
    const [fullText, setFullText] = useState(false)

    return (

        <Wrapper img={responseGame.background_image}>
            <Head>
                <title>Game full page</title>
                <meta name="keywords" content='games,nintendo, pc, ps, xbox' />
                <meta charSet='utf-8'/>
            </Head>
            <FilterWrapper>
                <Header />
                <Content>
                    <AboutComponent result={responseGame} fullText={fullText}  setFullText={setFullText}/>
                    <MediaComponent 
                        setShowSlider={setShowSlider}
                        setCurrentSlide={setCurrentSlide}
                        results={responseImages.results} />
                    <InformationComponent  data={responseGame}/>
                </Content>
        
            </FilterWrapper>
            {showSlider && <Slider closeSlider={setShowSlider} number={currentSlide} img={responseImages.results} />}
       
        </Wrapper>
    )
}



export async function getServerSideProps({ params }) {
    const {getSingleGame} = GameService()
    const {responseGame, responseImages} = await getSingleGame(params.id)

    return {
        props: { responseGame, responseImages }
    }
}

export default SingleGame


const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    background: url(${props => props.img});
    background-size: cover;
    position:relative;
    
`
const FilterWrapper = styled(Wrapper)`
    background-color: #151515df;
    
`

const Content = styled.div`
    display:grid;
    grid-area:content;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1150px 300px;
    margin-top: 20px;
    padding-bottom:10px;
    grid-template-areas: 
        'about'
        'media'
        'information';
    @media(${device.mobileL}){
      grid-template-rows: auto 1200px auto;
    } 
    
    @media(min-width:550px){
      grid-template-rows: auto 1200px auto;
    } 

    @media(min-width:750px){
      grid-template-rows: auto 700px auto;
    } 

    @media(${device.tablet}){
      grid-template-rows: auto 900px auto;
    } 
    @media(${device.laptop}){
      grid-template-columns: 1fr 1.6fr 1fr 1fr;
      grid-template-rows: 500px;
        grid-template-areas: 
        '. about media .'
        '. . information .';
        gap: 10px;
    } 
    @media(${device.laptopL}){
      grid-template-columns: 1fr 1.6fr 1fr 1fr;
      grid-template-rows: 500px;
        grid-template-areas: 
        '. about media .'
        '. . information .';
        gap: 10px;
    }    
`