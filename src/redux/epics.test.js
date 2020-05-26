import { StateObservable, ActionsObservable } from 'redux-observable';
import { hot, cold } from 'jest-marbles';
import { fetchScoresEpic } from './epics';
import { FETCH_SCORES, UPDATE_SCORE } from './actions';

describe('redux/epics', () => {
    it('Should emit actions in correct order', () => {
        const givenActions = '-a--';
        const actions = {
            a: { type: FETCH_SCORES },
            b: { type: UPDATE_SCORE, payload: { score: { team1: 0, team2: 1 } } },
            c: { type: UPDATE_SCORE, payload: { score: { team1: 1, team2: 1 } } }
        };
        const expectedActions = '-b-c';
        const givenStates = 's-';
        const states = {
            score: {
                team1: 0,
                team2: 0,
            },
        };
        const scoresMock$ = cold('-a-b-c', {
            a: { scores: { team1: 0, team2: 1 }, notInterestingUpdate: 'bla' },
            b: { scores: { team1: 0, team2: 1 }, notInterestingUpdate: 'blabla' },
            c: { scores: { team1: 1, team2: 1 }, notInterestingUpdate: 'blablabla' }
        });
        
        const state$ = new StateObservable(
            hot(givenStates, states),
            Object.values(states)[0],
        );
        const actions$ = new ActionsObservable(hot(givenActions, actions));
        const target$ = cold(expectedActions, actions);

        expect(
            fetchScoresEpic(actions$, state$, context.mockDeps),
        ).toBeObservable(target$);
    });
});