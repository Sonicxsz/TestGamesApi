import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { device } from '../../utils/size'

const HeaderWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    grid-area: header;
    padding: 0 5px 0 5px;
    position: relative;
    @media (${device.mobileL}) {
        grid-template-columns: 1fr 2fr;
        gap: 30px;
        width: 100%;
        height: 70px; 
    }
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
const Logo = styled.div`
        display: none;
        cursor: pointer;
    @media (${device.mobileL}) {
        display: flex;
        justify-content: center;
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
const SearchDrop = styled.div`
    position: absolute;
    top: 55px;
    left: 0;
    width: 100%;
    background:red;
    z-index: 999;
`

function Header() {
  return (

    <HeaderWrapper>
            <Link href={'/'}>
                <Logo>
                    RAWG
                </Logo>
            </Link>
            <SearchInput placeholder='search' type="text" />
           <SearchDrop>ss</SearchDrop>
    </HeaderWrapper>
    
  )
}

export default Header