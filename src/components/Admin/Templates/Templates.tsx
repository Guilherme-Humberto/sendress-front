import useFetcher from 'components/hooks/useSwr';
import React from 'react';
import Link from 'next/link'
import { BsPlus } from 'react-icons/bs';

import { TemplatesWrapper, ButtonLink } from './TemplatesStyles';

const Templates: React.FC = () => {

  return (
    <>
      <TemplatesWrapper>
        <h1>TemplatesWrapper</h1>

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