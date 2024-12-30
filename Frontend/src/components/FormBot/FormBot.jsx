import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BUBBLE_TYPES, formatName, USER_INPUT } from '../../constant';
import { RiSendPlane2Line } from "react-icons/ri";
import { getFormBotAPI, storeFormBotAPI } from './api';

import './FormBot.scss';

const FormBot = () => {
  const [chatBot, setChatBot] = useState([]);
  const [data, setData] = useState([]);
  const params = useParams();
  const [inputValue, setInputValue] = useState('');
  const formBotId = params.formBotId;

  // const appendAllBubblesBeforUserInput = () => {
  //   let allBubblesBeforeInput = [];

  //   for (let i = chatBot.length; i < data.length; i++) {
  //     if (USER_INPUT.includes(data[i].type) && data[i].value.length == 0 ) {
  //       allBubblesBeforeInput.push(data[i]);
  //       break;
  //     } else {
  //       allBubblesBeforeInput.push(data[i]);
  //     }
  //   }

  //   let modifiedList = [...chatBot];

  //   if(chatBot.length > 0){
  //     const lastElem = chatBot[chatBot.length - 1]
  //     if(USER_INPUT.includes(lastElem.type)){
  //       modifiedList = modifiedList.map((item, id) => {
  //         if(id !== chatBot.length-1){
  //           return {...item}
  //         }else{
  //           return {...item,value: inputValue}
  //         }
  //       })
  //     }
  //   }else{
  //     allBubblesBeforeInput.shift()
  //   }

  //   setChatBot(prev => ([...prev, ...allBubblesBeforeInput]));
  // };

  const appendAllBubblesBeforUserInput = () => {
    let allBubblesBeforeInput = [];
    let modifiedList = [...chatBot];

    // if (inputValue.trim().length == 0 && chatBot.length > 0) {
    //   alert('Please fill the input field before sending your message.');
    //   return;
    // }

    for (let i = chatBot.length; i < data.length; i++) {
      if (USER_INPUT.includes(data[i].type) && data[i].value.length === 0) {
        allBubblesBeforeInput.push(data[i]);
        break;
      } else {
        allBubblesBeforeInput.push(data[i]);
      }
    }

    if (chatBot.length > 0) {
      const lastElem = chatBot[chatBot.length - 1];
      if (USER_INPUT.includes(lastElem.type)) {
        modifiedList[modifiedList.length - 1] = { ...lastElem, value: inputValue };
      }
    }

    setChatBot([...modifiedList, ...allBubblesBeforeInput]);
  };


  const fetchFormBot = async () => {
    if (!formBotId) return;

    try {
      const res = await getFormBotAPI(formBotId);
      if (res.data.message === 'success') {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const inputType = (item) => {
    if(item.type === 'user-input-text'){
      return  <input type="text" placeholder={`${formatName(item.type.split('-')[1])} ${formatName(item.type.split('-')[2])}`} onChange={(e) => setInputValue(e.target.value)} />
    }
    if(item.type === 'user-input-number'){
      return  <input type="text" placeholder={`${formatName(item.type.split('-')[1])} ${formatName(item.type.split('-')[2])}`} onChange={(e) => setInputValue(e.target.value)} />
    }
    if(item.type === 'user-input-email'){
      return  <input type="email" placeholder={`${formatName(item.type.split('-')[1])} ${formatName(item.type.split('-')[2])}`} onChange={(e) => setInputValue(e.target.value)} />
    }
    if(item.type === 'user-input-phone'){
      return  <input type="phone" placeholder={`${formatName(item.type.split('-')[1])} ${formatName(item.type.split('-')[2])}`} onChange={(e) => setInputValue(e.target.value)} />
    }
    if(item.type === 'user-input-date'){
      return  <input type="date" placeholder={`${formatName(item.type.split('-')[1])} ${formatName(item.type.split('-')[2])}`} onChange={(e) => setInputValue(e.target.value)} />
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

  const userInputJSX = (item, index) => {
    return (
      <div key={index} className='form-bot-user-input'>
        {
          item.type === 'user-input-button' ? <button className='submit-button' onClick={storeChatBotData} >{item.value}</button> :
          item.value ?
            <div className='user-entered-value' placeholder={`${formatName(item.type.split('-')[1])} ${formatName(item.type.split('-')[2])}`} >{item.value}</div> :
            <>
              {inputType(item)}
              <button onClick={handleClickOnSendTheUserInput} ><RiSendPlane2Line /></button>
            </>
        }
      </div>
    )
  }

  const handleClickOnSendTheUserInput = () => {
    if(inputValue.trim().length == 0){
      alert('Please fill the input field before sending your message.');
      return;
    }
    appendAllBubblesBeforUserInput();
  };

  const storeChatBotData = async () => {
    try {
      const payload = {
        formBotId,
        elements: chatBot
      }
      const res = await storeFormBotAPI(payload)
      console.log("🚀 ~ storeChatBotData ~ res:", res)
      if(res.status == 200){
        alert(res.data.message)
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchFormBot();
  }, [])

  useEffect(() => {
    if (data.length) {
      appendAllBubblesBeforUserInput();
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
    </div>
  )
}

export default FormBot