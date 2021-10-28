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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const editor = grape.init({
        container: '#email-builder',
        plugins: [
          grapesjsRte,
          grapesjsNewsletter,
        ],
      })

      editor.Panels.addButton('options', [{
        id: 'save-db',
        className: 'fa fa-floppy-o',
        command: 'save-db',
        attributes: { title: 'Save template' }
      }]
      );

      editor.Commands.add('save-db', {
        run: function (editor, sender) {
          // var htmldata = editor.getHtml();
          var htmldata = editor.Commands.run('gjs-get-inlined-html')
          setContentEditor(htmldata)
        }
      });

      editor.on('asset:upload:end', (response) => {
        alert('response')
      });

      editor.on('asset:upload:error', (err) => {
        console.log(err);
      });

      const panelManager = editor.Panels;
      console.log(panelManager)
      panelManager.removeButton('Panels', 'deviceDesktop');

      const deviceManager = editor.Devices;

      deviceManager.remove('desktop');
      deviceManager.select('tablet');
    }
  }, []);

  return <BuilderWrapper id="email-builder" />;
}

export default Builder;