import React, {useState} from 'react';
import { connect } from 'react-redux';
import style from './filters.module.css';
import {addFilteredPart, removeFilteredPart, resetRenderTray, renderAllTickets } from './../../redux/app-reducer'

const Filters = (props) => {

    const [allTicketsState, setAllTicketsState] = useState(true)
    const [noTransfersState, setNoTransfersState] = useState(false)
    const [oneTransferState, setOneTransferState] = useState(false)
    const [twoTransfersState, setTwoTransfersState] = useState(false)
    const [threeTransfersState, setThreeTransfersState] = useState(false)

    const oneOfTheFiltersEnabled = noTransfersState || oneTransferState || twoTransfersState || threeTransfersState 

    const renderTicketsList = () => {
        if(oneOfTheFiltersEnabled) {
            setNoTransfersState(false)
            setOneTransferState(false)
            setTwoTransfersState(false)
            setThreeTransfersState(false)
            props.resetRenderTray()
        }
        if (allTicketsState) {
            setAllTicketsState(false)
            props.resetRenderTray()
        } else {
            setAllTicketsState(true)
            props.renderAllTickets()
        }
        props.setCurrentPortion(1)
        props.setPriceState(false)
        props.setDurationState(false)
    }

    const filterTickets = (checkboxState, changingStateFunc, filterFunc, removeFunc, numberOfTransfers, resetFunc, allTicketsState) => {
        if (allTicketsState){
            resetFunc()
            setAllTicketsState(false)
        }
        checkboxState ? changingStateFunc(false) : changingStateFunc(true)
        checkboxState ? removeFunc(numberOfTransfers) : filterFunc(numberOfTransfers)
        props.setCurrentPortion(1)
        props.setPriceState(false)
        props.setDurationState(false)
    }
    
    return (
        <div className={style.filters}>
            <h1>количество пересадок</h1>
            <label className={style.check}>
                <span className={style.container}>
                    <input type="checkbox" className={style.hiddenElement} onClick={() => renderTicketsList()}/>
                    <span className={allTicketsState? style.checked : style.styledCheckbox }></span>
                Все
                </span>
            </label>

            <label className={style.check}>
                <span className={style.container}>
                    <input type="checkbox" className={style.hiddenElement} 
                    onClick={() => {filterTickets(noTransfersState, (arg) =>{setNoTransfersState(arg)}, props.addFilteredPart, props.removeFilteredPart, 0, props.resetRenderTray, allTicketsState )}}/>
                    <span className={noTransfersState? style.checked : style.styledCheckbox }></span>
                Без пересадок
                </span>
            </label>


            <label className={style.check}>
                <span className={style.container}>
                    <input type="checkbox" className={style.hiddenElement} 
                    onClick={() => {filterTickets(oneTransferState, (arg) =>{setOneTransferState(arg)}, props.addFilteredPart, props.removeFilteredPart, 1, props.resetRenderTray, allTicketsState
                    )}}/>
                    <span className={oneTransferState? style.checked : style.styledCheckbox }></span>
                1 пересадка
                </span>
            </label>

            <label className={style.check}>
                <span className={style.container}>
                    <input type="checkbox" className={style.hiddenElement} 
                    onClick={() => {filterTickets(twoTransfersState, (arg) =>{setTwoTransfersState(arg)}, props.addFilteredPart, props.removeFilteredPart, 2, props.resetRenderTray, allTicketsState)}}/>
                    <span className={twoTransfersState? style.checked : style.styledCheckbox }></span>
                2 пересадки
                </span>
            </label>

            <label className={style.check}>
                <span className={style.container}>
                    <input type="checkbox" className={style.hiddenElement} 
                    onClick={() => {filterTickets(threeTransfersState, (arg) =>{setThreeTransfersState(arg)}, props.addFilteredPart, props.removeFilteredPart, 3, props.resetRenderTray, allTicketsState)}}/>
                    <span className={threeTransfersState? style.checked : style.styledCheckbox }></span>
                3 пересадки
                </span>
            </label>
        </div>
    )
}

const mapStateToProps = () => {
    return {
        
    }
}

export default connect(mapStateToProps, {addFilteredPart, removeFilteredPart,  resetRenderTray, renderAllTickets })(Filters)

