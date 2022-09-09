import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

function Page404() {
    return (
        <NotFound>
            <Message>
                Страница не найдена
            </Message>
            <Link href={'/'} as={'/'}>
                <Button>Вернуться на главную</Button>
            </Link>
        </NotFound>
    )
}


export default Page404


const NotFound = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;

`

const Message = styled.h1`

`

const Button = styled.button`
    width: 200px;
    height: 70px;
    background: #4c8aed;
    border: none;
    font-size: 20px;
    color: white;
    transition: all 0.2s linear;
    border-radius: 10px;
    padding: 10px;
    :hover{
        background: #669aed;
    }
`