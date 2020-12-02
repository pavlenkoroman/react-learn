import React from 'react';
import style from './ticket.module.css';


const Ticket = (props) => {
    let segmentsList = props.segments.map(
        (segment) => {
            let date = new Date(segment.date)

            let calculateDestinationTime = (hours, minutes, duration) => {
                let destinationTimeInMinutes = (hours * 60) + minutes + duration
                let destinationHour = Math.floor(destinationTimeInMinutes / 60)
                let destinationMinutes = destinationTimeInMinutes - (destinationHour * 60)

                if(destinationHour > 24) {
                    destinationHour = destinationHour - 24
                }

                return {
                    destinationHour,
                    destinationMinutes
                }
            }
            let destinationTime = calculateDestinationTime(date.getHours(), date.getMinutes(), segment.duration)

            let numberOfStops = (stopsArray) => {
                if (stopsArray.length === 0) {
                    return ('нет пересадок')
                }
                else if (stopsArray.length === 1) {
                    return ('1 пересадка')
                }
                else if (stopsArray.length === 2) {
                    return ('2 пересадки')
                }
                else if (stopsArray.length === 3) {
                    return ('3 пересадки')
                }
                else return ('больше 3-х пересадок')
            }

            let correctTimeDisplay = (hours,minutes) => {
                if (minutes < 10) {
                    return (`${hours}:0${minutes}`)
                } 
                else return (`${hours}:${minutes}`)
            }

            return (
                <div className={style.contentContainer}>
                    <div className={style.contentBlock}>
                        <h2>{segment.origin} - {segment.destination}</h2>
                        <p>{correctTimeDisplay(date.getHours(), date.getMinutes())} - {correctTimeDisplay(destinationTime.destinationHour, destinationTime.destinationMinutes)} </p>
                    </div>

                    <div className={style.contentBlock}>
                        <h2>В ПУТИ</h2>
                        <p>{correctTimeDisplay(Math.floor(segment.duration / 60), segment.duration - ((Math.floor(segment.duration / 60)) * 60))}</p>
                    </div>

                    <div className={style.contentBlock}>
                        <h2>{numberOfStops(segment.stops)}</h2>
                        <p>{segment.stops.join(', ')}</p>
                    </div>
                </div>
            )
        }
    )

    return (
        <div className={style.ticket}>
            <div className={style.ticketHeader}>
                <h1>{props.price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} Р</h1>
                <img src={`//pics.avs.io/99/36/${props.carrier}.png`} alt={'avia'} />
            </div>

            {segmentsList}
        </div>
    )
}


export default Ticket;