import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import './tytodb.css';

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
  let { content } = useParams();
  const [meta, setMeta] = useState({});
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  console.log('URL content parameter:', content);
  console.log('Meta data loaded:', meta);
  console.log('Looking for file number:', meta[content]);
  
  useEffect(() => {
    async function fetchMetaData() {
      setLoading(true);
      const data = await fetch_meta();
      console.log('Fetched meta data:', data);
      setMeta(data);
    }
    fetchMetaData();
  }, []);

  useEffect(() => {
    async function fetchText() {
      if (!content) {
        setError("No content parameter provided");
        setLoading(false);
        return;
      }

      if (Object.keys(meta).length === 0) {
        // Meta not loaded yet
        return;
      }
      content = content.toLowerCase();
      if (meta[content.toLowerCase()] !== undefined) {
        setLoading(true);
        setError("");
        console.log(`Fetching file ${meta[content]}.md for content "${content}"`);
        
        const txt = await get_text(meta[content]);
        setText(txt);
        setLoading(false);
      } else {
        // Content not found in meta
        setError(`Content "${content}" not found. Available content: ${Object.keys(meta).join(', ')}`);
        setText("");
        setLoading(false);
      }
    }
    fetchText();
  }, [meta, content]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{color: 'red'}}>Error: {error}</div>;
  }

  if (!text) {
    return <div>No content available</div>;
  }

  return <div className="markdown-content">
    <ReactMarkdown>{text}</ReactMarkdown>
  </div>;
}

export default TytoDBPage;