import { useState, useContext } from 'react';
import styled from 'styled-components';
import { device } from '../../common/utils/size';
import { Pc, Ps, Xb, Nt, MenuIcon } from '../../public/icons';
import { Context } from '../../common/context';




const FilterIcons = [<Pc key={1} />, <Ps key={2} />, <Xb key={3} />, <Nt key={4} />, 'ALL'];

function Panel() {
    const [showSort, setShowSort] = useState(false); // Показ сортировки
    const sort = ['Release up', 'Release down', 'Rating up', 'Rainting down']; // Отрисовка сортировки

    const sortValues = ['&ordering=-released', 
        '&ordering=released', 
        '&ordering=-metacritic&metacritic=1,100', 
        '&ordering=metacritic&metacritic=1,100']; // Значения сортировки для запроса
    const [activeSort, setActiveSort] = useState(2); // Aктивная сортировка


    const [showFilter, setShowFilter] = useState(false); // Показ фильтра на мобильном
    const [activeFilter, setActiveFilter] = useState(4); // Активный фильтр

    const FilterValues = ['&platforms=4', '&platforms=18,187', '&platforms=1,14,186', '&platforms=7', ''];
    const { setActialPlatform, setOrder } = useContext(Context);


    return (
        <>
            <SettingPanel>
                <> <DropDownButton onClick={() => setShowSort(!showSort)}>Order: {sort[activeSort]}</DropDownButton>
                    {showSort && <DropDowm>
                        {sort.map((i, ind) => ind === activeSort 
                            ? <li current="rgb(94, 171, 247)">{i}</li> 
                            : <li onClick={() => {
                                setShowSort(!showSort)
                                setActiveSort(ind)
                                setOrder(sortValues[ind])
                            }} key={ind}>{i}</li>)}
                    </DropDowm>}</>

                <Filter>
                    <BurgerButton>
                        <MenuIcon onClick={() => {
                            setShowFilter(!showFilter)
                        }} />
                    </BurgerButton>

                    <DesctopMenu>
                        {FilterIcons.map((i, ind) => ind === activeFilter 
                            ? <FilterButtonActive key={ind}>{i}</FilterButtonActive> 
                            : <FilterButton key={ind}
                                onClick={() => {
                                    setActiveFilter(ind)
                                    setActialPlatform(FilterValues[ind])
                                }}
                            >{i}</FilterButton>)}

                    </DesctopMenu>
                    {showFilter && (<HamburgerMenu>
                        {FilterIcons.map((i, ind) => ind === activeFilter 
                            ? <FilterButtonActive key={ind}>{i}</FilterButtonActive> 
                            :<FilterButton key={ind}
                                onClick={() => {
                                    setActialPlatform(FilterValues[ind])
                                    setActiveFilter(ind)
                                    setShowFilter(!showFilter)
                                }}
                            >{i}</FilterButton>)}
                    </HamburgerMenu>)}
                </Filter>

            </SettingPanel>
        </>
    )
}


const SettingPanel = styled.div`
    display: flex;
    justify-content: start;
    grid-area: panel;
    margin-bottom: 30px;
    position: relative;
`


export const FilterButton = styled.button`
display: flex;
align-items:center;
justify-content:center;
font-size:16px;
width: 40px;
height: 35px;
background-color: unset;
border: unset;
color:white;
border-radius: 5px;
transition: all 0.2s linear;
:hover{
    background-color: rgb(94, 171, 247);
}
:active{
    
    background-color: rgb(20, 126, 233);
}
`

const FilterButtonActive = styled(FilterButton)`
    background-color: rgb(20, 126, 233);
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
    width: 250px;
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

export const DropDownButton = styled.button`
    width: 100px;
    height: 50px;
    padding: 0 0 0 12px;
    background-color: hsla(0,0%,100%,.07);
    border-radius: 8px;
    border: unset;
    font-size: 10px;
    color: #fff;
    margin-left: 30px;
    text-align: start;
    position: relative;
    @media (${device.tablet}) {
        width: 150px;
        font-size: 14px;
    }
`

const DropDowm = styled.ul`
    position: absolute;
    top: 35px;
    left: 25px;
    width: 130px;
    height: auto;
    z-index: 999;
    color: rgb(40, 40, 40);
    background-color: #fff;
    border-radius: 10px;
    
    li{
        display: flex;
        align-items: center;
        width: 100%;
        height: 30px;
        list-style-type: none;
        padding: 0 0 0 15px;
        transition: all 0.2s linear;
        background-color:${props => props.current ? props.current : '#fff'};
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
    @media (${device.tablet}) {
        width: 160px;
        font-size: 14px;
        li{
            height: 40px;
            padding: 0 0 0 20px;
        }
    }
`

export default Panel


