import React, { useEffect, useState, useRef } from 'react'
import './App.css'

function App() {
  const loading = 'loading...'
  const dog1 = useRef(null)
  const dog2 = useRef(null)
  const [dogPrediction1, setDogPrediction1] = useState(loading)
  const [dogPrediction2, setDogPrediction2] = useState(loading)
  let net = null

  useEffect(() => {
    const loadMobileNet = async () => {
      if (window.mobilenet) {
        console.log('loading mobilenet')
        net = await window.mobilenet.load()
        console.log('loaded mobilenet')
        net.classify(dog1.current).then(dog => {
          console.log(dog[0].className, dog)
          setDogPrediction1(dog[0].className)
        })
        net.classify(dog2.current).then(dog => {
          console.log(dog[0].className, dog)
          setDogPrediction2(dog[0].className)
        })
      } else {
        setTimeout(loadMobileNet(), 1000)
      }
    }
    loadMobileNet()
  }, [])

  return (
    <div className='App'>
      <div className='App-header'>
        <img src='/dog.jpg' height={200} ref={dog1} />
        <p>Dog: {dogPrediction1}</p>
        <img src='/aussie.jpg' height={200} ref={dog2} />
        <p>Dog: {dogPrediction2}</p>
      </div>
    </div>
  )
}

export default App
