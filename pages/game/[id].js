import React, { useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { device } from '../../common/utils/size'
import Header from '../../modules/header/header'
import InformationComponent from '../../components/Information/Information'
import Slider from '../../modules/slider/Slider'
import MediaComponent from '../../components/media/media'
import AboutComponent from '../../modules/about/about'


function SingleGame(props) {
  const {result, resultImages} = props;
  const { background_image } = result;
  const [showSlider, setShowSlider] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [fullText, setFullText] = useState(false)

  return (

    <Wrapper img={background_image}>
       <Head>
        <title>Single Page</title>
        <meta name="keywords" content='games,nintendo, pc, ps, xbox' />
        <meta charSet='utf-8'/>
      </Head>
      <FilterWrapper>
        <Header />
        <Content>
          <AboutComponent result={result} fullText={fullText}  setFullText={setFullText}/>
          <MediaComponent setShowSlider={setShowSlider} setCurrentSlide={setCurrentSlide} results={resultImages.results} />
          <InformationComponent  data={result}/>
        </Content>
        
      </FilterWrapper>
      {showSlider && <Slider closeSlider={setShowSlider} number={currentSlide} img={resultImages.results} />}
       
    </Wrapper>
  )
}



export async function getServerSideProps({ params }) {
  const response = await fetch(`https://api.rawg.io/api/games/${params.id}?key=ecde0efd01614fc68d0ef9efb4520852`)
  const images = await fetch(`https://api.rawg.io/api/games/${params.id}/screenshots?key=ecde0efd01614fc68d0ef9efb4520852`)
  const result = await response.json()
  const resultImages = await images.json()
  return {
    props: { result, resultImages }
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