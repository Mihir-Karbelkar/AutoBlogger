"use client";
import "./editor.css";
import React, { MutableRefObject, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import { SunEditorReactProps } from "suneditor-react/dist/types/SunEditorReactProps";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { data } from "autoprefixer";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const RichTextEditor = (props: SunEditorReactProps) => {
  return <SunEditor height="300px" {...props} />;
};

type EditorProps = {
  defaultValue?: OutputData;
  onChange?: (cnotent: OutputData) => void;
  holder: string;
  editorRef?: MutableRefObject<EditorJS | undefined>;
};

// export const RichTextEditor = ({
//   defaultValue,
//   onChange,
//   holder,
//   editorRef: internalEditorRef,
// }: EditorProps) => {
//   const editorRef = useRef<EditorJS>();

//   const initEditor = () => {
//     const editor = new EditorJS({
//       holder,
//       onReady: () => {
//         editorRef.current = editor;
//         if (internalEditorRef) {
//           internalEditorRef.current = editor;
//         }
//       },
//       autofocus: true,
//       data: defaultValue,
//       onChange: async () => {
//         const content = await editor.saver.save();
//         onChange?.(content);
//       },
//     });
//   };

//   useEffect(() => {
//     if (!editorRef.current) {
//       initEditor();
//     }

//     return () => {
//       if (editorRef.current && editorRef.current.destroy) {
//         editorRef.current.destroy();
//       }
//       if (
//         internalEditorRef &&
//         internalEditorRef.current &&
//         internalEditorRef.current.destroy
//       ) {
//         internalEditorRef.current.destroy();
//       }
//     };
//   }, []);

//   return (
//     <>
//       <div id={holder}></div>
//     </>
//   );
// };

export default RichTextEditor;
