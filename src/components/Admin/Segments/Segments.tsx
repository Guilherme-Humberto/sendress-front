import React, { useState, useContext, useEffect } from 'react';
import * as Yup from 'yup';
import { FiMenu } from 'react-icons/fi';
import { BsChevronDown, BsPlus } from 'react-icons/bs';
import { RiCloseFill } from 'react-icons/ri';
import { SegmentsWrapper, SegmentForm } from './SegmentsStyles';
import Table from '../Helpers/Table/Table';
import Modal from '../Helpers/Modals/Modal/Modal';
import Input from '../Helpers/Input/Input';
import { segmentValidation } from '../validations/segment';
import { getAPIClient } from '../../../services/api';
import useFetcher from '../../hooks/useSwr';
import { refreshData } from '../utils/refreshData';
import { AdminContext } from '../../../context/adminContext';
import ModalConfirm from '../Helpers/Modals/ModalConfirm/ModalConfirm';
import ModalAlert from '../Helpers/Modals/ModalAlert/ModalAlert';

interface ListsProps {
  id: number;
  title: string;
  status: string;
  contacts: string[];
  createdAt: Date;
}

interface Error {
  title: string;
}

const Lists: React.FC = () => {
  const [itemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState('');

  const [activeModalCreate, setActiveModalCreate] = useState(false);
  const [activeModalImport, setActiveModalImport] = useState(false);
  const [activeModalEdit, setActiveModalEdit] = useState(false);
  const [segmentData, setSegmentData] = useState<ListsProps>({} as ListsProps);
  const [alertPopup, setAlertPopup] = useState(false);
  const [alertConfirm, setAlertConfirm] = useState(false);
  const [alertBody, setAlertBody] = useState('');
  const [search, setSearch] = useState('');
  const [searchFilter, setSearchFilter] = useState([]);

  const [error, setError] = useState<Error>({} as Error);

  const { token, user } = useContext(AdminContext);

  const { data: segments } = useFetcher('/segment/listAll', {
    user: user.id,
    token,
  });

  const handleCreateSegment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        title,
      };

      await segmentValidation.validate(data, {
        abortEarly: false,
      });

      getAPIClient()
        .post('/segment/create/', data, {
          headers: {
            userid: user.id,
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setTitle('');
          setActiveModalCreate(false);
          setAlertBody('Lista criada com sucesso');
          setAlertPopup(true);

          setTimeout(() => {
            setAlertPopup(false);
            refreshData();
          }, 2000);
        })
        .catch(() => {
          setAlertBody('Erro ao criada lista, tente novamente mais tarde.');
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
        title: errors[0] === 'title' ? errors[1] : '',
      });
    }
  };

  const handleDeleteSegment = async (list: number) => {
    getAPIClient()
      .delete(`/segment/delete/${list}`, {
        headers: {
          userid: user.id,
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAlertBody('Lista deletada com sucesso');
        setAlertPopup(true);
        refreshData();

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      })
      .catch(() => {
        setAlertBody('Erro ao deletar lista, tente novamente mais tarde.');
        setAlertPopup(true);

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      });
  };

  const handleDeleteSegmentMany = () => {
    getAPIClient()
      .delete(`/segment/deleteMany`, {
        headers: {
          userid: user.id,
          segments: segments,
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAlertConfirm(false);
        setAlertBody('Listas deletadas com sucesso');
        setAlertPopup(true);

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      })
      .catch(() => {
        setAlertConfirm(false);
        setAlertBody('Erro ao deletar as lista, tente novamente mais tarde.');
        setAlertPopup(true);

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      });
  };

  const handleChangeStatus = async (segment: number, status: string) => {
    const segmentStatus = status === 'ACTIVE' ? 'DISABLED' : 'ACTIVE';
    getAPIClient()
      .put(
        `/segment/update/${segment}`,
        {
          status: segmentStatus,
        },
        {
          headers: {
            userid: user.id,
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        setAlertBody('Lista atualizada com sucesso');
        setAlertPopup(true);

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      })
      .catch(() => {
        setAlertBody('Erro ao atualizadar lista, tente novamente mais tarde.');
        setAlertPopup(true);

        setTimeout(() => {
          setAlertPopup(false);
        }, 2000);
      });
  };

  const handleSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = event.target.value;

    if (selectValue === 'create') {
      setActiveModalCreate(true);
    }

    if (selectValue === 'import') {
      setActiveModalImport(true);
    }

    if (selectValue === 'deleteMany') {
      setAlertConfirm(true);
    }
  };

  useEffect(() => {
    const findSegments = segments?.filter(({ title }: { title: string }) =>
      title.toLocaleLowerCase().includes(search),
    );
    setSearchFilter(findSegments);
  }, [segments, search, setSearch]);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentLists =
    searchFilter?.length >= 1
      ? searchFilter?.slice(indexOfFirstPost, indexOfLastPost)
      : segments?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNum: number) => setCurrentPage(pageNum);
  const nextPage = () => setCurrentPage(currentPage => currentPage + 1);
  const prevPage = () =>
    setCurrentPage(currentPage => (currentPage === 1 ? 1 : currentPage - 1));

  return (
    <>
      <SegmentsWrapper>
        <div className="content-top">
          <div>
            <h1>Minhas listas</h1>
            <p>Acompanhe e gerencie suas listas cadastradas</p>
          </div>
          <div className="filters-wrapper">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value.toLocaleLowerCase())}
              placeholder="Titulo da lista"
            />
            <div className="select-item">
              <select onChange={handleSelect} value="default">
                <option value="default" disabled>
                  Ações
                </option>
                <option value="create">Cadastrar lista</option>
                <option value="deleteMany">Excluir listas em massa</option>
              </select>
              <BsChevronDown />
            </div>
          </div>
        </div>
        {segments?.length >= 1 ? (
          <Table
            itemsTotalPerPage={itemsPerPage}
            totalItems={segments.length}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={currentPage}>
            <table className="widgetLgTable">
              <tr className="widgetLgTr">
                <th className="widgetLgTh">Título</th>
                <th className="widgetLgTh">Contatos</th>
                <th className="widgetLgTh">Criado</th>
                <th className="widgetLgTh">Status</th>
                <th className="widgetLgTh">Editar</th>
              </tr>
              {currentLists.map((list: ListsProps) => (
                <tr key={list.id} className="widgetLgTr">
                  <td className="widgetLgUser">
                    <span className="widgetLgName">{list.title}</span>
                  </td>
                  <td className="widgetLgDate">{list.contacts.length}</td>
                  <td className="widgetLgDate">
                    {new Date(list.createdAt).toLocaleDateString()}
                  </td>
                  {list.title === 'Default' ? (
                    <div />
                  ) : (
                    <td
                      onClick={() =>
                        handleChangeStatus(
                          list.id as number,
                          list.status as string,
                        )
                      }
                      className={`widgetLgStatus ${list.status === 'ACTIVE' ? 'active' : 'disabled'
                        }`}>
                      {list.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                    </td>
                  )}
                  <td className="widgetLgMenu">
                    {list.title === 'Default' ? '' : <FiMenu />}
                    <div className="modal-actions">
                      <span onClick={() => handleDeleteSegment(list.id)}>
                        Excluir lista
                      </span>
                      <span
                        onClick={() => {
                          setSegmentData(list);
                          setActiveModalEdit(true);
                        }}>
                        Editar lista
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </table>
          </Table>
        ) : (
          <div className="without-leads-msg">
            <h1>Você ainda não possuí nenhuma lista cadastrada</h1>
            <strong onClick={() => setActiveModalCreate(true)}>
              Cadastrar lista
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
        {activeModalImport && (
          <button
            className="btn-close-modal"
            onClick={() => setActiveModalImport(active => !active)}>
            <RiCloseFill />
          </button>
        )}
        {activeModalEdit && (
          <button
            className="btn-close-modal"
            onClick={() => setActiveModalEdit(active => !active)}>
            <RiCloseFill />
          </button>
        )}
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
            <SegmentForm>
              <div className="form-wrapper">
                <form onSubmit={handleCreateSegment}>
                  <Input
                    label="Título"
                    placeholder="Informe o título"
                    mask=""
                    error={error.title}
                    value={title}
                    setState={setTitle}
                  />
                  <button type="submit">Criar Lista</button>
                </form>
              </div>
            </SegmentForm>
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
            <SegmentForm>
              <div className="form-wrapper">
                <form onSubmit={handleCreateSegment}>
                  <Input
                    label="Título"
                    placeholder={segmentData.title}
                    mask=""
                    error={error.title}
                    value={title}
                    setState={setTitle}
                  />
                  <button type="submit">Editar Lista</button>
                </form>
              </div>
            </SegmentForm>
          </Modal>
        )}
      </SegmentsWrapper>
      {alertPopup && (
        <ModalAlert>
          <h3>{alertBody}</h3>
        </ModalAlert>
      )}
      {alertConfirm && (
        <ModalConfirm
          content="Tem certeza que deseja fazer isso?"
          close={setAlertConfirm}
          execute={handleDeleteSegmentMany}
        />
      )}
    </>
  );
};

export default Lists;
