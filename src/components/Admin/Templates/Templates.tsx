import useFetcher from 'components/hooks/useSwr';
import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link'
import { BsPlus } from 'react-icons/bs';
import { FiMoreHorizontal, FiSearch } from 'react-icons/fi';

import { AdminContext } from 'context/adminContext';
import Pagination from '../Helpers/Pagination/Pagination';
import Modal from '../Helpers/Modals/Modal/Modal';
import { RiCloseFill } from 'react-icons/ri';
import { getAPIClient } from 'services/api';
import ModalAlert from '../Helpers/Modals/ModalAlert/ModalAlert';
import { TemplatesWrapper, ButtonLink, TemplateListWrapper, ContentModalEdit } from './TemplatesStyles';

interface SearchTemplatesProps {
  Template: {
    TemplateName: string
    SubjectPart: string
    HtmlPart: string
  }
}

interface ModalTemplateProps {
  show: boolean;
  content?: {
    id?: number
    htmlPart?: string
    templateName?: string
    subjectPart?: string
  }
}

interface ContentUpdateProps {
  status?: string
  templateName?: string
  subjectPart?: string
}

interface Props {
  awsTemplates: any[]
}

const Templates: React.FC<Props> = ({ awsTemplates }) => {
  const [itemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchTemplatesArr, setSearchTemplatesArr] = useState<SearchTemplatesProps[]>([])

  const [alertPopup, setAlertPopup] = useState(false);
  const [alertBody, setAlertBody] = useState('');
  const [modalTemplateView, setModalTemplateView] = useState<ModalTemplateProps>({} as ModalTemplateProps)
  const [modalTemplateEdit, setModalTemplateEdit] = useState<ModalTemplateProps>({} as ModalTemplateProps)

  const [contentUpdateBody, setContentUpdateBody] = useState<ContentUpdateProps>({})

  const { user } = useContext(AdminContext)

  const { data: myTemplates } = useFetcher('/templates/listAll', {
    user: user.id,
    token: ''
  })

  useEffect(() => {
    const findTemplates = awsTemplates.filter(({ Template }) => {
      var templateName = Template.TemplateName.toLowerCase()
      return templateName.includes(searchValue.toLowerCase())
    }) as []

    setSearchTemplatesArr(findTemplates)
  }, [searchValue])

  const handleUpdateTemplate = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const {
        subjectPart,
        templateName
      } = modalTemplateEdit.content

      const data = {
        status: contentUpdateBody.status ? contentUpdateBody.status : 'ACTIVE',
        templateName: contentUpdateBody.templateName ? contentUpdateBody.templateName : templateName,
        subjectPart: contentUpdateBody.subjectPart ? contentUpdateBody.subjectPart : subjectPart
      }

      getAPIClient().put('/templates/update', data, {
        headers: {
          userid: user.id,
          templateId: modalTemplateEdit.content.id
        }
      })
        .then(() => {
          setAlertBody('Template atualizado com sucesso');
          setAlertPopup(true);
          setModalTemplateEdit({ show: false, content: {} })

          setTimeout(() => {
            setAlertPopup(false);
          }, 2000);
        })
        .catch(() => {
          setAlertBody('Erro ao atualizar template, tente novamente');
          setAlertPopup(true);
          setModalTemplateEdit({ show: false, content: {} })

          setTimeout(() => {
            setAlertPopup(false);
          }, 2000);
        });
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteTemplate = async (templateId) => {
    try {
      getAPIClient().delete('/templates/delete', {
        headers: {
          userid: user.id,
          templateId
        }
      })
        .then(() => {
          setAlertBody('Template deletado com sucesso');
          setAlertPopup(true);

          setTimeout(() => {
            setAlertPopup(false);
          }, 2000);
        })
        .catch(() => {
          setAlertBody('Erro ao deletar template, tente novamente');
          setAlertPopup(true);

          setTimeout(() => {
            setAlertPopup(false);
          }, 2000);
        });
    } catch (error) {
      console.log(error)
    }
  }

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentMyTemplates = myTemplates?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNum: number) => setCurrentPage(pageNum);

  return (
    <>
      <TemplatesWrapper>
        <div className="aws-templates-info">
          <div>
            <h1 className="template-page-title">Opções de template</h1>
            <p className="template-page-intro">Gerencie seus modelos de email</p>
          </div>
          <div className="input-search">
            <FiSearch />
            <input type="text" placeholder="Pesquisar..." onChange={(e) => setSearchValue(e.target.value)} />
          </div>
        </div>
        <br />
        {searchTemplatesArr.length >= 1 ? (
          <div className="list">
            {searchTemplatesArr?.map(searchTemplate => (
              <div
                className="template-card aws"
                key={searchTemplate.Template.TemplateName}
                onClick={() => {
                  setModalTemplateView({
                    show: true,
                    content: {
                      htmlPart: searchTemplate.Template.HtmlPart,
                      templateName: searchTemplate.Template.TemplateName,
                      subjectPart: searchTemplate.Template.SubjectPart,
                    }
                  })
                }}
              >
                <h3 className="template-name">{searchTemplate.Template.TemplateName}</h3>
                <p className="template-desc">{searchTemplate.Template.SubjectPart}</p>
              </div>
            ))}
          </div>
        ) : (
          <>
            {awsTemplates?.length >= 1 && (
              <div className="list">
                {awsTemplates?.map(awsTemplate => (
                  <div
                    key={awsTemplate.Template.TemplateName}
                    className="template-card aws"
                    onClick={() => {
                      setModalTemplateView({
                        show: true,
                        content: {
                          htmlPart: awsTemplate.Template.HtmlPart,
                          templateName: awsTemplate.Template.TemplateName,
                          subjectPart: awsTemplate.Template.SubjectPart,
                        }
                      })
                    }}
                  >
                    <h3 className="template-name">{awsTemplate.Template.TemplateName}</h3>
                    <p className="template-desc">{awsTemplate.Template.SubjectPart}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <TemplateListWrapper>
          {myTemplates?.length >= 1 && (
            <div className="my-templates">
              <h1 className="template-page-title">Meus modelos de email</h1>
              <p>Gerencie seus modelos de email</p>
              <br />
              <div className="list">
                {currentMyTemplates?.map(template => (
                  <div key={template.id} className="template-card">
                    <div className="template-card-info">
                      <div>
                        <h3 className="template-name">{template.templateName}</h3>
                        <small className="template-date">{new Date(template.createdAt).toLocaleDateString()}</small>
                      </div>
                      <button className="btn-templates-options">
                        <FiMoreHorizontal />
                        <div className='template-options'>
                          <span onClick={() => {
                            setModalTemplateView({
                              show: true,
                              content: template
                            })
                          }}>Visualizar</span>
                          <span onClick={() => {
                            setModalTemplateEdit({
                              show: true,
                              content: template
                            })
                          }}>Editar</span>
                          <span onClick={() => {
                            handleDeleteTemplate(template.id)
                          }}>Excluir</span>
                        </div>
                      </button>
                    </div>
                    <p className="template-desc">{template.subjectPart}</p>
                    <span className="template-status" style={{ color: template.status === 'ACTIVE' ? 'green' : 'red' }}>Status: {template.status === 'ACTIVE' ? 'ativo' : 'inativo'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {myTemplates?.length !== itemsPerPage && (
            <Pagination
              itemsTotalPerPage={itemsPerPage}
              totalItems={myTemplates?.length}
              paginate={paginate}
            />
          )}
        </TemplateListWrapper>
      </TemplatesWrapper>
      {modalTemplateView.show || modalTemplateEdit.show ? (
        <ButtonLink onClick={() => {
          if (modalTemplateView.show) setModalTemplateView({ show: false, content: {} })
          if (modalTemplateEdit.show) setModalTemplateEdit({ show: false, content: {} })
        }}>
          <RiCloseFill />
        </ButtonLink>
      ) : (
        <Link href="/admin/email-builder" passHref>
          <ButtonLink>
            <BsPlus />
          </ButtonLink>
        </Link>
      )}
      {modalTemplateView.show && (
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
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: modalTemplateView.content.htmlPart }} />
        </Modal>
      )}
      {modalTemplateEdit.show && (
        <Modal
          height={100}
          width={80}
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
          }}
        >
          <ContentModalEdit>
            <h1>Edite as informações do seu template</h1>

            <form onSubmit={handleUpdateTemplate}>
              <label>Status do template</label>
              <select defaultValue="DEFAULT" onChange={e => setContentUpdateBody({ status: e.target.value })}>
                <option value="DEFAULT">Status</option>
                <option value="ACTIVE">Ativo</option>
                <option value="DISABLED">Inativo</option>
              </select>
              <label>Nome do template</label>
              <input
                type="text"
                placeholder={modalTemplateEdit.content.templateName}
                value={contentUpdateBody.templateName}
                onChange={e => {
                  setContentUpdateBody({
                    templateName: e.target.value,
                  })
                }} />
              <label>Assunto do template</label>
              <textarea
                placeholder={modalTemplateEdit.content.subjectPart}
                value={contentUpdateBody.subjectPart}
                onChange={e => {
                  setContentUpdateBody({
                    subjectPart: e.target.value
                  })
                }} />
              <button type="submit">Salvar alterações</button>
            </form>
          </ContentModalEdit>
        </Modal>
      )}
      {alertPopup && (
        <ModalAlert>
          <h4>{alertBody}</h4>
        </ModalAlert>
      )}
    </>
  )
}

export default Templates;