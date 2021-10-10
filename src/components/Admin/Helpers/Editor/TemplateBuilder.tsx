import React from 'react';
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css';
import useFetcher from '../../../hooks/useSwr';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

interface Props {
  defaultValue?: string;
  setContent?(value: string): void;
}

const TamplateBuilder: React.FC<Props> = ({setContent, defaultValue}) => {
  const {data: templates} = useFetcher('/templates/listAll', {
    user: 0,
    token: '',
  });

  const templatesArr: {name: string; html: string}[] = [];

  templates?.forEach(
    ({
      Template,
    }: {
      Template: {
        TemplateName: string;
        HtmlPart: string;
      };
    }) => {
      templatesArr.push({
        name: Template.TemplateName,
        html: Template.HtmlPart,
      });
    },
  );

  if (templatesArr.length <= 0) return null;

  return (
    <div>
      <SunEditor
        height="30rem"
        defaultValue={defaultValue}
        onChange={setContent}
        setOptions={{
          templates: templatesArr,
          mode: 'classic',
          buttonList: [
            ['undo', 'redo'],
            ['font', 'fontSize', 'formatBlock'],
            ['paragraphStyle', 'blockquote'],
            [
              'bold',
              'underline',
              'italic',
              'strike',
              'subscript',
              'superscript',
            ],
            ['fontColor', 'hiliteColor'],
            ['removeFormat'],
            ['outdent', 'indent'],
            ['align', 'horizontalRule', 'list', 'lineHeight'],
            ['link', 'image'],
            ['imageGallery'],
            ['fullScreen', 'showBlocks', 'codeView'],
            ['preview'],
            ['template'],
          ],
        }}
      />
    </div>
  );
};
export default TamplateBuilder;
