import React, { useState } from 'react'
import InformationComponent from '../../components/InformationComponent/InformationComponent'
import styled from 'styled-components'
import Header from '../../components/header/header'
import { H1 } from '../../layout/layout'
import { device } from '../../utils/size'
import Image from 'next/image'
import Ps from '../../public/ps.svg'
import Pc from '../../public/pc.svg'
import Xb from '../../public/xb.svg'
import Nt from '../../public/nt.svg'
import Slider from '../../components/slider/Slider'

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
const H2 = styled(H1)`
  grid-area:H2;
  font-size:20px;
  @media(${device.laptop}){
    font-size:40px;
  }  
  @media(${device.laptopL}){
    font-size:60px;
  }

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

const About = styled.div`
    width: 100%;
    grid-area: about;
    
`

const Media = styled.div`
    width: 100%;
    grid-area: media;
    height: 100vh;
    margin-top: 20px;
    grid-template-columns: 1fr;
    grid-template-areas: 
    'mainImg'
    'secondary'
    @media(${device.tablet}){
      grid-template-columns: 1fr;
        grid-template-areas: 
        'mainImg'
        'secondary';
        gap: 10px;
    } 

    @media(${device.laptop}){
      grid-template-columns: 1fr 1fr;
        grid-template-areas: 
        'mainImg mainImg'
        'secondary secondary';
        gap: 10px;
    }
   
`


const MainImg = styled.div`
    width:320px;
    height: 200px;
    grid-area: mainImg;
    position:relative;
    border-radius: 10px;
    overflow:hidden;
    margin: 10px auto;
    transition: transform 0.3s ease;
    @media(${device.mobileL}){
      width:370px;
      height: 210px;
    }  

   
    @media(${device.tablet}){
      display: block;
      width:614px;
      height: 300px;
      margin: 10px auto;
    } 
    @media(${device.laptop}){
      width:320px;
      height: 220px;
      :hover{
        transform: scale(106%);
        cursor: pointer;
    }
    } 
    @media(${device.laptopL}){
      width:400px;
      height: 220px;
    } 
   
    
`
const SecondaryImg = styled(MainImg)`
     @media(${device.tablet}){
      display: block;
      width:307px;
      height: 200px;
      margin: 10px auto;
    } 

    @media(${device.laptop}){
      display: block;
      height: 100px;
      width:147px;
      grid-area: secondary;
      margin: 5px 0;
      border-radius: 10px;
      overflow:hidden;
    }  
    
`
const SecondImgWrap = styled.div`
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

`
const ButtonMore = styled.button`
display: flex;
align-items:center;
justify-content:center;
position:absolute;
top: 101%; 
left: 95%;
transform: translateX(-100%);
z-index: 999;
font-size:12px;
width: 80px;
height: 20px;
background-color: white;
border: unset;
color:black;
border-radius: 1px;
transition: all 0.2s linear;

:hover{
    background-color: rgb(94, 171, 247);
}
:active{
    background-color: rgb(20, 126, 233);
}
`
const Title = styled.span`
  display:block;
  max-height: ${props => props.fullText ? '600px' : '110px'};
  font-size:17px;
  position:relative;
  overflow:hidden;
  transition: all 0.2s ease;
  background-color:#151515bd;
  border-radius: 10px;
  padding: 10px 10px;
  
`

const Text = styled.div`
  position:relative;
`

const H3 = styled(H2)`
  font-size: 40px;
  margin-bottom: 0;

`
const Platforms = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    padding: 0 2rem;

`





const FilterIcons = [<Pc key={1} />, <Ps key={2} />, <Xb key={3} />, <Nt key={4} />];
function SingleGame({ result, resultImages }) {
  const { background_image, name, description_raw, platforms, website, released, metacritic, playtime, developers, publishers } = result;
  const [showSlider, setShowSlider] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [fullText, setFullText] = useState(false)


  let platform = platforms.map(i => i.platform.id).map((i) => {
    if (i === 4) return FilterIcons[0]
    if (i === 18 || i === 16 || i === 187) return FilterIcons[1]
    if (i === 1 || i === 14 || i == 186) return FilterIcons[2]
    if (i === 7) return FilterIcons[3]
  })

  platform = [...new Set(platform)]

  return (

    <Wrapper img={background_image}>

      <FilterWrapper>
        <Header />
        <Content>
          <About>
            <H2>{name}</H2>
            <Platforms>
              {platform.map(i => {
                return i
              })}
            </Platforms>
            <Text>
              <H3>About</H3>
              <Title fullText={fullText}>{description_raw}</Title>
              {description_raw.length < 300 ? null : <ButtonMore onClick={() => setFullText(!fullText)}>{fullText ? 'Hide text' : 'Read more'}</ButtonMore>}
            </Text>


          </About>
          <Media>
            <MainImg
              onClick={() => {setShowSlider(true)}}
            >
              {resultImages.results.length > 0 && <Image src={resultImages.results[0].image} alt='photo' objectFit='fill' layout='fill' />}
            </MainImg>
            <SecondImgWrap>
              {resultImages.results.length > 0 && resultImages.results.map((i, ind) => {

                if (ind > 0 & ind < 5) {
                  return <SecondaryImg 
                  onClick={() => {
                    setCurrentSlide(ind)
                    setShowSlider(true)}}
                  key={i.id}>
                    <Image src={i.image} layout="fill" alt='screen'></Image>
                  </SecondaryImg>
                }

              })}
            </SecondImgWrap>

          </Media>
          <InformationComponent  data={result}/>
        </Content>
        
      </FilterWrapper>
      {showSlider && <Slider closeSlider={setShowSlider} number={currentSlide} img={resultImages.results} />}
       
    </Wrapper>
  )
}





export default SingleGame

export async function getServerSideProps({ params }) {
  const response = await fetch(`https://api.rawg.io/api/games/${params.id}?key=ecde0efd01614fc68d0ef9efb4520852`)
  const images = await fetch(`https://api.rawg.io/api/games/${params.id}/screenshots?key=ecde0efd01614fc68d0ef9efb4520852`)
  const result = await response.json()
  const resultImages = await images.json()
  return {
    props: { result, resultImages }
  }
}