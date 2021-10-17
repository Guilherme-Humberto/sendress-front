import React, { useContext } from 'react';
import Painel from '../../components/Admin/Painel/Painel';
import HeaderAdmin from '../../components/Admin/Header/Header';
import Layout from '../../components/Admin/Helpers/Layout/Layout';
import MenuLeft from '../../components/Admin/Helpers/MenuLeft/MenuLeft';
import { AdminContext } from '../../context/adminContext';
import Leads from '../../components/Admin/Leads/Leads';
import Lists from '../../components/Admin/Segments/Segments';
import Campaigns from '../../components/Admin/Campaigns/Campaigns';
import { GetServerSideProps } from 'next';
import { getAPIClient } from '../../services/api';
import Senders from '../../components/Admin/Senders/Senders';
import User from '../../components/Admin/User/User';
import { parseCookies } from 'nookies';
import Schedule from 'components/Admin/Schedule/Schedules';

interface AdminProps {
  leads: any[];
  segments: any[];
  campaigns: any[];
  senders: any[];
}

const Admin: React.FC<AdminProps> = ({ leads, segments, campaigns, senders }) => {
  const { route } = useContext(AdminContext);

  return (
    <main style={{ background: '#F0F1F8' }}>
      <Layout>
        <MenuLeft />
        <section style={{ margin: '0 auto', width: '140rem' }}>
          <HeaderAdmin />
          {route === 'painel' && (
            <Painel leads={leads} segments={segments} campaigns={campaigns} />
          )}
          {route === 'leads' && <Leads segments={segments} />}
          {route === 'segments' && <Lists />}
          {route === 'campaigns' && (
            <Campaigns segments={segments} senders={senders} />
          )}
          {route === 'senders' && <Senders />}
          {route === 'user' && <User />}
          {route === 'schedule' && <Schedule />}
        </section>
      </Layout>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const apiClient = getAPIClient(context);
  const { ['sendway.token']: token } = parseCookies(context);
  const { ['sendway.userid']: userid } = parseCookies(context);

  if (!token || !userid) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { data: leadsResponse } = await apiClient.get('/lead/listAll', {
    headers: { userid, Authorization: `Bearer ${token}` },
  });

  const { data: segmentsResponse } = await apiClient.get('/segment/listAll', {
    headers: { userid, Authorization: `Bearer ${token}` },
  });

  const { data: campaignsRespomse } = await apiClient.get('/campaign/listAll', {
    headers: { userid, Authorization: `Bearer ${token}` },
  });

  const { data: sendersRespomse } = await apiClient.get('/sender/listAll', {
    headers: { userid, Authorization: `Bearer ${token}` },
  });

  return {
    props: {
      leads: leadsResponse,
      segments: segmentsResponse,
      campaigns: campaignsRespomse,
      senders: sendersRespomse,
    },
  };
};

export default Admin;
