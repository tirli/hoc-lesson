const baseUrl = 'http://www.omdbapi.com/?';

export function search(title) {
  return fetch(`${baseUrl}s=${title}&r=json`)
    .then((res) => res.json())
    .then((result) => result.Search.map((item) => ({
      ...item,
      Poster: item.Poster === 'N/A' ? null : item.Poster,
    })))
  ;
}

export function getById(id, plotType = 'short') {
  return fetch(`${baseUrl}i=${id}&r=json&plot=${plotType}`)
    .then((res) => res.json())
    .then(result => {
      if (result.Error) throw new Error(result.Error);
      return result;
    })
};
