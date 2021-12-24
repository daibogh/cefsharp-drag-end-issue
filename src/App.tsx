import React, {useCallback, useLayoutEffect, useRef} from 'react';
import {debounce} from 'lodash'
import './App.css';

function App() {
  const draggableRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement)
  const logRef = useRef<HTMLPreElement>(null as unknown as HTMLPreElement)

  const onDropCallback = useCallback((event) => {
    logRef.current.textContent = logRef.current.textContent + '\n' + 'drop'

  },[])
  useLayoutEffect(() => {
    draggableRef.current.addEventListener('dragend', (event) => {
      logRef.current.textContent = logRef.current.textContent + '\n' + 'dragend'
    })
  },[])
  const log = useCallback(debounce(() => {
    logRef.current.textContent = logRef.current.textContent + '\n' + 'dragover'
  }, 100),[])
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    log()
  },[])
  return (
      <>
    <div className="App">
      <div style={{border: '1px solid red', width: 60, height: 20}} draggable={true} ref={draggableRef}>test</div>
      <div style={{height: 200, width: 400, border: '1px solid grey', bottom: 0}} onDrop={onDropCallback} onDragOver={onDragOver}/>
    </div>
    <pre ref={logRef}/>
      </>
  );
}

export default App;
