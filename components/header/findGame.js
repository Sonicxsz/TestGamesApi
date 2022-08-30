import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
const FindGame = styled.div`
    display:flex;
    justify-content: start;
    align-items:center;
    width: 100%;
    height: 50px;
    background: #151515e4;
    margin: 5px 0;

`
const FindImageWrapper = styled.div`
    display:block;
    width: 60px;
    position: relative;
    height: 50px;
`

const Name = styled.span`
    display: block;
    font-size: 18px;
    color: white;
    margin-left: 10px;
`


function FindGameItem(props) {
   const {setSearchLocal, setServerSearch, setGames, link, img, text} = props
  return (
    <Link href={'/single/[id]'} as={`/single/${link}`}>
        
    <FindGame onClick={() =>{
        setSearchLocal('')
        setGames([])
        setServerSearch('')
    }}>
       <FindImageWrapper>
        <Image src={img} layout="fill" alt='img'></Image>
       </FindImageWrapper>
        <Name>{text}</Name>
    </FindGame>
    </Link>
    
  )
}

export default FindGameItem