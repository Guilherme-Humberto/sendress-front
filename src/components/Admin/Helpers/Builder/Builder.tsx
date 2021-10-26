import "grapesjs/dist/css/grapes.min.css";
import grapesjsNewsletter from "grapesjs-preset-newsletter";
import grapesjsRte from 'grapesjs-rte-extensions'
import React, { useEffect, useState } from 'react';
import grape from 'grapesjs'

import { BuilderWrapper } from './BuilderStyles';

interface Props {
  setContentEditor(value: string): void;
}

const Builder: React.FC<Props> = ({ setContentEditor }) => {
  const [editor, setEditor] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const editorr = grape.init({
        container: '#email-builder',
        plugins: [
          grapesjsRte,
          grapesjsNewsletter
        ],
      })

      editorr.Panels.addButton('options', [{
        id: 'save-db',
        className: 'fa fa-floppy-o',
        command: 'save-db',
        attributes: { title: 'Save template' }
      }]
      );

      editorr.Commands.add('save-db', {
        run: function (editor, sender) {
          var htmldata = editor.getHtml();
          setContentEditor(htmldata)
        }
      });

      editorr.on('asset:upload:end', (response) => {
        alert('response')
      });

      editorr.on('asset:upload:error', (err) => {
        console.log(err);
      });
      setEditor(editorr)
    }
  }, []);

  return <BuilderWrapper id="email-builder" />;
}

export default Builder;