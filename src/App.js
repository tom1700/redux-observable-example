import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBigTrades, stopBigTradesFetching } from './redux/actions';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const lastBigTradeDate = useSelector((state) => state.bigTrade.date);
  const lastBigTradeAmount = useSelector((state) => state.bigTrade.amount);
  const isWatching = useSelector(state => state.isWatching);
  const handleClick = useCallback(() => {
    if (isWatching) {
      dispatch(stopBigTradesFetching());
    } else {
      dispatch(fetchBigTrades());
    }
  }, [dispatch, isWatching]);

  return (
    <div className="app">
      <h1>Crypto watcher</h1>
      <div>
        <h2>Big trades</h2>
        <p>Last trade with amount bigger than 1BTC. <br/>(You might need to wait few minutes)</p>
        <p>
          <br/>
          time: {lastBigTradeDate}
          <br/>
          amount: {lastBigTradeAmount}
        </p>
        <button onClick={handleClick}>{isWatching ? 'Stop watching' : 'Start watching'}</button>
      </div>
    </div>
  );
}

export default App;
