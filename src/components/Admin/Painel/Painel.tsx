import React, { useContext, useEffect, useRef } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { AdminContext } from '../../../context/adminContext';
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import { PainelWrapper, ListCards, ChartWrapper } from './PainelStyles';

interface PainelProps {
  contacts: any[];
  segments: any[];
  campaigns: any[];
}

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const Painel: React.FC<PainelProps> = ({ contacts, segments, campaigns }) => {
  const { setRoute } = useContext(AdminContext);

  return (
    <PainelWrapper>
      <ListCards>
        <div onClick={() => setRoute('contacts')}>
          {contacts?.length >= 1 ? (
            <>
              <h3>Meus contatos</h3>
              <ul>
                {contacts.slice(0, 5).map(contact => (
                  <li key={contact.id}>{contact.email}</li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h3>Nenhum contato cadastrado</h3>
              <small>Comece cadastrando seus contatos</small>
              <button className="btn-add">
                Cadastrar contatos <BsArrowRight />
              </button>
            </>
          )}
        </div>
        <div onClick={() => setRoute('segments')}>
          {segments?.length >= 1 ? (
            <>
              <h3>Minhas listas</h3>
              <ul>
                {segments.slice(0, 5).map(segment => (
                  <li key={segment.id}>{segment.title}</li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h3>Nenhuma lista cadastrado</h3>
              <small>Comece cadastrando suas lista</small>
              <button className="btn-add">
                Cadastrar lista <BsArrowRight />
              </button>
            </>
          )}
        </div>
        <div onClick={() => setRoute('campaigns')}>
          {campaigns?.length >= 1 ? (
            <>
              <h3>Minhas campanhas</h3>
              <ul>
                {campaigns.slice(0, 5).map(campaign => (
                  <li key={campaign.id}>{campaign.name}</li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h3>Nenhuma campanha cadastrado</h3>
              <small>Comece cadastrando suas campanhas</small>
              <button className="btn-add">
                Cadastrar campanha <BsArrowRight />
              </button>
            </>
          )}
        </div>
        <div>
          <h3>Templates</h3>
          <p>Veja os templates dispon??veis para usar em suas campanhas.</p>
          <button>Op????es de template</button>
        </div>
      </ListCards>
      <ChartWrapper>
        <ResponsiveContainer width="100%" aspect={4}>
          <LineChart
            className="chart-wrapper"
            width={400}
            height={400}
            data={data}>
            <Line
              type="monotone"
              dataKey="uv"
              strokeWidth="4px"
              stroke="#e07a5f"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </PainelWrapper>
  );
};

export default Painel;
