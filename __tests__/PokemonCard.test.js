/** @jest-environment jsdom */
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { PokemonCard } from '../src/components/PokemonCard';
import { MOCK_ONE_POKEMON_DATA } from '../mocks/mockPokemonData';
const initialFetch = window.fetch;


describe('PokemonCard', () => {

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve(MOCK_ONE_POKEMON_DATA),
      })
    );
  });
  afterEach(() => {
    window.fetch = initialFetch;
  });

  it('Should render', async () => {
    await act(async () => {
      render(<PokemonCard name={MOCK_ONE_POKEMON_DATA.species.name} url={MOCK_ONE_POKEMON_DATA.species.url} />);
    });
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Abilities:')).toBeInTheDocument();
  });

});
