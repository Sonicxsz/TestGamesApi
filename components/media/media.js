import { device } from "../../common/utils/size"
import Image from "next/image"
import styled from "styled-components"




function MediaComponent(props) {
  const {results, setCurrentSlide, setShowSlider} = props;
  
  return (
    <>
        <Media>
            <MainImg
              onClick={() => {setShowSlider(true)}}
            >
              {results.length > 0 && <Image src={results[0].image} alt='photo' objectFit='fill' layout='fill' />}
            </MainImg>
            <SecondImgWrap>
              {results.length > 0 && results.map((i, ind) => {

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
    </>
  )
}

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

const SecondImgWrap = styled.div`
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;

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

export default MediaComponent