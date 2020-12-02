import React from 'react';
import Ticket from './Ticket/Ticket';
import { useEffect, useState } from 'react';
import { Pagination } from './Pagination/Pagination';

const TicketsList = ({saveSearchId, getTicketsList, searchId, error, renderAllTickets, tickets, ticketsToRender, currentPortion, dataPerPage, setCurrentPortion}) => {
  useEffect(() => {
    saveSearchId()
  })

  useEffect(() => {
    getTicketsList(searchId)
  }, [searchId !== null, error != null])

  useEffect(() => {
    renderAllTickets()
  }, [tickets.length])

  const indexOfLastPortion = currentPortion * dataPerPage;
  const indexOfFirstPortion = indexOfLastPortion - dataPerPage;
  const currentDataToRender = ticketsToRender.slice(indexOfFirstPortion, indexOfLastPortion);

  const paginate = (number) => setCurrentPortion(number)

  let ticketsList = currentDataToRender.map(

    (ticket, index) => {
      return (
        <Ticket key={index} price={ticket.price} segments={ticket.segments} carrier={ticket.carrier} />
      )
    }
  )
  return (
    <div>
      <Pagination dataPerPage={dataPerPage} totalData={ticketsToRender.length} paginate={paginate}/>
      {ticketsList}
      <Pagination dataPerPage={dataPerPage} totalData={ticketsToRender.length} paginate={paginate}/>
    </div>

  )
}

export default (TicketsList);
