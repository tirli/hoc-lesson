import React from 'react';
import SearchField from './SearchField';
import { shallow, mount } from 'enzyme';

describe('SearchField', () => {
  it('shallow renders as expected', () => {
    const search = shallow(<SearchField />).html();
    expect(search).toMatchSnapshot();
  });

  it('calls handleSubmit on button click', () => {
    const mockSearch = jest.fn();
    const search = mount(<SearchField onSearch={mockSearch} />);
    search.setState({ value: 'test' })
    search.find('button').simulate('click');
    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(mockSearch).toHaveBeenCalledWith('test');
  });

  it('calls setState after input change', () => {
    const setState = jest.fn();
    const search = mount(<SearchField />);
    search.instance().setState = setState;
    search.find('input').simulate('change', { target: { value: 'test' } });
    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith({ value: 'test' });
  });
})

