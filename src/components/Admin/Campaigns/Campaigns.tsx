import React, { useState, useContext, useEffect } from 'react';
import * as Yup from 'yup';
import { FiMenu, FiSearch, FiSend } from 'react-icons/fi';
import { BsChevronDown, BsPlus } from 'react-icons/bs';
import { CampaignsWrapper, SendButton, CampaignForm } from './CampaignsStyles';
import { RiCloseFill } from 'react-icons/ri';
import Table from '../Helpers/Table/Table';
import Modal from '../Helpers/Modals/Modal/Modal';
import Editor from '../Helpers/Editor/TemplateBuilder';
import useFetcher from '../../hooks/useSwr';
import Input from '../Helpers/Input/Input';
import { campaignValidation } from '../validations/campaign';
import { getAPIClient } from '../../../services/api';
import { useRouter } from 'next/router';
import { AdminContext } from '../../../context/adminContext';
import { compileHTMLContent } from '../utils/compileHtml';
import ModalAlert from '../Helpers/Modals/ModalAlert/ModalAlert';
import ModalConfirm from '../Helpers/Modals/ModalConfirm/ModalConfirm';
import { refreshData } from '../utils/refreshData';

interface CampaignsProps {
  id: number;
  name: string;
  segmentId: string;
  senderId: string;
  subject: string;
  content: string;
  segments: string[];
  createAt: Date;
  status: string;
}

interface Error {
  segmentId: string;
  senderId: string;
  name: string;
  subject: string;
  content: string;
}

interface Props {
  segments: any[];
  senders: any[];
}

