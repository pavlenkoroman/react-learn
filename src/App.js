import React, {useState} from 'react';
import './App.css';
import Filters from './components/Filters/Filters';
import Logo from './assets/Logo.svg'
import MainContent from './components/MainContent/MainContent';
const App = () => {

  const [currentPortion, setCurrentPortion] = useState(1);
  const [dataPerPage] = useState(30);

  const [priceState, setPriceState] = useState(false)
  const [durationState, setDurationState] = useState(false)

  return (
    <div className='app'>
      <img src={Logo} className='logo' alt={'logo'}></img>
      <Filters className='filters' setCurrentPortion={setCurrentPortion} setPriceState={setPriceState} setDurationState={setDurationState}/>
      <MainContent className='mainContent' currentPortion={currentPortion} setCurrentPortion={setCurrentPortion} dataPerPage={dataPerPage} 
      setPriceState={setPriceState} setDurationState={setDurationState} priceState={priceState} durationState={durationState}/>
    </div>
    
  )
}

export default App;
