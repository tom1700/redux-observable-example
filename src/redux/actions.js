export const UPDATE_BIG_TRADE = 'UPDATE_BIG_TRADE';
export const FETCH_BIG_TRADES = 'FETCH_BIG_TRADES';
export const STOP_BIG_TRADES_FETCHING = 'STOP_BIG_TRADES_FETCHING';

export const fetchBigTrades = () => ({
    type: FETCH_BIG_TRADES
})

export const stopBigTradesFetching = () => ({
    type: STOP_BIG_TRADES_FETCHING
})

export const updateBigTrade = (payload) => ({
    type: UPDATE_BIG_TRADE,
    payload: payload.data.q
})