import Link from 'next/link'
import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import { device } from '../../utils/size'
import debounce from 'lodash.debounce'
import FindGameItem from './findGame';
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
    left: 0%;
    width: 100%;
    background:#151515e4;
    border-radius: 20px;
    z-index: 999;
    padding: 10px 20px;

    @media (${device.laptop}) {
        top: 55px;
        left: 10%;
        width: 80%;
    }

`



function Header() {
    const [searchLocal, setSearchLocal] = useState('')
    const [serverSearch, setServerSearch] = useState('')
    const [games, setGames] = useState([]) 

    const usDeb = React.useCallback(
        debounce((str) => {
            setServerSearch(str);
        }, 150),
        []
      );
      const  onChangeInp = (e) => {
        setSearchLocal(e.target.value);
        usDeb(e.target.value);
        
      };

    useEffect(() =>{
         if(serverSearch.length > 1){
            fetch(`https://api.rawg.io/api/games?key=ecde0efd01614fc68d0ef9efb4520852&dates=2007-01-01,2023-12-31&page_size=5&page=1&search=${serverSearch}`)
            .then(res => res.json())
            .then(res => setGames(res.results))
         }else{
            games.length > 0 && setGames([])
         }
    }, [serverSearch])  

  return (

    <HeaderWrapper>
            <Link href={'/'}>
                <Logo>
                    RAWG
                </Logo>
            </Link>
            <SearchInput onChange={onChangeInp} value={searchLocal} placeholder='search' type="text" />
           {searchLocal.length > 1 && <SearchDrop>
             {games.map(i =>{
                return <FindGameItem
                    setGames={setGames}
                    setSearchLocal={setSearchLocal}
                    setServerSearch={setServerSearch}
                    link={`${i.id}`} key={i.id} img={i.background_image} text={i.name}/>
             })}
           </SearchDrop>}
    </HeaderWrapper>
    
  )
}

export default Header