const Campaigns: React.FC<Props> = ({ segments }) => {
  const router = useRouter();

  const [activeModalSend, setActiveModalSend] = useState(false);
  const [activeModalCreate, setActiveModalCreate] = useState(false);
  const [activeModalEdit, setActiveModalEdit] = useState(false);

  const [itemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignsArr, setCampainsArr] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState([]);
  const [alertPopup, setAlertPopup] = useState(false);
  const [alertConfirm, setAlertConfirm] = useState(false);
  const [alertBody, setAlertBody] = useState('');

  const [segmentId, setSegment] = useState('');
  const [senderId, setSender] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [campaignData, setCampaignData] = useState<CampaignsProps>(
    {} as CampaignsProps,
  );

  const [error, setError] = useState<Error>({} as Error);

  const { token, user } = useContext(AdminContext);

  const { data: campaigns } = useFetcher('/campaign/listAll', {
    user: user.id,
    token,
  });

  const handleAddCamps = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCampainsArr(camp => Array.from(new Set([...camp, value])));
  };

  const handleSendCampaign = async (e: React.FormEvent) => {
    e.preventDefault();

    const keys = {
      username: 'Guilherme',
      email: 'gabreu@gmail.com',
      business: 'slideworks',
      phone: '(11) 98544-9540',
    };

    try {
      const data = {
        name,
        subject,
        content: compileHTMLContent({ content, data: keys }),
        senderId: 2,
        segmentId,
      };

      await campaignValidation.validate(data, {
        abortEarly: false,
      });

      getAPIClient()
        .post(`/campaign/create/`, data, {
          headers: {
            userid: user.id,
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setName('');
          setSender('');
          setSegment('');
          setSubject('');
          setContent('');
          setActiveModalCreate(false);

          setAlertBody('Campanha criada com sucesso');
          setAlertPopup(true);

          setTimeout(() => {
            setAlertPopup(false);
          }, 2000);
        })
        .catch(err => {
          setAlertBody('Erro ao criar campanha, tente novamente mais tarde');
          setAlertPopup(true);

          setTimeout(() => {
            setAlertPopup(false);
          }, 2000);
        });
    } catch (err) {
      let errors: any = [];
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error: Yup.ValidationError) => {
          errors = [error.path, error.message];
        });
      }

      setError({
        name: errors[0] === 'name' ? errors[1] : '',
        senderId: errors[0] === 'senderId' ? errors[1] : '',
        segmentId: errors[0] === 'segmentId' ? errors[1] : '',
        subject: errors[0] === 'subject' ? errors[1] : '',
        content: errors[0] === 'content' ? errors[1] : '',
      });
    }
  };

  const handleDeleteCampaign = async (campaign: number) => {
    getAPIClient()
      .delete(`/campaign/delete/${campaign}`, {
        headers: {
          userid: user.id,
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAlertBody('Campanha deletada com sucesso');
        setAlertPopup(true);

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      })
      .catch(() => {
        setAlertBody('Erro ao deletar campanha, tente novamente mais tarde');
        setAlertPopup(true);

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      });
  };

  const handleUpdateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        segmentId: segmentId ? segmentId : 73,
        name: name ? name : campaignData.name,
        senderId: senderId ? senderId : campaignData.senderId,
        subject: subject ? subject : campaignData.subject,
        content: content ? content : campaignData.content,
      };

      await campaignValidation.validate(data, {
        abortEarly: false,
      });

      getAPIClient()
        .put(`/campaign/update/${campaignData.id}`, data, {
          headers: {
            userid: user.id,
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setName('');
          setSender('');
          setSegment('');
          setSubject('');
          setContent('');
          setActiveModalEdit(false);

          setAlertBody('Campanha atualizada com sucesso');
          setAlertPopup(true);
          refreshData();

          setTimeout(() => {
            setAlertPopup(false);
          }, 2000);
        })
        .catch(err => {
          setAlertBody(
            'Erro ao atualizar campanha, tente novamente mais tarde.',
          );
          setAlertPopup(true);

          setTimeout(() => {
            setAlertPopup(false);
          }, 2000);
        });
    } catch (err) {
      let errors: any = [];
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error: Yup.ValidationError) => {
          errors = [error.path, error.message];
        });
      }

      setError({
        name: errors[0] === 'name' ? errors[1] : '',
        senderId: errors[0] === 'senderId' ? errors[1] : '',
        segmentId: errors[0] === 'segmentId' ? errors[1] : '',
        subject: errors[0] === 'subject' ? errors[1] : '',
        content: errors[0] === 'content' ? errors[1] : '',
      });
    }
  };

  const handleDeleteAllCampaigns = async () => {
    setAlertConfirm(false);

    getAPIClient()
      .delete(`/campaign/deleteMany`, {
        data: { campaigns },
        headers: {
          userid: user.id,
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAlertBody('Campanhas deletadas com sucesso');
        setAlertPopup(true);
        refreshData();

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      })
      .catch(() => {
        setAlertBody('Erro ao deletar campanhas, tente novamente mais tarde.');
        setAlertPopup(true);

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      });
  };

  const handleChangeStatus = async (campaign: number, status: string) => {
    const campaignStatus = status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';

    getAPIClient()
      .put(
        `/campaign/update/${campaign}`,
        {
          status: campaignStatus,
        },
        {
          headers: {
            userid: user.id,
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        setAlertBody('Status atualizado com sucesso');
        setAlertPopup(true);

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      })
      .catch(() => {
        setAlertBody('Erro ao atualizar status, tente novamente mais tarde');
        setAlertPopup(true);

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      });
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = event.target.value;

    if (selectValue === 'create') {
      setActiveModalCreate(true);
    }

    if (selectValue === 'deleteMany') {
      setAlertConfirm(true);
    }
  };

  useEffect(() => {
    const findContacts = campaigns?.filter(({ name }: { name: string }) =>
      name.toLocaleLowerCase().includes(search),
    );
    setSearchFilter(findContacts);
  }, [campaigns, search, setSearch]);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentCampaigns =
    searchFilter?.length >= 1
      ? searchFilter?.slice(indexOfFirstPost, indexOfLastPost)
      : campaigns?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNum: number) => setCurrentPage(pageNum);

  return (
    <>
      <CampaignsWrapper>
        <div className="content-top">
          <div>
            <h1>Minhas campanhas <small>{campaigns?.length >= 1 && `${campaigns?.length} campanhas cadastradas`}</small></h1>
            <p>Acompanhe e gerencie suas campanhas cadastrados</p>
          </div>
          <div className="filters-wrapper">
            <div className="input-search-wrapper">
              <FiSearch />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value.toLocaleLowerCase())}
                placeholder="Digite aqui..."
              />
            </div>
            <div className="select-item">
              <select onChange={handleSelect} value="default">
                <option value="default" disabled>
                  Ações
                </option>
                <option value="create">Cadastrar campanha</option>
                <option value="deleteMany">Excluir em massa</option>
              </select>
              <BsChevronDown />
            </div>
          </div>
        </div>
        {campaigns?.length >= 1 ? (
          <Table
            itemsTotalPerPage={itemsPerPage}
            totalItems={campaigns.length}
            paginate={paginate}>
            <table className="widgetLgTable">
              <tr className="widgetLgTr">
                <th className="widgetLgTh">Nome</th>
                <th className="widgetLgTh">Remetente</th>
                {/* <th className="widgetLgTh">Listas</th> */}
                {/* <th className="widgetLgTh">Criado</th> */}
                <th className="widgetLgTh">Status</th>
                <th className="widgetLgTh">Editar</th>
              </tr>
              {currentCampaigns.map((campaign: CampaignsProps) => (
                <tr key={campaign.id} className="widgetLgTr">
                  <td className="widgetLgUser">
                    <span className="widgetLgName">{campaign.name}</span>
                  </td>
                  <td className="widgetLgDate">{campaign.senderId}</td>
                  {/* <td className="widgetLgAmount">{campaign.segments.length}</td> */}
                  {/* <td className="widgetLgAmount">{campaign.createAt}</td> */}
                  <td
                    onClick={() =>
                      handleChangeStatus(
                        campaign.id as number,
                        campaign.status as string,
                      )
                    }
                    className={`widgetLgStatus ${campaign.status === 'ACTIVE' ? 'active' : 'disabled'
                      }`}>
                    {campaign.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                  </td>
                  <td className="widgetLgMenu">
                    <FiMenu />
                    <div className="modal-actions">
                      <span onClick={() => handleDeleteCampaign(campaign.id)}>
                        Excluir campanha
                      </span>
                      <span
                        onClick={() => {
                          setCampaignData(campaign);
                          setActiveModalEdit(true);
                        }}>
                        Editar campanha
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </table>
          </Table>
        ) : (
          <div className="without-leads-msg">
            <h1>Você ainda não possuí nenhuma campanha cadastrado</h1>
            <strong onClick={() => setActiveModalCreate(true)}>
              Cadastrar campanha
            </strong>
          </div>
        )}
        <SendButton
          onClick={() => {
            !activeModalCreate
              ? setActiveModalSend(active => !active)
              : setActiveModalCreate(active => !active);
          }}>
          {activeModalSend || activeModalCreate ? <RiCloseFill /> : <FiSend />}
        </SendButton>
        {activeModalEdit && (
          <button
            className="btn-close-modal"
            onClick={() => setActiveModalEdit(active => !active)}>
            <RiCloseFill />
          </button>
        )}
      </CampaignsWrapper>
      {activeModalSend && (
        <Modal
          animation={{
            initial: {
              opacity: 0,
            },
            animate: {
              opacity: 1,
              transition: { type: 'spring' },
            },
            exit: {
              opacity: 0,
              transition: { duration: 0.6 },
            },
          }}>
          <CampaignForm send>
            <h1>Enviar campanha</h1>
            <p>
              Dúvidas de como enviar uma campanha? Consulte a{' '}
              <strong>Documentação</strong>
            </p>
            <div className="form-wrapper">
              <form>
                <label>
                  {campaigns.length <= 0
                    ? 'Você ainda não criou nenhuma campanha'
                    : 'Campanha *'}
                </label>
                {campaigns?.length >= 1 && (
                  <>
                    <select onChange={handleAddCamps}>
                      <option value="default" disabled>
                        Escolha uma campanha
                      </option>
                      {campaigns.map((campaign: CampaignsProps) => (
                        <option key={campaign.id} value={campaign.name}>
                          {campaign.name}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                <label>
                  {segments.length <= 0
                    ? 'Você ainda não criou nenhuma lista'
                    : 'Lista *'}
                </label>
                {segments.length >= 1 && (
                  <>
                    <select value="default" onChange={e => ''}>
                      <option value="default" disabled>
                        Escolha uma lista
                      </option>
                      {segments.map(list => (
                        <option key={list.id} value={list.id}>
                          {list.title}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                <button type="submit">Enviar campanha</button>
              </form>
            </div>
          </CampaignForm>
        </Modal>
      )}
      {activeModalCreate && (
        <Modal
          height={100}
          width={110}
          animation={{
            initial: {
              opacity: 0,
            },
            animate: {
              opacity: 1,
              transition: { type: 'spring' },
            },
            exit: {
              opacity: 0,
              transition: { duration: 0.6 },
            },
          }}>
          <CampaignForm create>
            <div className="form-wrapper">
              <form onSubmit={handleSendCampaign}>
                <Input
                  label="Título da campanha *"
                  placeholder="Informe o titulo da campanha"
                  error={error.name}
                  mask=""
                  value={name}
                  setState={setName}
                />
                <label>Remetente</label>
                <select onChange={e => setSender(e.target.value)}>
                  <option value="">Teste</option>
                  <option value="email@email.com">email@email.com</option>
                </select>
                <label>
                  {segments.length <= 0
                    ? 'Você ainda não criou nenhuma lista'
                    : 'Lista *'}
                </label>
                {segments.length >= 1 && (
                  <>
                    <select
                      required
                      value="default"
                      onChange={e => setSegment(e.target.value)}>
                      <option value="default" disabled>
                        Escolha uma lista
                      </option>
                      {segments.map(list => (
                        <option key={list.id} value={list.id}>
                          {list.title}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                <Input
                  label="Assunto da campanha *"
                  placeholder="Informe o assunto da campanha"
                  error={error.subject}
                  mask=""
                  value={subject}
                  setState={setSubject}
                />
                <label>Conteudo da campanha *</label>
                <Editor setContent={setContent} />
                <button type="submit">Criar campanha</button>
              </form>
            </div>
          </CampaignForm>
        </Modal>
      )}
      {activeModalEdit && (
        <Modal
          height={100}
          width={110}
          animation={{
            initial: {
              opacity: 0,
            },
            animate: {
              opacity: 1,
              transition: { type: 'spring' },
            },
            exit: {
              opacity: 0,
              transition: { duration: 0.6 },
            },
          }}>
          <CampaignForm create>
            <div className="form-wrapper">
              <form onSubmit={handleUpdateCampaign}>
                <Input
                  label="Título da campanha *"
                  placeholder={campaignData.name}
                  error={error.name}
                  mask=""
                  value={name}
                  setState={setName}
                />
                <label>Remetente</label>
                <select onChange={e => setSender(e.target.value)}>
                  <option value="">Teste</option>
                  <option value="email@email.com">email@email.com</option>
                </select>
                <label>
                  {segments.length <= 0
                    ? 'Você ainda não criou nenhuma lista'
                    : 'Lista *'}
                </label>
                {segments.length >= 1 && (
                  <>
                    <select
                      required
                      value="default"
                      onChange={e => setSegment(e.target.value)}>
                      <option value="default" disabled>
                        Escolha uma lista
                      </option>
                      {segments.map(list => (
                        <option key={list.id} value={list.id}>
                          {list.title}
                        </option>
                      ))}
                    </select>
                  </>
                )}
                <Input
                  label="Assunto da campanha *"
                  placeholder="Informe o assunto da campanha"
                  error={error.subject}
                  mask=""
                  value={subject}
                  setState={setSubject}
                />
                <label>Conteudo da campanha *</label>
                <Editor defaultValue={campaignData.content} />
                <button type="submit">Editar campanha</button>
              </form>
            </div>
          </CampaignForm>
        </Modal>
      )}
      {alertPopup && (
        <ModalAlert>
          <h3>{alertBody}</h3>
        </ModalAlert>
      )}
      {alertConfirm && (
        <ModalConfirm
          content="Tem certeza que deseja fazer isso?"
          close={setAlertConfirm}
          execute={handleDeleteAllCampaigns}
        />
      )}
    </>
  );
};

export default Campaigns;
