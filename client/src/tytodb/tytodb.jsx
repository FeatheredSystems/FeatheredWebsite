import { useParams } from "react-router-dom"
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from "react";

async function fetch_meta() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/FeatheredSystems/FeatheredWebsite/refs/heads/main/data/docs.json");
    const json = await response.json();
    return json["TytoDB"] || {}; 
  } catch (err) {
    console.error(err);
    return {};
  }
}

async function get_text(id){
    try {
    const response = await fetch(`https://raw.githubusercontent.com/FeatheredSystems/FeatheredWebsite/refs/heads/main/data/docs_text/TytoDB/${id}.md`);
    const txt = await response.text();
    return txt || ""; 
  } catch (err) {
    console.error(err);
    return {};
  }
}

function TytoDBPage(){
    const {content} = useParams();
    const [meta,setMeta] = useState({})
    const [text,setText] = useState("");

    useEffect(async () => {
        setMeta(await fetch_meta());
    },[])
    useEffect(async () => {
        if (!Object.is(meta,{})){
            setText(await get_text(meta[content]))
        }
    },[meta])

    return (<>
        <ReactMarkdown>{text}</ReactMarkdown>
    </>)
}

export default TytoDBPage