import { memo, useCallback, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Autocomplete = ({names}) => {
  const [state, setState] = useState({ inputVal: '' });

  const handleInput = useCallback((event) => {
    setState({inputVal: event.currentTarget.value});
  }, []);

  const matches = useCallback(() => {
    const matches = [];
    if (state.inputVal.length === 0) {
      return names;
    }

    names.forEach(name => {
      const sub = name.slice(0, state.inputVal.length);
      if (sub.toLowerCase() === state.inputVal.toLowerCase()) {
        matches.push(name);
      }
    });

    if (matches.length === 0) {
      matches.push('No matches');
    }

    return matches;
  }, [state.inputVal, names]);

  const selectName = useCallback((event) => {
    const name = event.currentTarget.innerText;
    setState({inputVal: name});
  }, []);
    const results = matches().map((result, i) => {
      return (
        <li key={i} onClick={selectName}>{result}</li>
      );
    });

    return(
      <div>
        <h1>Autocomplete</h1>
        <div className='auto'>
          <input
            onChange={handleInput}
            value={state.inputVal}
            placeholder='Search...'/>
          <ul>
            <ReactCSSTransitionGroup
              transitionName='auto'
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
              {results}
            </ReactCSSTransitionGroup>
          </ul>
        </div>
      </div>
    );
  }

export default memo(Autocomplete);
