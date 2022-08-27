import { useState } from 'react'
import styled from 'styled-components'
import { device } from '../../utils/size'
import Ps from '../../public/ps.svg'
import Pc from '../../public/pc.svg'
import Xb from '../../public/xb.svg'
import MenuIcon from '../../public/menu.svg'




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

const Filter = styled.div`
display:flex;
width: 50px;
height: 50px;
background-color: hsla(0,0%,100%,.07);
border-radius: 8px;
border: unset;
font-size: 16px;
color: #fff;
margin-left: 30px;
position: relative;
@media (${device.tablet}) {
    width: 200px;
    height: 50px;
    padding: 10px 16px;
}


`

const HamburgerMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 998;
    top:55px;
    position: absolute;
    background-color: #363434;
    padding: 5px 5px;
    gap: 5px;
    border-radius: 10px;
    @media (${device.tablet}) {
        display: none;
    }

`

const DesctopMenu = styled.div`
display: none;
@media (${device.tablet}) {
    display: flex;
    width:100%;
    align-items:center;
    justify-content:space-between;
}
`
const BurgerButton = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:100%;
height:100%;
@media (${device.tablet}) {
    display: none;
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


function Panel() {
    const [showSort, setShowSort] = useState(false);
    const [activeSort, setActiveSort] = useState(0);
    const [showFilter, setFilter] = useState(false);
    const sort = ['All', 'Release', 'Rating']


  return (
    <>
        <SettingPanel>
               <div> <DropDownButton onClick={() => setShowSort(!showSort)}>Order by: {sort[activeSort]}</DropDownButton>
               {showSort && <DropDowm>
                    {sort.map((i, ind) =>{
                        return <li key={ind} >{i}</li>
                    })}
                </DropDowm>}</div>

                <Filter>
                    <BurgerButton>
                    <MenuIcon onClick={() =>{
                        setFilter(!showFilter)
                    }}/>
                    </BurgerButton>
                   
                    <DesctopMenu>
                        <FilterButton><Ps/></FilterButton>
                        <FilterButton><Pc/></FilterButton>
                        <FilterButton><Xb/></FilterButton>
                    </DesctopMenu>
                    {showFilter && (<HamburgerMenu>
                        <FilterButton><Ps/></FilterButton>
                        <FilterButton><Pc/></FilterButton>
                        <FilterButton><Xb/></FilterButton>
                    </HamburgerMenu>)}
                </Filter>
               
        </SettingPanel>
    </>
  )
}

export default Panel


