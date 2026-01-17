export default function EditorBlocksRenderer({ data }) {
  if (!data?.blocks?.length) return null;

  return (
    <div className="space-y-5">
      {data.blocks.map((block, index) => {
        // =========================
        // HEADER
        // =========================
        if (block.type === "header") {
          const level = block.data.level || 2;

          const classMap = {
            1: "text-4xl md:text-5xl font-extrabold text-white mt-10",
            2: "text-2xl md:text-3xl font-bold text-white mt-10",
            3: "text-xl md:text-2xl font-semibold text-white mt-8",
            4: "text-lg md:text-xl font-semibold text-white mt-6",
          };

          const Tag = `h${level}`;
          return (
            <Tag key={index} className={classMap[level] || classMap[2]}>
              {block.data.text}
            </Tag>
          );
        }

        // =========================
        // PARAGRAPH
        // =========================
        if (block.type === "paragraph") {
          return (
            <p
              key={index}
              className="text-gray-200/90 leading-8 text-[15px] md:text-base"
              dangerouslySetInnerHTML={{ __html: block.data.text }}
            />
          );
        }

        // =========================
        // LIST
        // =========================
        if (block.type === "list") {
          const style = block.data.style || "unordered";

          if (style === "ordered") {
            return (
              <ol
                key={index}
                className="list-decimal pl-6 space-y-2 text-gray-200/90"
              >
                {block.data.items.map((item, i) => (
                  <li
                    key={i}
                    className="leading-7"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </ol>
            );
          }

          return (
            <ul
              key={index}
              className="list-disc pl-6 space-y-2 text-gray-200/90"
            >
              {block.data.items.map((item, i) => (
                <li
                  key={i}
                  className="leading-7"
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </ul>
          );
        }

        // =========================
        // CHECKLIST
        // =========================
        if (block.type === "checklist") {
          return (
            <div
              key={index}
              className="space-y-2 bg-white/5 border border-white/10 rounded-2xl p-4"
            >
              {block.data.items?.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={!!item.checked}
                    readOnly
                    className="mt-1 h-4 w-4 accent-indigo-500"
                  />
                  <p
                    className={`text-sm md:text-base leading-7 ${
                      item.checked ? "line-through text-gray-400" : "text-white"
                    }`}
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </div>
              ))}
            </div>
          );
        }

        // =========================
        // QUOTE
        // =========================
        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="border-l-4 border-indigo-500 pl-4 py-1 italic text-gray-200/90 bg-white/5 rounded-r-xl"
            >
              <p
                dangerouslySetInnerHTML={{ __html: block.data.text }}
                className="leading-7"
              />
              {block.data.caption && (
                <footer className="text-sm text-gray-400 mt-2">
                  — {block.data.caption}
                </footer>
              )}
            </blockquote>
          );
        }

        // =========================
        // CODE
        // =========================
        if (block.type === "code") {
          return (
            <pre
              key={index}
              className="bg-black/40 border border-white/10 rounded-2xl p-4 overflow-x-auto text-sm text-gray-100"
            >
              <code>{block.data.code}</code>
            </pre>
          );
        }

        // =========================
        // INLINE CODE (rare block type)
        // =========================
        if (block.type === "inlineCode") {
          return (
            <code
              key={index}
              className="px-2 py-1 rounded-md bg-black/40 border border-white/10 text-sm text-gray-100"
            >
              {block.data.text}
            </code>
          );
        }

        // =========================
        // MARKER (highlight)
        // =========================
        if (block.type === "marker") {
          return (
            <p
              key={index}
              className="text-gray-200/90 leading-8 text-[15px] md:text-base"
            >
              <mark className="bg-yellow-300/30 text-yellow-200 px-1 rounded">
                {block.data.text}
              </mark>
            </p>
          );
        }

        // =========================
        // DELIMITER
        // =========================
        if (block.type === "delimiter") {
          return <hr key={index} className="border-white/10 my-8" />;
        }

        // =========================
        // TABLE
        // =========================
        if (block.type === "table") {
          return (
            <div
              key={index}
              className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5"
            >
              <table className="w-full text-sm text-gray-200 border-collapse">
                <tbody>
                  {(block.data.content || []).map((row, rIndex) => (
                    <tr key={rIndex} className="border-b border-white/10">
                      {row.map((cell, cIndex) => (
                        <td
                          key={cIndex}
                          className="px-4 py-3 border-r border-white/10 align-top"
                          dangerouslySetInnerHTML={{ __html: cell }}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        // =========================
        // EMBED (YouTube etc)
        // =========================
        if (block.type === "embed") {
          return (
            <div
              key={index}
              className="rounded-2xl overflow-hidden border border-white/10 bg-black/30"
            >
              {block.data?.embed ? (
                <iframe
                  title={block.data?.caption || "Embedded content"}
                  src={block.data.embed}
                  className="w-full h-[320px]"
                  frameBorder="0"
                  allowFullScreen
                />
              ) : (
                <p className="p-4 text-sm text-gray-400">Embed not available</p>
              )}
            </div>
          );
        }

        // =========================
        // LINK TOOL
        // =========================
        if (block.type === "linkTool") {
          const link = block.data?.link;
          const meta = block.data?.meta;

          return (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
            >
              <p className="text-sm font-semibold text-white">
                {meta?.title || link}
              </p>
              {meta?.description && (
                <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                  {meta.description}
                </p>
              )}
              <p className="text-xs text-indigo-300 mt-2">{link}</p>
            </a>
          );
        }

        // =========================
        // IMAGE TOOL
        // =========================
        if (block.type === "image") {
          const url = block.data?.file?.url;
          const caption = block.data?.caption;

          if (!url) return null;

          return (
            <figure
              key={index}
              className="rounded-2xl overflow-hidden border border-white/10 bg-white/5"
            >
              <img src={url} alt={caption || "Blog image"} className="w-full" />
              {caption && (
                <figcaption className="text-xs text-gray-400 px-4 py-3 border-t border-white/10">
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        }

        // =========================
        // FALLBACK (unknown block)
        // =========================
        return null;
      })}
    </div>
  );
}
