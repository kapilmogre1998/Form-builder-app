import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { BUBBLE_TYPES, formatName, USER_INPUT } from '../../constant';
import { RiSendPlane2Line } from "react-icons/ri";
import { addViewCountAPI, getFormBotAPI, startViewCountAPI, submitFormBotAPI } from './api';
import Loader from '../Common/Loader/Loader';
import useTheme from '../../hooks/useTheme';

import './FormBot.scss';

const FormBot = () => {
  const [chatBot, setChatBot] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const [inputValue, setInputValue] = useState('');
  const formBotId = params.formBotId;
  const formDataId = useRef(null);
  const [theme] = useTheme();

  const appendElementsIntoChatBotList = () => {
    let allBubblesBeforeInput = [];
    let modifiedList = [...chatBot];

    for (let i = chatBot.length; i < data.length; i++) {
      if (USER_INPUT.includes(data[i].type) && data[i].value.length === 0) {
        allBubblesBeforeInput.push(data[i]);
        break;
      } else {
        allBubblesBeforeInput.push(data[i]);
      }
    }

    //append input value
    if (chatBot.length > 0) {
      const lastElem = chatBot[chatBot.length - 1];
      if (USER_INPUT.includes(lastElem.type)) {
        modifiedList[modifiedList.length - 1] = { ...lastElem, value: inputValue };
        // saveChatBotData();
      }
    }

    setChatBot([...modifiedList, ...allBubblesBeforeInput]);
  };


  const fetchFormBot = async () => {
    if (!formBotId) return;

    let res;
    setIsLoading(true)
    try {
      res = await getFormBotAPI(formBotId);
      if (res?.data?.message === 'success') {
        addViewCount();
        setData(res.data.data.map(({ title, type, value }) => ({ title, type, value})));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'something went wrong')
    } finally {
      setIsLoading(false);
    }
  }

  const inputType = (item) => {
    if (item.type === 'user-input-text') {
      return <input type="text" placeholder='Enter your text' onChange={(e) => setInputValue(e.target.value)} />
    }
    if (item.type === 'user-input-number') {
      return <input type="text" placeholder='Enter a number' onChange={(e) => setInputValue(e.target.value)} />
    }
    if (item.type === 'user-input-email') {
      return <input type="email" placeholder={`${formatName(item.type.split('-')[1])} ${formatName(item.type.split('-')[2])}`} onChange={(e) => setInputValue(e.target.value)} />
    }
    if (item.type === 'user-input-phone') {
      return <input type="phone" placeholder={`${formatName(item.type.split('-')[1])} ${formatName(item.type.split('-')[2])}`} onChange={(e) => setInputValue(e.target.value)} />
    }
    if (item.type === 'user-input-date') {
      return <input type="date" placeholder={`${formatName(item.type.split('-')[1])} ${formatName(item.type.split('-')[2])}`} onChange={(e) => setInputValue(e.target.value)} />
    }
    if (item.type === 'user-input-rating') {
      return <div className='input-rating' >{new Array(5).fill(0).map((item, idx) => (<div className={`${(idx + 1) == inputValue ? 'user-selected-rating' : ''}`} key={idx} onClick={() => setInputValue(idx + 1)} >{idx + 1}</div>))}</div>
    }
  }

  const bubblesJSx = (item, index) => {
    return (
      <div key={index} className='form-bot-bubble'>
        <div className='circle' ></div>
        {
          item.type === 'bubble-text' ? <div className='element-bg-text' >{item.value}</div> : <img className='bubble-image' src={item.value} alt="image" />
        }
      </div>
    )
  }

  const handleClickOnSendTheUserInput = () => {
    if (inputValue.toString().trim().length == 0) {
      toast.error('Please fill the input field before submitting your message.');
      return;
    }
    
    let isFirstUserInputFieldPresent = true;

    for(let i = 0;i < chatBot.length;i++){
      if(USER_INPUT.includes(chatBot[i].type) && chatBot[i].value){
        isFirstUserInputFieldPresent = false;
      }
    }

    chatBot.map(item => item.type)
    appendElementsIntoChatBotList();
    
    //If isFirstUserInputFieldPresent is true it means it is the first input box, so i need to call the start count API.
    if(isFirstUserInputFieldPresent && inputValue.length){
      const payload = chatBot.map((item, index) => {
        if(index == chatBot.length - 1){
          return { ...item, value: inputValue }
        } 
        return { ...item }
      })
      formStartCount(payload)
    }

    setInputValue('');
  };

  const userInputJSX = (item, index) => {
    return (
      <div key={index} className='form-bot-user-input'>
        {
          item.type === 'user-input-button' ? <button className='submit-button' onClick={saveChatBotData} >{item.value}</button> :
            item.value ?
              item.type === 'user-input-rating' ? <div className='input-rating' >{new Array(5).fill(0).map((elem, idx) => (<div className={`${(idx + 1) == item.value ? 'user-selected-rating' : ''}`} key={idx}>{idx + 1}</div>))}</div> :
                <div className='user-entered-value'>{item.value}</div> :
              <>
                {inputType(item)}
                <button onClick={handleClickOnSendTheUserInput} ><RiSendPlane2Line /></button>
              </>
        }
      </div>
    )
  }

  const formStartCount = async (data) => {
    let res;
    try {
      setIsLoading(true)
      res = await startViewCountAPI({ formBotId, elements: data });
      if (res.data.sts == 1 && res.data.formDataId) {
        formDataId.current = res.data.formDataId;
       }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'something went wrong')
    } finally{
      setIsLoading(false)
    }
  }

  const saveChatBotData = async () => {
    let res;
    try {
      const payload = {
        formBotId,
        elements: chatBot,
        formDataId: formDataId.current
      }
      setIsLoading(true)
      res = await submitFormBotAPI(payload);
      if (res.status == 200) {
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'something went wrong')
    } finally {
      setIsLoading(false);
    }
  }

  const addViewCount = async () => {
    let res;
    try {
      res = await addViewCountAPI({ formBotId });
      if (res.data.sts == 1) { }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'something went wrong')
    }
  }

  useEffect(() => {
    fetchFormBot();
  }, [])

  useEffect(() => {
    if (data.length) {
      appendElementsIntoChatBotList();
    }
  }, [data])

  return (
    <div className='form-bot-container' >
      <div className='form-bot-box' >
        {
          chatBot.map((item, index) => {
            if (BUBBLE_TYPES.includes(item.type)) return bubblesJSx(item, index)
            else if (USER_INPUT.includes(item.type)) return userInputJSX(item, index)
          })
        }
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnHover={false}
        theme={'dark'}
      />
      {isLoading && <Loader theme={theme} />}
    </div>
  )
}

export default FormBot