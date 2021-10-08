import React, {useState, useContext} from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import {FiMenu} from 'react-icons/fi';
import {BsChevronDown, BsPlus, BsArrowRight} from 'react-icons/bs';
import {RiCloseFill} from 'react-icons/ri';
import {LeadsWrapper, LeadForm} from './LeadsStyles';
import Table from '../Helpers/Table/Table';
import Modal from '../Helpers/Modals/Modal/Modal';
import ModalAlert from '../Helpers/Modals/ModalAlert/ModalAlert';
import Input from '../Helpers/Input/Input';
import {leadEditValidation, leadValidation} from '../validations/leads';
import {getAPIClient} from '../../../services/api';
import useFetcher from '../../hooks/useSwr';
import {useRouter} from 'next/router';
import {AdminContext} from '../../../context/adminContext';
import ModalConfirm from '../Helpers/Modals/ModalConfirm/ModalConfirm';
import {refreshData} from '../utils/refreshData';

interface LeadsProps {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  business?: string;
  segmentId?: string;
  segment?: {
    id?: string;
    title?: string;
  };
  status?: string;
}

interface Error extends Omit<LeadsProps, 'id' | 'business' | 'status'> {
  invalidFile?: string;
}

interface Props {
  segments: any[];
}

const Leads: React.FC<Props> = ({segments}) => {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const [activeModalCreate, setActiveModalCreate] = useState(false);
  const [activeModalImport, setActiveModalImport] = useState(false);
  const [activeModalEdit, setActiveModalEdit] = useState(false);
  const [alertPopup, setAlertPopup] = useState(false);
  const [alertConfirm, setAlertConfirm] = useState(false);
  const [alertBody, setAlertBody] = useState('');
  const [service, setService] = useState('send-email');

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [segmentId, setSegment] = useState<number | null>(0);
  const [business, setBusiness] = useState<string>('');
  const [fileLead, setFileLead] = useState<FileList>({} as FileList);
  const [leadData, setLeadData] = useState<LeadsProps>({} as LeadsProps);

  const [error, setError] = useState<Error>({} as Error);

  const {token, user, setRoute} = useContext(AdminContext);

  const {data: leads} = useFetcher('/lead/listAll', {
    user: user.id,
    token,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let data = {};

      if (service === 'cold-emails') {
        data = {
          name,
          email,
          phone,
          business,
          segmentId,
        };
      }

      if (service === 'send-email') {
        data = {
          email,
          segmentId: segmentId ? segmentId : '',
        };
      }

      await leadValidation.validate(data, {
        abortEarly: false,
      });

      const typeModel =
        service === 'cold-emails' ? 'cold-emails' : 'send-email';

      await getAPIClient()
        .post(`/lead/create`, data, {
          headers: {
            userid: user.id,
            typemodel: typeModel,
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setName('');
          setEmail('');
          setPhone('');
          setSegment(null);
          setBusiness('');
          setActiveModalCreate(false);
          setAlertBody('Email cadastrado com sucesso');
          setAlertPopup(true);
          refreshData();

          setTimeout(() => {
            setAlertPopup(false);
          }, 2000);
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
        email: errors[0] === 'email' ? errors[1] : '',
        segmentId: errors[0] === 'segmentId' ? errors[1] : '',
      });
    }
  };

  const handleChangeFile = (element: HTMLInputElement) => {
    const file = element.files as FileList;

    if (file[0].type !== 'text/csv') {
      setError({
        invalidFile: 'Tipo de arquivo inválido',
      });
      return null;
    }
    setError({});
    setFileLead(file);
  };

  const handleImportLeads = async () => {
    if (!fileLead[0] || fileLead[0] === null) {
      alert('Arquivo não encontrado, tente novamente');
      return null;
    }

    const formData = new FormData();
    formData.append('file', fileLead[0]);

    const typeModel = service === 'cold-emails' ? 'cold-emails' : 'send-email';

    getAPIClient()
      .post(`/lead/import`, formData, {
        headers: {
          userid: user.id,
          typemodel: typeModel,
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log(res);
        setActiveModalImport(false);
        setAlertBody('Emails cadastrados com sucesso');
        setAlertPopup(true);
        refreshData();

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      })
      .catch(err => {
        console.log(err);
        setAlertBody('Erro ao cadastrar emails, tente novamente mais tarde');
        setAlertPopup(true);

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      });
  };

  const handleDeleteLead = async (lead: number) => {
    getAPIClient()
      .delete(`/lead/delete/${lead}`, {
        headers: {
          userid: user.id,
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAlertBody('Email deletado com sucesso');
        setAlertPopup(true);
        refreshData();

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      })
      .catch(() => {
        setAlertBody('Erro ao deletar lead, tente novamento mais tarde');
        setAlertPopup(true);

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      });
  };

  const handleChangeStatus = async (lead: number, status: string) => {
    const leadStatus = status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';
    getAPIClient()
      .put(
        `/lead/update/${lead}`,
        {
          status: leadStatus,
        },
        {
          headers: {
            userid: user.id,
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        setAlertBody('Email atualizado com sucesso');
        setAlertPopup(true);

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      })
      .catch(() => {
        setAlertBody('Erro ao atualizar email, tente novamente mais tarde');
        setAlertPopup(true);

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      });
  };

  const handleEditLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        name: name ? name : leadData.name,
        email: email ? email : leadData.email,
        phone: phone ? phone : leadData.phone,
        business: business ? business : leadData.business,
        segmentId: segmentId ? segmentId : leadData.segmentId,
      };

      await leadEditValidation.validate(data, {
        abortEarly: false,
      });

      getAPIClient()
        .put(`/lead/update/${leadData.id}`, data, {
          headers: {
            userid: user.id,
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setName('');
          setEmail('');
          setPhone('');
          setSegment(null);
          setBusiness('');
          setActiveModalEdit(false);
          setAlertBody('Email atualizado com sucesso');
          setAlertPopup(true);
          refreshData();

          setTimeout(() => {
            setAlertPopup(false);
          }, 2000);
        })
        .catch(() => {
          setAlertBody('Erro ao atualizar email, tente novamente mais tarde.');
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
        email: errors[0] === 'email' ? errors[1] : '',
        segmentId: errors[0] === 'segmentId' ? errors[1] : '',
      });
    }
  };

  const handleDeleteAllLeads = async () => {
    setAlertConfirm(false);

    getAPIClient()
      .delete(`/lead/deleteMany`, {
        data: {leads},
        headers: {
          userid: user.id,
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAlertBody('Emails deletados com sucesso');
        setAlertPopup(true);
        refreshData();

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      })
      .catch(() => {
        setAlertBody('Erro ao deletar emails, tente novamente mais tarde.');
        setAlertPopup(true);

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      });
  };

  const handleDownloadCSVModel = async () => {
    await axios.post('/api/csvModel');
  };

  const handleSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = event.target.value;

    if (selectValue === 'create') {
      setActiveModalCreate(true);
    }

    if (selectValue === 'import') {
      setActiveModalImport(true);
    }

    if (selectValue === 'delete') {
      setAlertConfirm(true);
    }
  };

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentLeads = leads?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNum: number) => setCurrentPage(pageNum);
  const nextPage = () => setCurrentPage(currentPage => currentPage + 1);
  const prevPage = () =>
    setCurrentPage(currentPage => (currentPage === 1 ? 1 : currentPage - 1));

  return (
    <>
      <LeadsWrapper>
        <div className="content-top">
          <div>
            <h1>Meus leads</h1>
            <p>Acompanhe e gerencie seus leads cadastrados</p>
          </div>
          <div className="select-item">
            <select onChange={handleSelect} value="default">
              <option value="default" disabled>
                Ações
              </option>
              <option value="create">Cadastrar lead</option>
              <option value="import">Importar leads</option>
              <option value="delete">Excluir lead em massa</option>
            </select>
            <BsChevronDown />
          </div>
        </div>
        {leads?.length >= 1 ? (
          <Table
            itemsTotalPerPage={itemsPerPage}
            totalItems={leads.length}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={currentPage}>
            <table className="widgetLgTable">
              <tr className="widgetLgTr">
                <th className="widgetLgTh">Nome</th>
                <th className="widgetLgTh">Email</th>
                <th className="widgetLgTh">Telefone</th>
                <th className="widgetLgTh">Empresa</th>
                <th className="widgetLgTh">Status</th>
                <th className="widgetLgTh">Editar</th>
              </tr>
              {currentLeads.map((lead: LeadsProps) => (
                <tr key={lead.id} className="widgetLgTr">
                  <td className="widgetLgUser">
                    <span className="widgetLgName">{lead.name}</span>
                  </td>
                  <td className="widgetLgDate">{lead.email}</td>
                  <td className="widgetLgAmount">{lead.phone}</td>
                  <td className="widgetLgAmount">{lead.business}</td>
                  <td
                    onClick={() =>
                      handleChangeStatus(
                        lead.id as number,
                        lead.status as string,
                      )
                    }
                    className={`widgetLgStatus ${
                      lead.status === 'ACTIVE' ? 'active' : 'disabled'
                    }`}>
                    {lead.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                  </td>
                  <td className="widgetLgMenu">
                    <FiMenu />
                    <div className="modal-actions">
                      <span onClick={() => handleDeleteLead(lead.id as number)}>
                        Excluir lead
                      </span>
                      <span
                        onClick={() => {
                          setLeadData(lead);
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
            <h1>Você ainda não possuí nenhum lead cadastrado</h1>
            <div style={{display: 'flex', alignItems: 'center', gap: 9}}>
              <strong onClick={() => setActiveModalCreate(true)}>
                Cadastrar lead
              </strong>
              <strong>|</strong>
              <strong onClick={() => setActiveModalImport(true)}>
                Importar leads
              </strong>
            </div>
          </div>
        )}
        {activeModalCreate && (
          <button
            className="btn-close-modal"
            onClick={() => setActiveModalCreate(active => !active)}>
            <RiCloseFill />
          </button>
        )}
        {activeModalImport && (
          <button
            className="btn-close-modal"
            onClick={() => {
              if (fileLead !== null) {
                setFileLead({} as FileList);
              }
              setActiveModalImport(active => !active);
            }}>
            <RiCloseFill />
          </button>
        )}
        {activeModalEdit && (
          <button
            className="btn-close-modal"
            onClick={() => {
              setLeadData({});
              setActiveModalEdit(active => !active);
            }}>
            <RiCloseFill />
          </button>
        )}
      </LeadsWrapper>
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
          <LeadForm create>
            <div className="intro">
              <h1>Criar lead</h1>
              <p>
                Antes de enviar seus emails é necessário definir quem irá
                recebé-los
              </p>
              <br />
              <p>
                Comece a cadastrar seus leads. Cada detalhe poderá ser
                importante para sua estratégia de cold e-mails.
                <br />
                <br />
                <span className="link-ref" onClick={handleDownloadCSVModel}>
                  Baixar modelo <BsArrowRight />
                </span>
              </p>
              <br />
              <ul>
                <li>Nome</li>
                <li>Email *</li>
                <li>Telefone</li>
                <li>Empresa</li>
                <li>Lista *</li>
              </ul>
            </div>
            <div>
              <div className="services-checkbox">
                <div>
                  <input
                    type="checkbox"
                    value={service}
                    checked={service === 'send-email' ? true : false}
                    onClick={() => setService('send-email')}
                  />
                  <label>Envio de email</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    value={service}
                    checked={service === 'cold-emails' ? true : false}
                    onClick={() => setService('cold-emails')}
                  />
                  <label>Cold e-mails</label>
                </div>
              </div>
              {service === 'send-email' && (
                <div className="form-wrapper">
                  <form onSubmit={handleSubmit}>
                    <Input
                      label="Email *"
                      placeholder="Informe o email"
                      mask=""
                      error={error.email ? error.email : ''}
                      value={email}
                      setState={setEmail}
                    />
                    <label>
                      {segments.length <= 0
                        ? 'Você ainda não criou nenhuma lista'
                        : 'Lista *'}{' '}
                      <button
                        onClick={() => {
                          setRoute('segments');
                        }}>
                        <BsPlus /> Nova lista
                      </button>
                    </label>
                    {segments.length >= 1 && (
                      <>
                        <select
                          value="default"
                          onChange={e => setSegment(Number(e.target.value))}>
                          <option value="default" disabled>
                            Escolha uma lista
                          </option>
                          {segments.map(list => (
                            <option key={list.id} value={list.id}>
                              {list.title}
                            </option>
                          ))}
                        </select>
                        {error.segmentId && <strong>{error.segmentId}</strong>}
                      </>
                    )}
                    <button type="submit">Adicionar email</button>
                  </form>
                </div>
              )}
              {service === 'cold-emails' && (
                <div className="form-wrapper">
                  <form onSubmit={handleSubmit}>
                    <Input
                      label="Nome"
                      placeholder="Informe o nome do lead"
                      mask=""
                      error={error.name ? error.name : ''}
                      value={name}
                      setState={setName}
                    />
                    <Input
                      label="Email *"
                      placeholder="Informe o email do lead"
                      mask=""
                      error={error.email ? error.email : ''}
                      value={email}
                      setState={setEmail}
                    />
                    <Input
                      label="Telefone"
                      placeholder="(99) 99999-9999"
                      mask="(99) 99999-9999"
                      error={error.phone ? error.phone : ''}
                      value={phone}
                      setState={setPhone}
                    />
                    <Input
                      label="Empresa"
                      placeholder="Empresa"
                      mask=""
                      error=""
                      value={business}
                      setState={setBusiness}
                    />
                    <label>
                      {segments.length <= 0
                        ? 'Você ainda não criou nenhuma lista'
                        : 'Lista *'}{' '}
                      <button
                        onClick={() => {
                          setRoute('segments');
                        }}>
                        <BsPlus /> Nova lista
                      </button>
                    </label>
                    {segments.length >= 1 && (
                      <>
                        <select
                          value="default"
                          onChange={e => setSegment(Number(e.target.value))}>
                          <option value="default" disabled>
                            Escolha uma lista
                          </option>
                          {segments.map(list => (
                            <option key={list.id} value={list.id}>
                              {list.title}
                            </option>
                          ))}
                        </select>
                        {error.segmentId && <strong>{error.segmentId}</strong>}
                      </>
                    )}
                    <button type="submit">Criar lead</button>
                  </form>
                </div>
              )}
            </div>
          </LeadForm>
        </Modal>
      )}
      {activeModalImport && (
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
          <LeadForm import>
            <div className="intro">
              <h1>Importar Lead</h1>
              <p>
                Para facilitar o cadastro de seus leads crie um arquivo csv e
                adicione os seguintes campos
              </p>
              <br />
              <ul>
                <li>Nome</li>
                <li>Email </li>
                <li>Telefone</li>
                <li>Empresa</li>
                <li>Lista</li>
              </ul>
            </div>
            <div>
              <div className="services-checkbox">
                <div>
                  <input
                    type="checkbox"
                    value={service}
                    checked={service === 'send-email' ? true : false}
                    onClick={() => setService('send-email')}
                  />
                  <label>Envio de email</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    value={service}
                    checked={service === 'cold-emails' ? true : false}
                    onClick={() => setService('cold-emails')}
                  />
                  <label>Cold e-mails</label>
                </div>
              </div>
              <div className="form-wrapper">
                <label className="lead-file-wrapper">
                  {fileLead[0] !== undefined
                    ? (fileLead[0].name as string)
                    : `Clique aqui para importar ${
                        service === 'send-email'
                          ? 'a lista de emails'
                          : 'seus leads'
                      }`}
                  <input
                    type="file"
                    onChange={e =>
                      handleChangeFile(e.target as HTMLInputElement)
                    }
                  />
                </label>
                {error.invalidFile && (
                  <strong className="error-msg">{error.invalidFile}</strong>
                )}
                <button onClick={handleImportLeads}>
                  {service === 'send-email'
                    ? 'Importar lista de emails'
                    : 'Importar leads'}
                </button>
              </div>
            </div>
          </LeadForm>
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
          <LeadForm create>
            <div className="intro">
              <h1>Editar Lead</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium fuga est voluptas maxime.
              </p>
            </div>
            <div className="form-wrapper">
              <form onSubmit={handleEditLead}>
                {leadData.name && (
                  <Input
                    label="Nome"
                    placeholder={leadData.name as string}
                    mask=""
                    error={error.name ? error.name : ''}
                    value={name}
                    setState={setName}
                  />
                )}
                <Input
                  label="Email *"
                  placeholder={leadData.email as string}
                  mask=""
                  error={error.email ? error.email : ''}
                  value={email}
                  setState={setEmail}
                />
                {leadData.phone && (
                  <Input
                    label="Telefone"
                    placeholder={leadData.phone as string}
                    mask="(99) 99999-9999"
                    error={error.phone ? error.phone : ''}
                    value={phone}
                    setState={setPhone}
                  />
                )}
                {leadData.business && (
                  <Input
                    label="Empresa"
                    placeholder={leadData.business as string}
                    mask=""
                    error=""
                    value={business}
                    setState={setBusiness}
                  />
                )}
                <label>
                  {segments.length <= 0
                    ? 'Você ainda não criou nenhuma lista'
                    : 'Lista *'}{' '}
                  <button>
                    <BsPlus /> Editar lista
                  </button>
                </label>
                {segments.length >= 1 && (
                  <select
                    value="default"
                    onChange={e => setSegment(Number(e.target.value))}>
                    <option value="default">Escolha uma lista</option>
                    {segments.map(
                      list =>
                        list.title !== 'Default' && (
                          <option key={list.id} value={list.id}>
                            {list.title}
                          </option>
                        ),
                    )}
                  </select>
                )}
                {error.segmentId && <strong>{error.segmentId}</strong>}
                <button type="submit">Editar lead</button>
              </form>
            </div>
          </LeadForm>
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
          execute={handleDeleteAllLeads}
        />
      )}
    </>
  );
};

export default Leads;
