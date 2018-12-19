import Api from '@/services/Api'

export default {
  fetchGames () {
    return Api().get('gameList')
  },
  fetchSomeGames () {
    return Api().get('someGames')
  },

  addGame (params) {
    return Api().post('game', params)
  },

  updatePost (params) {
    return Api().put('game/' + params.id, params)
  },

  getGame (id) {
    return Api().get('game/' + id)
  },

  deletePost (id) {
    return Api().delete('game/' + id)
  },

  searchGame (query) {
      return Api().get('search/', {params:{'search': query}})
  }
}