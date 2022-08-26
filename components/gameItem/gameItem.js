import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import styles from './styles.module.css'
import cn from 'classnames'
import { device } from '../../utils/size'

const GameWrapper = styled.div`
    display: inline-block;
    width: 300px;
    height: 380px;
    border-radius:12px;
    background-color: #202020;
    box-shadow: 0 10px 20px 0 rgb(0 0 0 / 7%);
    overflow: hidden;
    margin-bottom: 10px;
    margin-right: 10px;
   
    @media (${device.mobileL}){
        width: 450px;
        height: 420px;
    }
    @media (${device.laptop}){
        width: 300px;
        height: 380px;
    }

`

const GameImgWrapper = styled.div`
    width: 100%;
    height: 200px;
`

const RatingBlock = styled.div`
    display: inline-block;
    width: 30px;
    height: 20px;
    background: unset;
    border:2px solid #6dc849;
    color: #6dc849;
    border-radius: 5px;
    text-align: center;
    font-size: 14px;
`
const GameName = styled.h2`
    display: inline-block;
    font-size: 24px;
    font-weight: 700;
    color: white;
`

function GameItem() {
  return (
    <>
        <GameWrapper>
            <GameImgWrapper>
                <Image src="https://media.rawg.io/media/resize/640/-/games/ba8/ba82c971336adfd290e4c0eab6504fcf.jpg" objectFit='fill'  width="300" height="200px" alt="game" />
            </GameImgWrapper>
            <div style={{padding: '0 10px 0 10px'}}>
                <div>
                    <div className={styles.ratingWrapper}>
                        <span className={styles.greenInfo}>Rating:</span>
                        <RatingBlock>88</RatingBlock>
                    </div>
                </div>
                    <span className={styles.releseInfo}>Release: 12.02.2000</span>
                
                <GameName>Assasins CreedAssasins CreedAssasins Creed</GameName>
            </div>
    </GameWrapper>
    </>
  )
}

export default GameItem