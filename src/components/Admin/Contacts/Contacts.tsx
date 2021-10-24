import React, { useState, useContext, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { FiMenu } from 'react-icons/fi';
import { BsChevronDown, BsPlus, BsArrowRight } from 'react-icons/bs';
import { RiCloseFill } from 'react-icons/ri';
import { ContactsWrapper, ContactForm } from './ContactsStyles';
import Table from '../Helpers/Table/Table';
import Modal from '../Helpers/Modals/Modal/Modal';
import ModalAlert from '../Helpers/Modals/ModalAlert/ModalAlert';
import Input from '../Helpers/Input/Input';
import { contactEditValidation, contactValidation } from '../validations/contact';
import { getAPIClient } from '../../../services/api';
import useFetcher from '../../hooks/useSwr';
import { useRouter } from 'next/router';
import { AdminContext } from '../../../context/adminContext';
import ModalConfirm from '../Helpers/Modals/ModalConfirm/ModalConfirm';
import { refreshData } from '../utils/refreshData';

interface ContactsProps {
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

interface Error extends Omit<ContactsProps, 'id' | 'business' | 'status'> {
  invalidFile?: string;
}

interface Props {
  segments: any[];
}

const Contacts: React.FC<Props> = ({ segments }) => {
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
  const [search, setSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState([]);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [segmentId, setSegment] = useState<number | null>(0);
  const [business, setBusiness] = useState<string>('');
  const [fileContact, setFileContact] = useState<FileList>({} as FileList);
  const [contactData, setContactData] = useState<ContactsProps>({} as ContactsProps);

  const [error, setError] = useState<Error>({} as Error);

  const { token, user, setRoute } = useContext(AdminContext);

  const { data: contacts } = useFetcher('/contact/listAll', {
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

      await contactValidation.validate(data, {
        abortEarly: false,
      });

      const typeModel =
        service === 'cold-emails' ? 'cold-emails' : 'send-email';

      await getAPIClient()
        .post(`/contact/create`, data, {
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
    setFileContact(file);
  };

  const handleImportContacts = async () => {
    if (!fileContact[0] || fileContact[0] === null) {
      alert('Arquivo não encontrado, tente novamente');
      return null;
    }

    const formData = new FormData();
    formData.append('file', fileContact[0]);

    const typeModel = service === 'cold-emails' ? 'cold-emails' : 'send-email';

    getAPIClient()
      .post(`/contact/import`, formData, {
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

  const handleDeleteContact = async (contact: number) => {
    getAPIClient()
      .delete(`/contact/delete/${contact}`, {
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
        setAlertBody('Erro ao deletar contato, tente novamento mais tarde');
        setAlertPopup(true);

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      });
  };

  const handleChangeStatus = async (contact: number, status: string) => {
    const contactStatus = status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';
    getAPIClient()
      .put(
        `/contact/update/${contact}`,
        {
          status: contactStatus,
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

  const handleEditContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        name: name ? name : contactData.name,
        email: email ? email : contactData.email,
        phone: phone ? phone : contactData.phone,
        business: business ? business : contactData.business,
        segmentId: segmentId ? segmentId : contactData.segmentId,
      };

      await contactEditValidation.validate(data, {
        abortEarly: false,
      });

      getAPIClient()
        .put(`/contact/update/${contactData.id}`, data, {
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

  const handleDeleteAllContacts = async () => {
    setAlertConfirm(false);

    getAPIClient()
      .delete(`/contact/deleteMany`, {
        data: { contacts },
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

  useEffect(() => {
    const findContacts = contacts?.filter(
      ({ name, email }: { name: string; email: string }) =>
        email.toLocaleLowerCase().includes(search) ||
        name.toLocaleLowerCase().includes(search),
    );
    setSearchFilter(findContacts);
  }, [contacts, search, setSearch]);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentContacts =
    searchFilter?.length >= 1
      ? searchFilter?.slice(indexOfFirstPost, indexOfLastPost)
      : contacts?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNum: number) => setCurrentPage(pageNum);

  return (
    <>
      <ContactsWrapper>
        <div className="content-top">
          <div>
            <h1>Meus contatos</h1>
            <p>Acompanhe e gerencie seus contatos cadastrados</p>
          </div>
          <div className="filters-wrapper">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value.toLocaleLowerCase())}
              placeholder="Nome ou email do contato"
            />
            <div className="select-item">
              <select onChange={handleSelect} value="default">
                <option value="default" disabled>
                  Ações
                </option>
                <option value="create">Cadastrar contato</option>
                <option value="import">Importar contatos</option>
                <option value="delete">Excluir contato em massa</option>
              </select>
              <BsChevronDown />
            </div>
          </div>
        </div>
        {contacts?.length >= 1 ? (
          <Table
            itemsTotalPerPage={itemsPerPage}
            totalItems={contacts.length}
            paginate={paginate}>
            <table className="widgetLgTable">
              <tr className="widgetLgTr">
                <th className="widgetLgTh">Nome</th>
                <th className="widgetLgTh">Email</th>
                <th className="widgetLgTh">Telefone</th>
                <th className="widgetLgTh">Empresa</th>
                <th className="widgetLgTh">Status</th>
                <th className="widgetLgTh">Editar</th>
              </tr>
              {currentContacts.map((contact: ContactsProps) => (
                <tr key={contact.id} className="widgetLgTr">
                  <td className="widgetLgUser">
                    <span className="widgetLgName">{contact.name}</span>
                  </td>
                  <td className="widgetLgDate">{contact.email}</td>
                  <td className="widgetLgAmount">{contact.phone}</td>
                  <td className="widgetLgAmount">{contact.business}</td>
                  <td
                    onClick={() =>
                      handleChangeStatus(
                        contact.id as number,
                        contact.status as string,
                      )
                    }
                    className={`widgetLgStatus ${contact.status === 'ACTIVE' ? 'active' : 'disabled'
                      }`}>
                    {contact.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                  </td>
                  <td className="widgetLgMenu">
                    <FiMenu />
                    <div className="modal-actions">
                      <span onClick={() => handleDeleteContact(contact.id as number)}>
                        Excluir contato
                      </span>
                      <span
                        onClick={() => {
                          setContactData(contact);
                          setActiveModalEdit(true);
                        }}>
                        Editar contato
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </table>
          </Table>
        ) : (
          <div className="without-leads-msg">
            <h1>Você ainda não possuí nenhum contato cadastrado</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <strong onClick={() => setActiveModalCreate(true)}>
                Cadastrar contato
              </strong>
              <strong>|</strong>
              <strong onClick={() => setActiveModalImport(true)}>
                Importar contatos
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
              if (fileContact !== null) {
                setFileContact({} as FileList);
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
              setContactData({});
              setActiveModalEdit(active => !active);
            }}>
            <RiCloseFill />
          </button>
        )}
      </ContactsWrapper>
      {activeModalCreate && (
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
          <ContactForm create>
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
          </ContactForm>
        </Modal>
      )}
      {activeModalImport && (
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
          <ContactForm import>
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
                  {fileContact[0] !== undefined
                    ? (fileContact[0].name as string)
                    : `Clique aqui para importar ${service === 'send-email'
                      ? 'a lista de emails'
                      : 'seus contatos'
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
                <button onClick={handleImportContacts}>
                  {service === 'send-email'
                    ? 'Importar lista de emails'
                    : 'Importar contatos'}
                </button>
              </div>
            </div>
          </ContactForm>
        </Modal>
      )}
      {activeModalEdit && (
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
          <ContactForm edit>
            <div className="form-wrapper">
              <form onSubmit={handleEditContact}>
                {contactData.name && (
                  <Input
                    label="Nome"
                    placeholder={contactData.name as string}
                    mask=""
                    error={error.name ? error.name : ''}
                    value={name}
                    setState={setName}
                  />
                )}
                <Input
                  label="Email *"
                  placeholder={contactData.email as string}
                  mask=""
                  error={error.email ? error.email : ''}
                  value={email}
                  setState={setEmail}
                />
                {contactData.phone && (
                  <Input
                    label="Telefone"
                    placeholder={contactData.phone as string}
                    mask="(99) 99999-9999"
                    error={error.phone ? error.phone : ''}
                    value={phone}
                    setState={setPhone}
                  />
                )}
                {contactData.business && (
                  <Input
                    label="Empresa"
                    placeholder={contactData.business as string}
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
                <button type="submit">Editar contato</button>
              </form>
            </div>
          </ContactForm>
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
          execute={handleDeleteAllContacts}
        />
      )}
    </>
  );
};

export default Contacts;
