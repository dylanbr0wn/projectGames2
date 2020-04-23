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
  getCompanies(companyList) {
    return Api().get('gameCompanies/', {
      params: {
        companyList: companyList
      }
    })
  },
  getCompanyNames(companyNames) {
    return Api().get('companyNames/', {
      params: {
        companyNames: companyNames
      }
    })
  },
  getRelatedGames(gameList) {
    return Api().get('relatedGames/', {
      params: {
        gameList: gameList
      }
    })
  },
  getCover(cover) {
    return Api().get('cover/', {
      params: {
        cover: cover
      }
    })
  },
  getArtworks(artworks) {
    return Api().get('artworks/', {
      params: {
        artworks: artworks
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
// fetchGames() {
//   return Api().get('gameList')
// },
//
// updatePost(params) {
//   return Api().put('game/' + params.id, params)
// },
//

//
// deletePost(id) {
//   return Api().delete('game/' + id)
// },

