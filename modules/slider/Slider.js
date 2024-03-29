import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight, FaRegWindowClose } from 'react-icons/fa'
import { useKey } from '../../common/hooks/useKey'
import styled from 'styled-components'
import { device } from '../../common/utils/size'


function Slider({img, number, closeSlider}) {
    const [pages, setPages] = useState([]);
    const [current, setCurrent] = useState(number);

    useKey('ArrowLeft', handlerClickPrev);
    useKey('ArrowRight', handlerClickNext);
    useKey('Escape', handleClose);
    
    useEffect(() => {
        setPages(img)
    }, []);


    const handleClose = () => {
        closeSlider(false)
    }

    const handlerClickPrev = () => {
        setCurrent(current => current - 1 === -1 ? pages.length - 1 : current - 1)
    }

    const handlerClickNext = () => {
        setCurrent(current => current + 1 > pages.length - 1 ? 0 : current + 1)
    }

    return (
        <ModalWrapper>

            <Control>
                <Circle
                    onClick={handlerClickPrev}>
                    <FaChevronLeft style={{ height: '25px' }} />
                </Circle>
                <Circle
                    onClick={handlerClickNext}
                >
                    <FaChevronRight style={{ height: '25px' }} />
                </Circle>

            </Control>
            <CloseBtn width='50px' height='50px' onClick={() => closeSlider(false)}>
                <FaRegWindowClose style={{ width: '45px', height: '25px', color: 'white' }} />
            </CloseBtn>
            <WindowWrap>
                <Side onClick={handlerClickPrev} />
                <Window>
                    {pages.length > 0 
                    && <Image src={pages[current].image} objectFit='scale-down' layout="fill" alt='img' />}
                </Window>
                <Side onClick={handlerClickNext} />
            </WindowWrap>
            <Pagination>
                {pages.length > 0 && pages.map((i, ind) => ind === current 
                    ? <CircleActive key={ind} width='20px' height='20px' border='1px solid #fff' /> 
                    : <Circle key={ind} 
                        onClick={() => setCurrent(ind)} width='20px' height='20px' border='1px solid #fff' />)}
            </Pagination>

        </ModalWrapper>
    )
}

const Circle = styled.div`
    width: ${props => props.width ? props.width : '40px'};
    height: ${props => props.height ? props.height : '40px'};
    border-radius: 50%;
    display: flex;
    align-items:center;
    justify-content: center;
    background-color: rgb(12, 12, 12);
    border: ${props => props.border ? props.border : 'none'};
    transition: background-color 0.2s linear;
    :hover{
        background-color: rgb(94, 171, 247);
    }
    
`

const CircleActive = styled(Circle)`
background-color: rgb(94, 171, 247);

`

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 10%;
    background-color: rgb(12, 12, 12);
    margin-top: 10px;
    gap: 20px;
`
const Window = styled.div`
    position: relative;
    width: 80%;
    height: 80%;
    margin: auto;

`
const Side = styled.div`
    display:inline-block;
    width: 10%;
    height: 100%;
`


const Control = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 5px;
`

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    z-index: 999;
    background: rgba(21, 21, 21, 0.755);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: space-between;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
`
const CloseBtn = styled(Circle)`
    position: fixed;
    bottom: 100px;
    z-index: 999;
    bottom: 60px;
    @media(${device.laptop}){
        right: 20px;
        top: 20px;
    }
`
const WindowWrap = styled(Window)`
    width: 100%;
    display:flex;
    margin: 0 auto;
`

export default Slider