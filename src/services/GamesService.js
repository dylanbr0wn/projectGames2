import Api from '@/services/Api'

export default {
  fetchGames () {
    return Api().get('api/gameList')
  },
  fetchSomeGames () {
    return Api().get('api/someGames')
  },

  addGame (params) {
    return Api().post('api/game', params)
  },

  updatePost (params) {
    return Api().put('api/game/' + params.id, params)
  },

  getGame (id) {
    return Api().get('api/game/' + id)
  },

  deletePost (id) {
    return Api().delete('api/game/' + id)
  },

  searchGame (query) {
      return Api().get('api/search/', {params:{'search': query}})
  }
}