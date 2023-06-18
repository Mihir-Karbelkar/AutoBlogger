'use client';
import './editor.css';
import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css';
import { SunEditorReactProps } from 'suneditor-react/dist/types/SunEditorReactProps';
import EditorJS, { OutputData } from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// import Embed from '@editorjs/embed';
// import Table from '@editorjs/table';
// import List from '@editorjs/list';
// import Code from '@editorjs/code';
// import LinkTool from '@editorjs/link';
// import InlineCode from '@editorjs/inline-code';
// import ImageTool from '@editorjs/image';
import { data } from 'autoprefixer';
import { uploadFiles } from './uploadthing';
import edjsHTML from 'editorjs-html';

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

// const RichTextEditor = (props: SunEditorReactProps) => {
//   return <SunEditor height="300px" {...props} />;
// };

type EditorProps = {
  defaultValue?: string;
  onChange?: (content: string) => void;
  holder: string;
  editorRef?: MutableRefObject<EditorJS | undefined>;
};
const edjsParser = edjsHTML();

export const RichTextEditor = ({
  defaultValue,
  onChange,
  holder,
  editorRef: internalEditorRef,
}: EditorProps) => {
  const editorRef = useRef<EditorJS>();

  const initEditor = useCallback(async () => {
    const Header = (await import('@editorjs/header')).default;
    const Embed = (await import('@editorjs/embed')).default;
    const Table = (await import('@editorjs/table')).default;
    const List = (await import('@editorjs/list')).default;
    const Code = (await import('@editorjs/code')).default;
    const LinkTool = (await import('@editorjs/link')).default;
    const InlineCode = (await import('@editorjs/inline-code')).default;
    const ImageTool = (await import('@editorjs/image')).default;
    const editor = new EditorJS({
      holder,
      onReady: () => {
        editorRef.current = editor;
        if (internalEditorRef) {
          internalEditorRef.current = editor;
        }
        editor.blocks.renderFromHTML(defaultValue || '');
      },
      autofocus: true,
      onChange: async () => {
        const content = await editor.saver.save();
        const html = edjsParser.parse(content);
        onChange?.(html.join(''));
      },
      tools: {
        header: Header,
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: '/api/link',
          },
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile: async (file: File) => {
                const [res] = await uploadFiles([file], 'imageUploader');

                return { success: true, file: { url: res.fileUrl } };
              },
              uploadByUrl: async (url: string) => {
                let response = await fetch(url);
                let data = await response.blob();
                let metadata = {
                  type:
                    (await response.headers.get('Content-Type')) ||
                    'images/jpg',
                };
                let file = new File(
                  [data],
                  (await response.headers.get('Etag')) || 'test.jpg',
                  metadata
                );

                const [res] = await uploadFiles([file], 'imageUploader');

                return { success: true, file: { url: res.fileUrl } };
              },
            },
          },
        },
        list: List,
        code: Code,
        inlineCode: InlineCode,
        table: Table,
        embed: Embed,
      },
    });
  }, []);

  useEffect(() => {
    if (!editorRef.current) {
      initEditor();
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
      if (
        internalEditorRef &&
        internalEditorRef.current &&
        internalEditorRef.current.destroy
      ) {
        internalEditorRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <div id={holder}></div>
    </>
  );
};

export default RichTextEditor;
