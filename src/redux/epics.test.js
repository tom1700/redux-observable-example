import { StateObservable, ActionsObservable } from 'redux-observable';
import { hot, cold } from 'jest-marbles';
import { fetchBigTrades } from './epics';
import { updateBigTrade, fetchBigTrades as fetchBigTradesAction } from './actions';

describe('redux/epics', () => {
    it('Should emit actions in correct order', () => {
        const givenActions = '-a--';
        const actions = {
            a: fetchBigTradesAction(),
            b: updateBigTrade({ data: { q: '1.5' } }),
            c: updateBigTrade({ data: { q: '2.5' } })
        };
        const expectedActions = '--b---c';
        const givenStates = 's-';
        const states = {
            score: {
                team1: 0,
                team2: 0,
            },
        };
        const tradesSocketMock$ = cold('-a-b-c', {
            a: { data: { q: '1.5' } },
            b: { data: { q: '0.5' } },
            c: { data: { q: '2.5' } }
        });

        const state$ = new StateObservable(
            hot(givenStates, states),
            Object.values(states)[0],
        );
        const actions$ = new ActionsObservable(hot(givenActions, actions));
        const target$ = cold(expectedActions, actions);

        expect(
            fetchBigTrades(actions$, state$, { tradesSocket$:tradesSocketMock$ }),
        ).toBeObservable(target$);
    });
});