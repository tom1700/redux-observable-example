import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { webSocket } from 'rxjs/webSocket';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';
import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    tradesSocket$: new webSocket('wss://stream.binance.com:9443/stream?streams=btcusdt@trade')
  }
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware))
 );

 epicMiddleware.run(rootEpic);