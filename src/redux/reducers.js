import { UPDATE_BIG_TRADE, FETCH_BIG_TRADES, STOP_BIG_TRADES_FETCHING } from './actions';

const defaultState = {
    bigTrade: {
        date: null,
        amount: null
    },
    isWatching: false
}

export const rootReducer = (state=defaultState, action) => {
    switch(action.type) {
        case UPDATE_BIG_TRADE:
            return {
                ...state,
                bigTrade: {
                    date: new Date().toISOString(),
                    amount: action.payload
                }
            }
        case FETCH_BIG_TRADES:
            return {
                ...state,
                isWatching: true
            };
        case STOP_BIG_TRADES_FETCHING:
            return {
                ...state,
                isWatching: false
            }
        default:
            return state
    }
};