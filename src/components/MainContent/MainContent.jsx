import React from 'react';
import Tabs from './Tabs/Tabs';
import TicketsList from './TicketsList/TicketsList';
import { connect } from 'react-redux';
import { saveSearchId, getTicketsList, sortByPrice, sortByDuration, renderAllTickets } from '../../redux/app-reducer';

const MainContent = (props) => {
  return (
    <div>
      <Tabs setCurrentPortion={props.setCurrentPortion} tickets={props.tickets} sortByDuration={props.sortByDuration} sortByPrice={props.sortByPrice}
      setPriceState={props.setPriceState} setDurationState={props.setDurationState} priceState={props.priceState} durationState={props.durationState}/>
      <TicketsList ticketsToRender={props.ticketsToRender} searchId={props.searchId} tickets={props.tickets} saveSearchId={props.saveSearchId} getTicketsList={props.getTicketsList}
                    currentPortion={props.currentPortion} setCurrentPortion={props.setCurrentPortion} dataPerPage={props.dataPerPage} error={props.error} renderAllTickets={props.renderAllTickets}/>
    </div>
    
  )
}

const mapStateToProps = (state) => {
  return {
    tickets: state.appReducer.tickets,
    searchId: state.appReducer.searchId,
    ticketsToRender: state.appReducer.ticketsToRender,
    error: state.appReducer.error
  }
}
export default connect(mapStateToProps, { saveSearchId, getTicketsList, sortByPrice, sortByDuration, renderAllTickets})(MainContent);
