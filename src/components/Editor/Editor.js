"use client"
import ExampleTheme from "./themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import HtmlPlugin from "./plugins/HtmlPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import { use, useEffect, useRef } from "react";
import { ConstructionOutlined } from "@mui/icons-material";

function Placeholder() {
  return <div className="editor-placeholder">
    <div className="editor-placeholder-title">
      Title
    </div>
    <br/><br/>
    <div className="editor-placeholder-text">
      Tell your story...
    </div>
  </div>
}

function saveContent(data) {
  localStorage.setItem("draft", data);
} 


export default  function Editor(props) {
 
  function loadContent() {
    if(props.clearEditor) 
      localStorage.removeItem("draft");
    
    const content = localStorage.getItem("draft");
  
    if (content!==null) {
      return content;
    }else{
      // const value = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
      const value = `
      {
        "root": {
            "children": [
                {
                    "children": [
                        {
                            "detail": 0,
                            "format": 0,
                            "mode": "normal",
                            "style": "",
                            "text": "",
                            "type": "text",
                            "version": 1
                        }
                    ],
                    "direction": null,
                    "format": "",
                    "indent": 0,
                    "type": "heading",
                    "version": 1,
                    "tag": "h1"
                }
            ],
            "direction": null,
            "format": "",
            "indent": 0,
            "type": "root",
            "version": 1
        }
      }`
    
      return value;
    }
    
  }

  const initialEditorState =  loadContent();
  const editorStateRef = useRef({});
 
  const editorConfig = {
    // The editor theme
    
    theme: ExampleTheme,
    editorState: initialEditorState,
    // Handling of errors during update
    onError(error) {
      throw error;
    },
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode
    ]
  };
  

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <HtmlPlugin
            onHtmlChanged={(html) => props.save(html)}
            initialHtml=""
          />
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
         
          <HistoryPlugin />
          <OnChangePlugin onChange={editorState => {
            editorStateRef.current = editorState
          
            saveContent(JSON.stringify(editorStateRef.current))
          }} />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
      {/*<button label="Save" onPress={() => {
        if (editorStateRef.current) {
          saveContent(JSON.stringify(editorStateRef.current))
        }
      }} />*/}
    </LexicalComposer>
    
  );
}