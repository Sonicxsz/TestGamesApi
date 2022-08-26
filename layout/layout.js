import React from 'react'
import styles from './layout.module.css'
import { useState } from 'react'
import styled from 'styled-components'
import { device } from '../utils/size'
import Ps from '../public/ps.svg'
import Pc from '../public/pc.svg'
import Xb from '../public/xb.svg'
const sort = ['All', 'Release', 'Rating']



const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: 
    'header'
    'H1'
    'sortWrapper'
    'body' ;

    @media (${device.tablet}){
        grid-template-columns: 20px 1fr 20px;
        grid-template-areas: 
        '. header .'
        'H1 H1 H1'
        'sortWrapper sortWrapper sortWrapper'
        '. body .' ;
    }

    @media (${device.laptopL}){
        grid-template-columns: 50px 1fr 1fr 110px;
        grid-template-areas: 
        'header header header header'
        '. H1 H1 H1'
        '. sortWrapper sortWrapper .'
        '. body body body' ;
    }

    
`


const Header = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    grid-area: header;
    padding: 0 5px 0 5px;
    @media (${device.tablet}) {
        grid-template-columns: 1fr 6fr;
        gap: 30px;
        width: 100%;
        height: 70px; 
    }
    @media (${device.laptop}) {
        grid-template-columns: 1fr 6fr 1fr;
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
const Logo = styled.div`
        display: none;
    @media (${device.tablet}) {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 25px;
        font-weight: 900;
        line-height: 1;
        letter-spacing: 5px;
        color: #fff;
        padding-right: 20px;
    }
`

const SearchInput = styled.input`
    background: unset;
    border: 1px solid black;
    border-radius: 20px;
    margin-top: 13px;
    height: 42px;
    background-color: hsla(0,0%,100%,.16);
    color: hsla(0,0%,100%,.6);
    padding: 0 40px 0 40px;
    font-size: 16px;
    outline: none;
    transition: all 0.2s linear;
    :focus{
        background-color: white;
        color: black;
    }


`
const DropDownButton = styled.button`
    width: 100px;
    height: 50px;
    padding: 10px 16px;
    background-color: hsla(0,0%,100%,.07);
    border-radius: 8px;
    border: unset;
    font-size: 12px;
    color: #fff;
    margin-left: 30px;
    text-align: start;
    position: relative;
    @media (${device.tablet}) {
        width: 150px;
        font-size: 16px;
    }
`

const DropDowm = styled.ul`
    position: absolute;
    top: 25px;
    left: 25px;
    width: 160px;
    height: auto;
    z-index: 999;
    color: rgb(40, 40, 40);
    background-color: #fff;
    border-radius: 10px;
    li{
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        list-style-type: none;
        padding: 0 0 0 20px;
        transition: all 0.2s linear;
    }
    li:first-child{
        border-radius: 10px 10px 0 0;
    }
    li:last-child{
        border-radius: 0 0 10px 10px;
    }
    li:hover{
        background-color: rgb(20, 126, 233);
    }
    li:active{
        background-color: rgb(94, 171, 247);
    }
`

const H1 = styled.h1`
    grid-area: H1;
    padding-left: 30px;
    font-size: 33px;
    line-height: 74px;
    font-weight: 700;
    @media (${device.laptopL}) {
        font-size: 72px;
    }
    
`

const SettingPanel = styled.div`
    display: flex;
    justify-content: start;
    grid-area: sortWrapper;
    margin-bottom: 30px;
    position: relative;
`


const FilterButton = styled.button`
    display: flex;
    align-items:center;
    width: 40px;
    height: 35px;
    background-color: unset;
    border: unset;
    border-radius: 5px;
    transition: all 0.2s linear;
    :hover{
        background-color: rgb(20, 126, 233);
    }
    :active{
        background-color: rgb(94, 171, 247);
    }
`



function Layout({children}) {
    const [showSort, setShowSort] = useState(false)
    const [activeSort, setActiveSort] = useState(0)

  return (<Wrapper>
        <Header>
            <Logo>
                RAWG
            </Logo>
            <SearchInput placeholder='search' type="text" />
           
        </Header>
        <H1>New and trending</H1>
        <SettingPanel>
               <div> <DropDownButton onClick={() => setShowSort(!showSort)}>Order by: {sort[activeSort]}</DropDownButton>
               {showSort && <DropDowm>
                    {sort.map((i, ind) =>{
                        return <li key={ind} >{i}</li>
                    })}
                </DropDowm>}</div>

                <div className={styles.filter}>
                    <FilterButton><Ps/></FilterButton>
                    <FilterButton><Pc/></FilterButton>
                    <FilterButton><Xb/></FilterButton>
                </div>
               
        </SettingPanel>
       
        <BodyContent>{children}</BodyContent>
    </Wrapper>
  )
}

export default Layout