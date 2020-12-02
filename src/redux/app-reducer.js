import { getSearchId, getTickets } from './../api/api'

const SET_SEARCH_ID = 'APP-REDUCER-SET-SEARCH-ID';
const SET_TICKETS_LIST = 'APP-REDUCER-SET-TICKETS-LIST';
const SORT_BY_PRICE = 'APP-REDUCER-SORT-BY-PRICE';
const SORT_BY_DURATION = 'APP-REDUCER-SORT-BY-DURATION';
const REMOVE_FILTERED_PART = 'APP-REDUCER-REMOVE-FILTERED-PART';
const ADD_FILTERED_PART = 'APP-REDUCER-ADD-FILTERED-PART';
const RESET_RENDER_TRAY = 'APP-REDUCER-RESET-RENDER-TRAY';
const RENDER_ALL_TICKETS = 'APP-REDUCER-RENDER-ALL-TICKETS';
const SET_ERROR = 'APP-REDUCER-SET-ERROR';

const initialState = {
    tickets: [],
    ticketsToRender: [],
    searchId: null,
    error: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_ID: {
            return {
                ...state, searchId: action.searchId
            }
        }

        case SET_TICKETS_LIST: {
            return {
                ...state, tickets: action.ticketsList
            }
        }

        case SORT_BY_PRICE: {
            return {
                ...state, ticketsToRender: [...state.ticketsToRender].sort(
                    (a, b) => (a.price - b.price)
                )
            }
        }

        case SORT_BY_DURATION: {
            return {
                ...state, ticketsToRender: [...state.ticketsToRender].sort(
                    (a, b) => ((a.segments[0].duration + a.segments[1].duration) - (b.segments[0].duration + b.segments[1].duration))
                )
            }
        }

        case ADD_FILTERED_PART: {
            return {
                ...state,
                tickets: [...state.tickets],
                ticketsToRender: [...state.ticketsToRender, ...state.tickets.filter((ticket) => {
                    return (
                        ticket.segments[0].stops.length + ticket.segments[1].stops.length === action.numberOfTransfers
                    )
                }
                )
                ]
            }
        }

        case REMOVE_FILTERED_PART: {
            return {
                ...state,
                ticketsToRender: [...state.ticketsToRender.filter((ticket) => {
                    return (
                        ticket.segments[0].stops.length + ticket.segments[1].stops.length !== action.numberOfTransfers
                    )
                })]
            }
        }

        case RESET_RENDER_TRAY: {
            return {
                ...state,
                ticketsToRender: []
            }
        }

        case RENDER_ALL_TICKETS: {
            return {
                ...state, 
                ticketsToRender: [...state.tickets]
            }
        }

        case SET_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }

    }
    return state;
}

export const setSearchId = (searchId) => {
    return {
        type: SET_SEARCH_ID,
        searchId
    }
}

export const setTicketsList = (ticketsList) => {
    return {
        type: SET_TICKETS_LIST,
        ticketsList
    }
}

export const sortByPrice = () => {
    return {
        type: SORT_BY_PRICE
    }
}

export const sortByDuration = () => {
    return {
        type: SORT_BY_DURATION,
    }
}

export const addFilteredPart = (numberOfTransfers) => {
    return {
        type: ADD_FILTERED_PART,
        numberOfTransfers
    }
}

export const removeFilteredPart = (numberOfTransfers) => {
    return {
        type: REMOVE_FILTERED_PART,
        numberOfTransfers
    }
}

export const resetRenderTray = () => {
    return {
        type: RESET_RENDER_TRAY
    }
}

export const renderAllTickets = () => {
    return {
        type: RENDER_ALL_TICKETS
    }
}

export const setError = (error) => {
    return {
        type: SET_ERROR,
        error
    }
}

export const saveSearchId = () => {
    return (dispatch) => {
        getSearchId()
            .then(
                (response) => {
                    dispatch(setSearchId(response))
                }
            )
    }
}

export const getTicketsList = (searchId) => {
    return (dispatch) => {
        getTickets(searchId)
            .then(
                (response) => {
                    if (typeof(response) === 'object') {
                    dispatch(setTicketsList(response))
                } else {
                    dispatch(setError(response))
                }
                }
            )
    }
}


export default appReducer;