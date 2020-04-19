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

  getListCover(coverList) {
    return Api().get('listCover/', {
      params: {
        coverList: coverList
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
  }
}
// fetchGames() {
//   return Api().get('gameList')
// },
//
// updatePost(params) {
//   return Api().put('game/' + params.id, params)
// },
//
// getGame(id) {
//   return Api().get('game/' + id)
// },
//
// deletePost(id) {
//   return Api().delete('game/' + id)
// },

