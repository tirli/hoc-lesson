import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';
import ReactTestUtils from 'react-addons-test-utils'

import * as api from '../../api/omdb';

describe('App', () => {
  it('renders without crashing', () => {
    window.performance = window.Date;
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('shallow renders as expected without snapshot', () => {
    const app = shallow(<App />).html();
    expect(app).toBe([
      '<div class="App">',
        '<div class="App-header">',
        '<img src="test-file-stub" class="App-logo" alt="logo"/>',
        '<form><input value=\"\" name=\"search\" class=\"test-input\"/><button class=\"test-search-btn\"> Search </button></form>',
        '</div>',
      '</div>',
    ].join(''));
  });

  it('shallow renders as expected', () => {
    const app = shallow(<App />).html();
    expect(app).toMatchSnapshot();
  });

  it('call search api after onSearch', () => {
    api.search = jest.fn(() => Promise.resolve());
    const app = mount(<App />);
    app.instance().onSearch('kate');
    expect(api.search).toHaveBeenCalledTimes(1);
    expect(api.search).toHaveBeenCalledWith('kate');
  });

})


