import { memo, useCallback, useState } from 'react';

const Headers = ({ panes, selectedPane, onTabChosen }) => {
  const selected = selectedPane;
    const headers = panes.map((pane, index) => {
      const title = pane.title;
      const klass = (index === selected ? 'active' : '');

      return (
        <li
          key={index}
          className={klass}
          onClick={() => onTabChosen(index)}>
          {title}{' '}
        </li>
      );
    });
    return (
      <ul className='tab-header'>
        {headers}
      </ul>

    );
};

const Tabs = ({ panes }) => {
  const [ state, setState ] = useState({ selectedPane: 0 });
  
  const selectTab = useCallback((num) => {
    setState({selectedPane: num});
  }, []);

  const pane = panes[state.selectedPane];

  return (
    <div>
    <h1>Tabs</h1>
    <div className='tabs'>
      <Headers
        selectedPane={state.selectedPane}
        onTabChosen={selectTab}
        panes={panes} />
      <div className='tab-content'>
        <article>
          {pane.content}
        </article>
      </div>
    </div>
  </div>
  );
}

export default memo(Tabs);
