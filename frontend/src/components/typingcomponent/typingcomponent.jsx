import React, { useEffect, useState,useRef } from 'react';

const TypingComponent = ({id,clasName, phrases, loop = true, typingSpeed = 100, pause = 1000, deletingSpeed = 50 }) => {
  const element = useRef(null)
  const [text, setText] = useState("")
  const [show,setShow] = useState(true)

  const sleep = (milliSeconds) => {
    return new Promise((resolve) => {
        setTimeout(resolve, milliSeconds) // A helper function to pause execution for a specified time
    })
}

const typeAndDelete = async () => {
      let repeat = true;
      let curPhraseIndex = 0
      while (repeat) {
        let curPhrase = phrases[curPhraseIndex];
        for (let i = 0; i < curPhrase.length; i++) {
          setShow(true)
          await sleep(typingSpeed);
         setText(curPhrase.substring(0, i + 1))
        }
        await sleep(pause);
  
        for (let i = curPhrase.length; i > 0; i--) {
          if (i <= 1) {
            setText('\u00A0')
            setShow(false)
            continue;
          }
          await sleep(deletingSpeed);
          setText(curPhrase.substring(0, i))
        }
  
        if (curPhraseIndex === phrases.length - 1) {
          if (!loop) {
            break;
          }
          curPhraseIndex = 0;
        } else {
          curPhraseIndex++;
        }
      }
    }
    useEffect(() => {
      typeAndDelete()  //Calling the function only when mounting
    }, [])
    

  return <span className={clasName} id={id} ref={element} style={!show?{visibility:"hidden"}:{visibility:"visible"}}>{text}</span>;
};

export default TypingComponent;
