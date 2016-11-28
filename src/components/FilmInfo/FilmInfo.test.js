import React from 'react';
import ReactDOM from 'react-dom';
import { FilmInfo } from './FilmInfo';
import { shallow, mount } from 'enzyme';
import ReactTestUtils from 'react-addons-test-utils'

import * as api from '../../api/omdb';

describe('FilmInfo', () => {
  it('shallow renders as expected', () => {
    const filmInfo = shallow(<FilmInfo />).html();
    expect(filmInfo).toMatchSnapshot();
  });

  it('componentWillReceiveProps should make request when itemId changed', async () => {
    const p = Promise.resolve('test result')
    api.getById = jest.fn(() => p);
    const handleLoading = jest.fn();
    const handleItem = jest.fn();
    const app = mount(<FilmInfo windowWidth={1920} itemId={null} />);
    const newProps = { itemId: 12, handleLoading, handleItem };

    await app.instance().componentWillReceiveProps(newProps);

    expect(api.getById).toHaveBeenCalledTimes(1);
    expect(handleLoading).toHaveBeenCalledTimes(2);
    expect(handleLoading).toHaveBeenCalledWith(true);
    expect(handleLoading).lastCalledWith(false);
    expect(handleItem).toHaveBeenCalled();
    expect(handleItem).toHaveBeenCalledWith('test result');
  })

  it('componentWillReceiveProps should not do anything if itemId is not changed', async () => {
    api.getById = jest.fn(() => Promise.resolve('test result'));
    const handleLoading = jest.fn();
    const handleItem = jest.fn();
    const app = mount(<FilmInfo windowWidth={1920} itemId={3} />);
    const newProps = { itemId: 3, handleLoading, handleItem };

    await app.instance().componentWillReceiveProps(newProps);

    expect(api.getById).toHaveBeenCalledTimes(0);
    expect(handleLoading).toHaveBeenCalledTimes(0);
    expect(handleItem).toHaveBeenCalledTimes(0);
  })

})

