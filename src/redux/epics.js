import { combineEpics } from 'redux-observable';
import { map, concatAll, filter } from 'rxjs/operators';
import { FETCH_BIG_TRADES, STOP_BIG_TRADES_FETCHING, updateBigTrade } from './actions';

export const fetchBigTrades = ($actions, $states, deps) => {
    const { tradesSocket$ } = deps;

    return $actions.pipe(
        filter(action => [FETCH_BIG_TRADES, STOP_BIG_TRADES_FETCHING].includes(action.type)),
        map(action => {
            if (action.type === FETCH_BIG_TRADES) {
                const filteredTrades$ = tradesSocket$.pipe(
                    filter(trade => parseFloat(trade.data.q) > 1)
                );
                return filteredTrades$;
            } else {
                tradesSocket$.complete()
            }
        }),
        concatAll(),
        map(updateBigTrade)
    );
}

export const rootEpic = combineEpics(
    fetchBigTrades
);