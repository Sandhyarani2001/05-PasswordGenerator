import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState()
  

  // useRef - reference value
  const passwordRef = useRef(null);

// useCallback - method optimize/memorize
  const passwordGenerator = useCallback(()=> {
    let pass= ""
    let str=
    " ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if(charAllowed) str += "`~!@#$%^&*(){}[]?"

    // number generator
    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }
    setPassword(pass)

  }, [length,
  numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    // select password to know its copied for ui
    passwordRef.current?.select();
    // pasrd selected range 
    passwordRef.current?.setSelectionRange(0,50)
    // copy the value of pasword
    window.navigator.clipboard.writeText(password)
  },[password])

  // useEffect - if dependincies changes then re-run the method
  useEffect(()=>{
    passwordGenerator()
  }, [length,
    numberAllowed, charAllowed, passwordGenerator])

  return (
   <>
    <div className="w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 py-3 my-8 text-orange-300 bg-gray-700
    ">
    {/* Heading */}
    <h1 className='text-white text-center my-3
    '>Password Generator</h1>
      <div className='flex shadow rounded-lg
       overflow-hidden mb-4'>
       {/* Input text */}
        <input
         type="text"
         value={password}
         className='outline-none w-full py-1 px-3'
         placeholder='Password'
         readOnly 
        //  create reference for copy
        ref={passwordRef}
         />
         {/* Copy button */}
         <button 
         onClick={copyPasswordToClipboard}
         className={"outline-none text-white px-3 py-1.5 shrink-0 bg-blue-700 hover:bg-blue-500"}
         >Copy</button>
       </div>

       <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
        {/* range input */}
           <input 
           type="range"
           min={8}
           max={30}
           value={length}
           className='cursor-pointer'
           onChange={(e)=>{setLength(e.target.value)}}
            />
            <label htmlFor="">Length: {length}</label>
        </div>

        <div className='flex items-center gap-x-1'>
        {/* Number check box */}
           <input 
           type="checkbox"
           defaultChecked = {numberAllowed}
           id='numberInput'
           onChange={()=>{
             setNumberAllowed((prev)=> !prev);
           }}
            />
            <label htmlFor="numberInput">Numbers</label>
        </div>

        <div className='flex items-center gap-x-1'>
        {/* Char Checkbox*/}
           <input 
           type="checkbox"
           defaultChecked = {charAllowed}
           id='charcterInput'
           onChange={()=>{
             setCharAllowed((prev)=> !prev);
           }}
            />
            <label htmlFor="charcterInput">Characters</label>
        </div>
        
       </div>
       
       </div>
   </>
  )
}

export default App
