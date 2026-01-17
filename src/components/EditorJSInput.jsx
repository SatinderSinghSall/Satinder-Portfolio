import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";

import Checklist from "@editorjs/checklist";
import Table from "@editorjs/table";
import Embed from "@editorjs/embed";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";

const API = import.meta.env.VITE_API_URL || "/api";

export default function EditorJSInput({ value, onChange }) {
  const editorRef = useRef(null);
  const holderId = useRef(`editorjs-${Math.random().toString(36).slice(2)}`);
  const isReadyRef = useRef(false);

  // ✅ This stops render() loop while typing
  const isTypingRef = useRef(false);

  // ✅ Remember last loaded blog content (for edit mode)
  const lastLoadedHashRef = useRef("");

  // ✅ Create editor only once
  useEffect(() => {
    if (editorRef.current) return;

    const editor = new EditorJS({
      holder: holderId.current,
      autofocus: true,
      placeholder: "Write your blog like Notion... ✨",

      data: value || {
        time: Date.now(),
        blocks: [],
        version: "2.28.2",
      },

      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          toolbox: true,
          config: { levels: [1, 2, 3, 4], defaultLevel: 2 },
        },

        list: {
          class: List,
          inlineToolbar: true,
          toolbox: true,
        },

        checklist: {
          class: Checklist,
          inlineToolbar: true,
          toolbox: true,
        },

        quote: {
          class: Quote,
          inlineToolbar: true,
          toolbox: true,
          config: {
            quotePlaceholder: "Write a quote...",
            captionPlaceholder: "Quote author",
          },
        },

        code: {
          class: Code,
          toolbox: true,
        },

        delimiter: {
          class: Delimiter,
          toolbox: true,
        },

        marker: {
          class: Marker,
          toolbox: true,
        },

        inlineCode: {
          class: InlineCode,
          toolbox: true,
        },

        table: {
          class: Table,
          inlineToolbar: true,
          toolbox: true, // ✅ IMPORTANT
          config: { rows: 2, cols: 3 },
        },

        embed: {
          class: Embed,
          inlineToolbar: false,
          toolbox: true,
          config: {
            services: {
              youtube: true,
              codepen: true,
              instagram: true,
              twitter: true,
            },
          },
        },

        linkTool: {
          class: LinkTool,
          toolbox: true,
          config: { endpoint: `${API}/editor/fetch-url` },
        },

        image: {
          class: ImageTool,
          toolbox: true,
          config: {
            endpoints: {
              byFile: `${API}/editor/upload-image`,
              byUrl: `${API}/editor/upload-image-url`,
            },
          },
        },
      },

      async onReady() {
        isReadyRef.current = true;
      },

      async onChange() {
        try {
          // ✅ mark typing so render() won't run
          isTypingRef.current = true;

          const data = await editor.save();
          onChange(data);

          // ✅ allow render again after user stops typing
          setTimeout(() => {
            isTypingRef.current = false;
          }, 400);
        } catch (err) {
          console.error("EditorJS save error:", err);
        }
      },
    });

    editorRef.current = editor;

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  // ✅ Render blocks ONLY when switching blog for edit (not while typing)
  useEffect(() => {
    const loadData = async () => {
      if (!editorRef.current) return;
      if (!isReadyRef.current) return;

      // ❌ If user is typing, never render (cursor jump fix)
      if (isTypingRef.current) return;

      const safeData =
        value && value.blocks
          ? value
          : { time: Date.now(), blocks: [], version: "2.28.2" };

      // ✅ Only compare blocks (ignore time/version)
      const blocksHash = JSON.stringify(safeData.blocks || []);

      // ✅ if same blog content already loaded, don't re-render
      if (lastLoadedHashRef.current === blocksHash) return;
      lastLoadedHashRef.current = blocksHash;

      try {
        await editorRef.current.render(safeData);
      } catch (err) {
        console.error("EditorJS render failed:", err);
      }
    };

    loadData();
  }, [value]);

  return (
    <div className="border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden">
      {/* Top Bar */}
      <div className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-700">
          Notion Editor (EditorJS)
        </p>
        <span className="text-xs text-gray-500">
          Tip: Press <b>/</b> for blocks
        </span>
      </div>

      {/* Editor Area */}
      <div className="p-5 min-h-[320px]">
        <div id={holderId.current} />
      </div>
    </div>
  );
}
