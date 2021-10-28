import useFetcher from 'components/hooks/useSwr';
import React, { useContext } from 'react';
import Link from 'next/link'
import { BsPlus } from 'react-icons/bs';

import { TemplatesWrapper, ButtonLink } from './TemplatesStyles';
import { AdminContext } from 'context/adminContext';

const Templates: React.FC = () => {

  const { user } = useContext(AdminContext)

  const { data: templates } = useFetcher('/templates/listAll', {
    user: user.id,
    token: ''
  })

  return (
    <>
      <TemplatesWrapper>
        <h1>TemplatesWrapper</h1>

        <div className="list">
          {templates?.map(template => (
            <div key={template.id} className="template-card">
              <h3>{template.templateName}</h3>
              <p>{template.subjectPart}</p>
            </div>
          ))}
        </div>
      </TemplatesWrapper>
      <Link href="/admin/email-builder" passHref>
        <ButtonLink >
          <BsPlus />
        </ButtonLink>
      </Link>
    </>
  )
}

export default Templates;