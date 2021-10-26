import React, { useState } from 'react';
import Link from 'next/link'
import SeoComponent from 'components/SeoComponent/SeoComponent';
import dynamic from 'next/dynamic'
import { BsArrowLeft } from 'react-icons/bs';
import { HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight } from 'react-icons/hi';
import { getAPIClient } from 'services/api';

const BuilderEditor = dynamic(
  () => import('../../../components/Admin/Helpers/Builder/Builder'),
  { ssr: false }
)

const EmailBuilder: React.FC = () => {
  const [introOpen, setIntroOpen] = useState(true)
  const [contentEditor, setContentEditor] = useState('')
  const [templateName, setTemplateName] = useState('')

  const handleSaveTemplate = async () => {
    const isEmbtyFields = !templateName || !contentEditor
    if (isEmbtyFields) alert('Template name and content was not provided')
  }

  return (
    <>
      <SeoComponent
        title="SetCampaign | Painel"
        desc=""
        keywords=""
        url="https://setcampaign.com.br/"
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
              <h1>Criar template</h1>
              <p>Liberte sua criatividade e crie campanhas personalizadas do seu jeito.</p>
              <div className="template-form">
                <label>Nome do template</label>
                <input type="text" placeholder="Digite o nome do template..." onChange={(e) => setTemplateName(e.target.value)} />
                <button onClick={handleSaveTemplate}>Salvar template</button>
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
