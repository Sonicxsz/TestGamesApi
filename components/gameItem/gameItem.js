import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import styles from './styles.module.css'
import { device } from '../../common/utils/size'
import Link from 'next/link'



function GameItem(props) {
   const {metacritic, background_image, name, released, id} = props;
   
  return (
    <>
        <GameWrapper>
            <GameImgWrapper>
                {background_image  && <Image src={background_image} layout='fill' alt="game" />}
            </GameImgWrapper>
            <div style={{padding: '0 10px 0 10px'}}>
                
                    <RatingWrapper>
                        <div className={styles.flex}>
                            <span className={styles.greenInfo}>Rating:</span>
                            <RatingBlock>{metacritic ? metacritic : 0}</RatingBlock>
                        </div>
                    </RatingWrapper>
                
                    <span className={styles.releseInfo}>Release: {released}</span>
                
                <Link href={'/game/[id]'} as={`/game/${id}`}><GameName>{name}</GameName></Link>
            </div>
    </GameWrapper>
    </>
  )
}

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
    transition: transform 0.3s ease;
    cursor: pointer;
    
    @media (${device.mobileL}){
        width: 400px;
        height: 420px;
    }
    
    @media (${device.laptop}){
        width: 300px;
        height: 380px;
        :hover{
            transform: scale(106%);
            cursor: pointer;
        }
    }

`

const GameImgWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 200px;
    @media (${device.mobileL}){
        height: 250px;
    }
    @media (${device.laptop}){
        height: 200px;
    }
`

export const RatingBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    width: ${props => props.width ? props.width : '30px'};
    height:  ${props => props.height ? props.height : '20px'};
    background: unset;
    border:2px solid #6dc849;
    color: #6dc849;
    border-radius: 5px;
    font-size: ${props => props.fz ? props.fz : '15px'};
`
const GameName = styled.h2`
    display: inline-block;
    font-size: 24px;
    font-weight: 700;
    color: white;
`

const RatingWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    margin-bottom: 10px;

`

export default GameItem