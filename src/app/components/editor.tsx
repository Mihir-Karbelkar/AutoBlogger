"use client";
import "./editor.css";
import React from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import { SunEditorReactProps } from "suneditor-react/dist/types/SunEditorReactProps";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const RichTextEditor = (props: SunEditorReactProps) => {
  return <SunEditor height="3000px" {...props} />;
};
export default RichTextEditor;
