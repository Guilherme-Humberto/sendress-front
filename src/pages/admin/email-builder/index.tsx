import React, { useState, useContext } from 'react';
import Link from 'next/link'
import SeoComponent from 'components/SeoComponent/SeoComponent';
import dynamic from 'next/dynamic'
import { BsArrowLeft } from 'react-icons/bs';
import { HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight } from 'react-icons/hi';
import { getAPIClient } from 'services/api';
import { AdminContext } from 'context/adminContext';

const BuilderEditor = dynamic(
  () => import('../../../components/Admin/Helpers/Builder/Builder'),
  { ssr: false }
)

const EmailBuilder: React.FC = () => {
  const [introOpen, setIntroOpen] = useState(true)
  const [contentEditor, setContentEditor] = useState('')
  const [templateName, setTemplateName] = useState('')
  const [subjectPart, setSubjectPart] = useState('')

  const { user } = useContext(AdminContext)

  const handleSaveTemplate = async () => {
    const isEmbtyFields = !templateName || !contentEditor || !subjectPart
    if (isEmbtyFields) alert('Template name and content was not provided')

    const data = {
      templateName,
      subjectPart,
      htmlPart: contentEditor
    }

    getAPIClient().post('/templates/create', data, {
      headers: {
        userid: user.id
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return (
    <>
      <SeoComponent
        title="Sendress | Painel"
        desc="Aumente sua conversão com envio de emails em massa e campanhas de cold-emails."
        keywords="Email marketing, Marketing digital, Prospecção de leads, Envio de emails, Emails em massa"
        url="https://sendress.app/"
      />
      <main className="editor-page-wrapper">
        <section className={`editor-page-wrapper-intro ${!introOpen ? 'disabled' : ''}`}>
          {introOpen && (
            <Link href="/admin">
              <a className="editor-page-wrapper-link"><BsArrowLeft /> Voltar para o painel</a>
            </Link>
          )}
          {introOpen && (
            <>
              <h1>Criar modelo de email</h1>
              <p>Liberte sua criatividade e crie modelos de email personalizadas do seu jeito.</p>
              <div className="template-form">
                <label>Nome do template</label>
                <input type="text" placeholder="Digite o nome do modelo..." disabled={contentEditor.length === 0 ? true : false} onChange={(e) => setTemplateName(e.target.value)} />
                <br />
                <label>Assunto da </label>
                <textarea placeholder="Digite aqui qual o assunto da campanha..." disabled={contentEditor.length === 0 ? true : false} onChange={(e) => setSubjectPart(e.target.value)} />
                <button onClick={handleSaveTemplate}>Gravar nome</button>
              </div>
            </>
          )}
          <button className="editor-page-wrapper-btn-float" onClick={() => setIntroOpen(state => !state)}>
            {introOpen ? <HiOutlineChevronDoubleLeft /> : <HiOutlineChevronDoubleRight />}
          </button>
        </section>
        <BuilderEditor setContentEditor={setContentEditor} />
      </main>
    </>
  );
};


export default EmailBuilder;
