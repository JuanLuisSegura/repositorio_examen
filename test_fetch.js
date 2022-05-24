jest.mock('node-fetch');
const fetch = require('node-fetch')
const getPokemon = require('./get_pokemon')

describe('mocking fetch', () => {

  it('mocks fetch', async () => {
    fetch.mockResolvedValueOnce('default')
    let foo = await fetch()
    expect(foo).toBe('default')
  });

  it('mocks fetch twice', async () => {
    fetch.mockResolvedValueOnce('first call')
    fetch.mockResolvedValueOnce('second call')
    let foo = await fetch()
    let bar = await fetch()
    expect(foo).toBe('first call')
    expect(bar).toBe('second call')
  });

  it('works in a module', async () => {

    const response = {
      status: 200,
      json: () => {
        return {name: 'ditto'}
      }
    }
    fetch.mockResolvedValueOnce(response);

    const pokemon = await getPokemon();
    expect(pokemon.name).toBe('ditto')
  });
});