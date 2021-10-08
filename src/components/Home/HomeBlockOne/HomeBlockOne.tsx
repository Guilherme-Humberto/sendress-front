import React from 'react';
import axios from 'axios'
import Image from 'next/image'

import { HomeBlockOneWrapper } from './HomeBlockOneStyles';

const HomeBlockOne: React.FC = () => {
        const buy = async () => {
        // const stripe = await stripeConfigure()
        await axios.post('http://localhost:3333/client/register', {
            name: "Guilherme",
            secondname: "Humberto",
            document: "37749903323",
            email: "gbreups4@gmail.com",
            password: "12345678",
            planMode: "basic",
            status: "active",
            productId: "prod_KDPiKkyddBoqpp"
        })
        .then((res) => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <HomeBlockOneWrapper>
            <div>
                <p>Criado por ProdBase</p>
                <h1>Aumente sua conversão com envios automatizados de cold e-mails</h1>
                <p className="text-intro">Diminua drasticamente o tempo de prospecção e aumente sua taxa de conversão com envios agendados, e-mails personalizados e métricas de sucesso</p>
                <form action="">
                    <input type="text" placeholder="Informe seu e-mail"/>
                    <button>Quero experimentar</button>
                </form>
            </div>
            <div>
                <Image src="/home/ilustration.svg" width={1200} height={800} alt="photo"/>
            </div>
        </HomeBlockOneWrapper>
    )
}

export default HomeBlockOne;