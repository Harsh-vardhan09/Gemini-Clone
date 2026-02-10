import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

    const delayPara=(index,nextword)=>{
        setTimeout(function (){
            setResultData(prev=>prev+nextword)
        },75*index)
    }
    const newChat=()=>{
        setLoading(false);
        setShowResult(false);
    }

  const onSent = async (prompt) => {

    setResultData("");
    setLoading(true);
    setShowResult(true);
    let res;
    if(prompt!==undefined){
        res=await runChat(prompt);
        setRecentPrompt(prompt);
    }else{
        setPrevPrompt(prev=>[...prev,input]);
        setRecentPrompt(input);
        res=await runChat(input);
    }
    setRecentPrompt(input);
    setPrevPrompt(prev=>[...prev,input])
    const response= await runChat(input);

    let responseArray = response.split("**");
    let newRes="";
    for (let i = 0;i< response.length; i++){
        if(i===0 || i%2!==1){
            newRes+=responseArray[i];
        }else{
            newRes+="<b>"+responseArray+"</b>"
        }   
    }
    let newRes2=newRes.split("*").join("</br>");
    let newResArr=newRes2.split(" ");
    for (let i = 0; i < newResArr.length; i++) {
        const nextword=newResArr[i];
        delayPara(i,nextword+" ");
    }
    setLoading(false);
    setInput("");
  };


  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    setLoading,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
