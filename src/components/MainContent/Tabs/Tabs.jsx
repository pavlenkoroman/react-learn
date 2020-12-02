import React from 'react';
import style from './Tabs.module.css';

const Tabs = (props) => {
  

  const priceSorting = () => {
    props.setPriceState(true);
    props.setDurationState(false);
    props.sortByPrice();
    props.setCurrentPortion(1);
  }

  const durationSorting = () => {
    props.setDurationState(true);
    props.setPriceState(false);
    props.sortByDuration();
    props.setCurrentPortion(1);
  }

  return (
    <div className={style.tabsContainer}>
      <button className={props.priceState ? style.active : ''} onClick={priceSorting}>Самый дешевый</button>
      <button className={props.durationState ? style.active : ''} onClick={durationSorting}>Самый быстрый</button>
    </div>
  )
}

export default Tabs;
