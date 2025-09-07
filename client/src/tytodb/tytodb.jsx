import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

async function fetch_meta() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/FeatheredSystems/FeatheredWebsite/refs/heads/main/data/docs.json"
    );
    const json = await response.json();
    return json["TytoDB"] || {};
  } catch (err) {
    console.error(err);
    return {};
  }
}

async function get_text(id) {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/FeatheredSystems/FeatheredWebsite/refs/heads/main/data/docs_text/TytoDB/${id}.md`
    );
    const txt = await response.text();
    return txt || "";
  } catch (err) {
    console.error(err);
    return "";
  }
}

function TytoDBPage() {
  const { content } = useParams();
  const [meta, setMeta] = useState({});
  const [text, setText] = useState("");
  console.log(content,meta,text);
  useEffect(() => {
    async function fetchMetaData() {
      const data = await fetch_meta();
      setMeta(data);
    }
    fetchMetaData();
  }, []);

  useEffect(() => {
    async function fetchText() {
      if (meta[content]) {
        const txt = await get_text(meta[content]);
        setText(txt);
      }
    }
    fetchText();
  }, [meta, content]);

  return <ReactMarkdown>{text}</ReactMarkdown>;
}

export default TytoDBPage;
