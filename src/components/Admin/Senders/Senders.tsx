import React, { useState, useContext } from 'react';
import { SendersWrapper, SenderForm } from './SendersStyles';
import { FiMenu } from 'react-icons/fi';
import { RiCloseFill } from 'react-icons/ri';
import Table from '../Helpers/Table/Table';
import useFetcher from '../../hooks/useSwr';
import Modal from '../Helpers/Modals/Modal/Modal';
import Input from '../Helpers/Input/Input';
import User from '../User/User';
import { AdminContext } from '../../../context/adminContext';
import { BsChevronDown } from 'react-icons/bs';

interface SendersProps {
  id: number;
  title: string;
  email: string;
  status: string;
}

interface Error {
  title: string;
  email: string;
}

const Senders: React.FC = () => {
  const [itemsPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [activeModalCreate, setActiveModalCreate] = useState(false);

  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');

  const [error, setError] = useState<Error>({} as Error);

  const { user, token } = useContext(AdminContext);

  const { data: senders } = useFetcher('/sender/listAll', {
    user: user.id,
    token,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentSenders = senders?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNum: number) => setCurrentPage(pageNum);

  return (
    <>
      <SendersWrapper>
        <div className="content-top">
          <div>
            <h1>Meus remetentes</h1>
            <p>Acompanhe e gerencie seus remetentes cadastrados</p>
          </div>
          <div className="select-item">
            <select defaultValue="TEXT">
              <option value="register">Cadastrar remetente</option>
              <option value="exclude">Excluir remetentes</option>
            </select>
            <BsChevronDown />
          </div>
        </div>
        {senders?.length >= 1 ? (
          <Table
            itemsTotalPerPage={itemsPerPage}
            totalItems={senders.length}
            paginate={paginate}>
            <table className="widgetLgTable">
              <tr className="widgetLgTr">
                <th className="widgetLgTh">Nome</th>
                <th className="widgetLgTh">Email</th>
                <th className="widgetLgTh">Status</th>
                <th className="widgetLgTh">Editar</th>
              </tr>
              {currentSenders.map((sender: SendersProps) => (
                <tr key={sender.id} className="widgetLgTr">
                  <td className="widgetLgUser">
                    <span className="widgetLgName">{sender.title}</span>
                  </td>
                  <td className="widgetLgDate">{sender.email}</td>
                  <td
                    className={`widgetLgStatus ${sender.status ? 'active' : 'disabled'
                      }`}>
                    {sender.status ? 'Active' : 'Inativo'}
                  </td>
                  <td className="widgetLgMenu">
                    <FiMenu />
                  </td>
                </tr>
              ))}
            </table>
          </Table>
        ) : (
          <div className="without-leads-msg">
            <h1>Você ainda não possuí nenhum remetente cadastrado</h1>
            <strong onClick={() => setActiveModalCreate(true)}>
              Cadastrar remetente
            </strong>
          </div>
        )}
        {activeModalCreate && (
          <button
            className="btn-close-modal"
            onClick={() => setActiveModalCreate(active => !active)}>
            <RiCloseFill />
          </button>
        )}
      </SendersWrapper>
      {activeModalCreate && (
        <Modal
          animation={{
            initial: {
              opacity: 0,
              x: 60,
            },
            animate: {
              opacity: 1,
              x: 0,
              transition: { type: 'spring' },
            },
            exit: {
              opacity: 0,
              transition: { duration: 0.6 },
            },
          }}>
          <SenderForm>
            <div className="intro">
              <h1>Criar remetente</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium fuga est voluptas maxime.
              </p>
            </div>
            <div className="form-wrapper">
              <h1>Criar remetente</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium fuga est voluptas maxime.
              </p>
              <form onSubmit={handleSubmit}>
                <Input
                  label="Nome"
                  placeholder="Informe o nome do lead"
                  mask=""
                  error={error.title ? error.title : ''}
                  value={title}
                  setState={setTitle}
                />
                <Input
                  label="Email *"
                  placeholder="Informe o email do lead"
                  mask=""
                  error={error.email ? error.email : ''}
                  value={email}
                  setState={setEmail}
                />
                <button type="submit">Criar remetente</button>
              </form>
            </div>
          </SenderForm>
        </Modal>
      )}
    </>
  );
};

export default Senders;
