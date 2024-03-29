
import styled from 'styled-components'
import { device } from '../utils/size'
import Panel from '../../modules/Panel/Panel'
import Header from '../../modules/header/header'

function Layout({children}) { 
  return (
  <Wrapper>
        <Header />
            <H1>New and trending</H1>
        <Panel/>
        <BodyContent>{children}</BodyContent>
  </Wrapper>
  )
}

export default Layout;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: 
    'header'
    'H1'
    'panel'
    'body' ;

    @media (${device.mobileL}){
        grid-template-columns: 20px 1fr 20px;
        grid-template-areas: 
        '. header .'
        'H1 H1 H1'
        'panel panel panel'
        '. body .' ;
    }

    @media (${device.laptopL}){
        grid-template-columns: 100px 1fr 1fr 110px;
        grid-template-areas: 
        'header header header header'
        '. H1 H1 H1'
        '. panel panel .'
        '. body body body' ;
    }


    
`



const BodyContent = styled.div`
    display: flex;  
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    grid-area: body;
    padding-left: 10px;
    gap: 20px;

    @media (${device.laptop}) {
        justify-content: start;
    }

`


export const H1 = styled.h1`
    grid-area: H1;
    padding-left: 30px;
    font-size: 33px;
    line-height: 74px;
    font-weight: 700;
    @media (${device.laptopL}) {
        font-size: 72px;
    }
    
`