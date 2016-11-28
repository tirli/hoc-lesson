import React from 'react';
import { search, getById } from './omdb';
import searchFixture from './fixtures';

describe('OMDB api', () => {
  describe('search', () => {
    it('makes a request with correct args', () => {
      window.fetch = jest.fn((url) => Promise.resolve());
      search('hello');
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith('http://www.omdbapi.com/?s=hello&r=json');
    });

    it('transforms data to correct form', async () => {
      const searchFnStub = url => Promise.resolve({ json: () => searchFixture });
      window.fetch = jest.fn(searchFnStub);
      const result = await search('smth')
      expect(result).toMatchSnapshot();
    });
  })
})

