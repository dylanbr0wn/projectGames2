import Api from '@/services/Api'

export default {

  fetchSomeGames(page, itemsPerPage) {
    return Api().get('games', {
      params: {
        page: page,
        itemsPerPage: itemsPerPage
      }
    })
  },
  searchGame(query, page, itemsPerPage) {
    return Api().get('search/', {
      params: {
        search: query,
        page: page,
        itemsPerPage: itemsPerPage
      }
    })
  },
  getGame(id) {
    return Api().get('gameDetails', {
      params: {
        id: id
      }
    })
  },
}

