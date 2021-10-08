import React, {useState, useContext} from 'react';
import * as Yup from 'yup';
import {FiMenu, FiSend} from 'react-icons/fi';
import {BsChevronDown, BsPlus} from 'react-icons/bs';
import {CampaignsWrapper, SendButton, CampaignForm} from './CampaignsStyles';
import {RiCloseFill} from 'react-icons/ri';
import Table from '../Helpers/Table/Table';
import Modal from '../Helpers/Modals/Modal/Modal';
import Editor from '../Helpers/Editor/TemplateBuilder';
import useFetcher from '../../hooks/useSwr';
import Input from '../Helpers/Input/Input';
import {campaignValidation} from '../validations/campaign';
import {getAPIClient} from '../../../services/api';
import {useRouter} from 'next/router';
import {AdminContext} from '../../../context/adminContext';

interface CampaignsProps {
  id: number;
  name: string;
  to: string;
  from: string;
  subject: string;
  content: string;
  description: string;
  segments: string[];
  createAt: Date;
  status: string;
}

interface Error {
  to: string;
  from: string;
  name: string;
  subject: string;
  content: string;
}

interface Props {
  segments: any[];
  senders: any[];
}

const Campaigns: React.FC<Props> = ({segments}) => {
  const router = useRouter();

  const [activeModalSend, setActiveModalSend] = useState(false);
  const [activeModalCreate, setActiveModalCreate] = useState(false);
  const [activeModalEdit, setActiveModalEdit] = useState(false);

  const [itemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignsArr, setCampainsArr] = useState<string[]>([]);

  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [campaignData, setCampaignData] = useState<CampaignsProps>(
    {} as CampaignsProps,
  );

  const [error, setError] = useState<Error>({} as Error);

  const {token, user} = useContext(AdminContext);

  const {data: campaigns} = useFetcher('/campaign/listAll', {
    user: user.id,
    token,
  });

  const handleAddCamps = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCampainsArr(camp => Array.from(new Set([...camp, value])));
  };

  const handleSendCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        name,
        from,
        to,
        subject,
        content,
        description,
      };

      await campaignValidation.validate(data, {
        abortEarly: false,
      });

      await getAPIClient()
        .post(`/campaign/create/`, data, {
          headers: {
            userid: user.id,
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setName('');
          setFrom('');
          setTo('');
          setSubject('');
          setContent('');
          setActiveModalCreate(false);
          console.log(res);
        })
        .catch(err => console.log(err));
    } catch (err) {
      let errors: any = [];
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error: Yup.ValidationError) => {
          errors = [error.path, error.message];
        });
      }
      console.log(errors);

      setError({
        name: errors[0] === 'name' ? errors[1] : '',
        from: errors[0] === 'from' ? errors[1] : '',
        to: errors[0] === 'to' ? errors[1] : '',
        subject: errors[0] === 'subject' ? errors[1] : '',
        content: errors[0] === 'content' ? errors[1] : '',
      });
    }
  };

  const handleDeleteCampaign = async (campaign: number) => {
    try {
      await getAPIClient().delete(`/campaign/delete/${campaign}`, {
        headers: {
          userid: user.id,
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      alert('Erro ao deletar lista, tente novamente');
    }
  };

  const handleUpdateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        to: to ? to : 'email1@email.com',
        name: name ? name : campaignData.name,
        from: from ? from : campaignData.from,
        subject: subject ? subject : campaignData.subject,
        content: content ? content : campaignData.content,
        description: description ? description : campaignData.description,
      };

      await campaignValidation.validate(data, {
        abortEarly: false,
      });

      await getAPIClient()
        .put(`/campaign/update`, data, {
          headers: {
            userid: user.id,
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          setName('');
          setFrom('');
          setTo('');
          setSubject('');
          setContent('');
          setActiveModalEdit(false);
        })
        .catch(err => console.log(err));
    } catch (err) {
      let errors: any = [];
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error: Yup.ValidationError) => {
          errors = [error.path, error.message];
        });
      }

      setError({
        name: errors[0] === 'name' ? errors[1] : '',
        from: errors[0] === 'from' ? errors[1] : '',
        to: errors[0] === 'to' ? errors[1] : '',
        subject: errors[0] === 'subject' ? errors[1] : '',
        content: errors[0] === 'content' ? errors[1] : '',
      });
    }
  };

  const handleChangeStatus = async (campaign: number, status: string) => {
    if (status === 'ACTIVE') {
      await getAPIClient().put(
        `/campaign/update/${campaign}`,
        {
          status: 'DISABLED',
        },
        {
          headers: {
            userid: user.id,
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }
    if (status === 'DISABLED') {
      await getAPIClient().put(
        `/campaign/update/${campaign}`,
        {
          status: 'ACTIVE',
        },
        {
          headers: {
            userid: user.id,
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = event.target.value;

    if (selectValue === 'create') {
      setActiveModalCreate(true);
    }
  };

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentCampaigns = campaigns?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNum: number) => setCurrentPage(pageNum);
  const nextPage = () => setCurrentPage(currentPage => currentPage + 1);
  const prevPage = () =>
    setCurrentPage(currentPage => (currentPage === 1 ? 1 : currentPage - 1));

  return (
    <>
      <CampaignsWrapper>
        <div className="content-top">
          <div>
            <h1>Minhas campanhas</h1>
            <p>Acompanhe e gerencie suas campanhas cadastrados</p>
          </div>
          <div className="select-item">
            <select onChange={handleSelect} value="default">
              <option value="default" disabled>
                Ações
              </option>
              <option value="create">Cadastrar campanha</option>
              <option value="delete">Excluir em massa</option>
            </select>
            <BsChevronDown />
          </div>
        </div>
        {campaigns?.length >= 1 ? (
          <Table
            itemsTotalPerPage={itemsPerPage}
            totalItems={campaigns.length}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={currentPage}>
            <table className="widgetLgTable">
              <tr className="widgetLgTr">
                <th className="widgetLgTh">Nome</th>
                <th className="widgetLgTh">Enviado por</th>
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
                  <td className="widgetLgDate">{campaign.from}</td>
                  {/* <td className="widgetLgAmount">{campaign.segments.length}</td> */}
                  {/* <td className="widgetLgAmount">{campaign.createAt}</td> */}
                  <td
                    onClick={() =>
                      handleChangeStatus(
                        campaign.id as number,
                        campaign.status as string,
                      )
                    }
                    className={`widgetLgStatus ${
                      campaign.status === 'ACTIVE' ? 'active' : 'disabled'
                    }`}>
                    {campaign.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                  </td>
                  <td className="widgetLgMenu">
                    <FiMenu />
                    <div className="modal-actions">
                      <span onClick={() => handleDeleteCampaign(campaign.id)}>
                        Excluir lead
                      </span>
                      <span
                        onClick={() => {
                          setCampaignData(campaign);
                          setActiveModalEdit(true);
                        }}>
                        Editar lead
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
              x: 60,
            },
            animate: {
              opacity: 1,
              x: 0,
              transition: {type: 'spring'},
            },
            exit: {
              opacity: 0,
              transition: {duration: 0.6},
            },
          }}>
          <CampaignForm send>
            <div className="intro">
              <h1>Como enviar campanhas</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                aspernatur beatae tempora.
              </p>
            </div>
            <div className="form-wrapper">
              <h1>Enviar campanhas</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                aspernatur beatae tempora.
              </p>
              <form>
                <label>
                  {campaigns.length <= 0
                    ? 'Você ainda não criou nenhuma campanha'
                    : 'Campanha *'}{' '}
                  <button>
                    <BsPlus /> Nova campanha
                  </button>
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
                    : 'Lista *'}{' '}
                  <button>
                    <BsPlus /> Nova lista
                  </button>
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
          animation={{
            initial: {
              opacity: 0,
              x: 60,
            },
            animate: {
              opacity: 1,
              x: 0,
              transition: {type: 'spring'},
            },
            exit: {
              opacity: 0,
              transition: {duration: 0.6},
            },
          }}>
          <CampaignForm create>
            <div className="intro">
              <h1>Como criar sua campanha</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                perferendis, quam rem fugiat doloribus non itaque ea possimus
                alias repudiandae? Suscipit delectus architecto quasi temporibus
                aut incidunt ab beatae in?
              </p>
            </div>
            <div className="form-wrapper">
              <h1>Criar campanha</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                aspernatur beatae tempora.
              </p>
              <form onSubmit={handleSendCampaign}>
                <Input
                  label="Título da campanha *"
                  placeholder="Informe o titulo da campanha"
                  error={error.name}
                  mask=""
                  value={name}
                  setState={setName}
                />
                <Input
                  label="Descrição da campanha *"
                  placeholder="Informe a descrição da campanha"
                  error=""
                  mask=""
                  value={description}
                  setState={setDescription}
                />
                <label>Remetente</label>
                <select onChange={e => setFrom(e.target.value)}>
                  <option value="">Teste</option>
                  <option value="email@email.com">email@email.com</option>
                </select>
                <label>
                  {segments.length <= 0
                    ? 'Você ainda não criou nenhuma lista'
                    : 'Lista *'}{' '}
                  <button>
                    <BsPlus /> Nova lista
                  </button>
                </label>
                {segments.length >= 1 && (
                  <>
                    <select
                      required
                      value="default"
                      onChange={e => setTo(e.target.value)}>
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
                <strong className="btn-use-template">
                  Escolher um template
                </strong>
                <br />
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
          animation={{
            initial: {
              opacity: 0,
              x: 60,
            },
            animate: {
              opacity: 1,
              x: 0,
              transition: {type: 'spring'},
            },
            exit: {
              opacity: 0,
              transition: {duration: 0.6},
            },
          }}>
          <CampaignForm create>
            <div className="intro">
              <h1>Como editar campanha</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                aspernatur beatae tempora.
              </p>
            </div>
            <div className="form-wrapper">
              <h1>Editar campanha</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                aspernatur beatae tempora.
              </p>
              <form onSubmit={handleUpdateCampaign}>
                <Input
                  label="Título da campanha *"
                  placeholder={campaignData.name}
                  error={error.name}
                  mask=""
                  value={name}
                  setState={setName}
                />
                <Input
                  label="Descrição da campanha *"
                  placeholder={campaignData.description}
                  error=""
                  mask=""
                  value={description}
                  setState={setDescription}
                />
                <label>Remetente</label>
                <select onChange={e => setFrom(e.target.value)}>
                  <option value="">Teste</option>
                  <option value="email@email.com">email@email.com</option>
                </select>
                <label>
                  {segments.length <= 0
                    ? 'Você ainda não criou nenhuma lista'
                    : 'Lista *'}{' '}
                  <button>
                    <BsPlus /> Nova lista
                  </button>
                </label>
                {segments.length >= 1 && (
                  <>
                    <select
                      required
                      value="default"
                      onChange={e => setTo(e.target.value)}>
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
                <strong className="btn-use-template">
                  Escolher um template
                </strong>
                <br />
                <Input
                  label="Assunto da campanha *"
                  placeholder="Informe o assunto da campanha"
                  error={error.subject}
                  mask=""
                  value={subject}
                  setState={setSubject}
                />
                <label>Conteudo da campanha *</label>
                <Editor />
                <button type="submit">Editar campanha</button>
              </form>
            </div>
          </CampaignForm>
        </Modal>
      )}
    </>
  );
};

export default Campaigns;
