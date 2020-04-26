<template>
  <v-container fluid fill-height>
    <GameDetails
            :game=game
            :companies="companies"
            :coverURL="coverURL"
            :relatedGames="relatedGames"
            :isLoaded="isLoaded"
            v-on:goToDetail="goToDetail"
            :relatedLoaded="relatedLoaded"
            :ratingLoaded="ratingLoaded"

    />
  </v-container>
</template>

<script>
  // @ is an alias to /src
  import GameDetails from '@/components/GameDetails.vue';
  import GamesService from '@/services/GamesService';

  export default {
    name: 'Detail',
    props: {
      id: String,
    },
    data() {
      return {
        game: {},
        coverURL: '',
        relatedGames: [],
        isLoaded: false,
        relatedLoaded: false,
        ratingLoaded: false,
        companies: [],
        gameModes: [
          {
            "id": 3,
            "created_at": 1298937600,
            "name": "Co-operative",
            "slug": "co-operative",
            "updated_at": 1323216000,
            "url": "https://www.igdb.com/game_modes/co-operative"
          },
            {
              "id": 1,
              "created_at": 1298937600,
              "name": "Single player",
              "slug": "single-player",
              "updated_at": 1323216000,
              "url": "https://www.igdb.com/game_modes/single-player"
            },
            {
              "id": 2,
              "created_at": 1298937600,
              "name": "Multiplayer",
              "slug": "multiplayer",
              "updated_at": 1323216000,
              "url": "https://www.igdb.com/game_modes/multiplayer"
            },
            {
              "id": 5,
              "created_at": 1298937600,
              "name": "Massively Multiplayer Online (MMO)",
              "slug": "massively-multiplayer-online-mmo",
              "updated_at": 1323216000,
              "url": "https://www.igdb.com/game_modes/massively-multiplayer-online-mmo"
            },
            {
              "id": 4,
              "created_at": 1298937600,
              "name": "Split screen",
              "slug": "split-screen",
              "updated_at": 1323216000,
              "url": "https://www.igdb.com/game_modes/split-screen"
            }
          ],
          genres: [
            {
              "id": 13,
              "name": "Simulator",
              "color": "teal"
            },
            {
              "id": 24,
              "name": "Tactical",
              "color": "deep-purple"
            },
            {
              "id": 26,
              "name": "Quiz/Trivia",
              "color": "orange"
            },
            {
              "id": 4,
              "name": "Fighting",
              "color": "amber"
            },
            {
              "id": 15,
              "name": "Strategy",
              "color": "cyan"
            },
            {
              "id": 31,
              "name": "Adventure",
              "color": "indigo"
            },
            {
              "id": 12,
              "name": "Role-playing (RPG)",
              "color": "pink"
            },
            {
              "id": 5,
              "name": "Shooter",
              "color": "red"
            },
            {
              "id": 7,
              "name": "Music",
              "color": "purple"
            },
            {
              "id": 32,
              "name": "Indie",
              "color": "blue-grey"
            }
          ]
        };
    },
    components: {
        GameDetails,
    },
    created() {
      this.getGameDetails(this.id);
    },
    methods: {
      fixGameScore(score) {
        score = String(score);
        const fixed = score.replace(/\/\d/i, '');
        this.game.rating = Number(fixed);
      },
      getGameDetails(id) {
        GamesService.getGame(id).then(res => {
          this.game = res.data[0]
          this.parseGame();

        })
      },
      parseGame() {
        if ("cover" in this.game) {
          this.parseCover()
        }
        if ("aggregated_rating" in this.game) {
          this.game.aggregated_rating = Math.round((this.game.aggregated_rating + Number.EPSILON))
        }
        this.parseGenre();
        this.parseGameMode();
        this.parseArtworks();
        this.parseCompanies();

        this.parsePlatforms();
        this.parseAgeRatings();
        this.getRelatedGames();
        this.isLoaded = true


      },
      parseGenre() {
        if ("genres" in this.game) {
          const tempGenres = this.game.genres;
          for (let i = 0; i < this.game.genres.length; i++) {
            for (const gene of this.genres) {
              if (gene.id === this.game.genres[i]) {
                tempGenres[i] = gene.name;
                break;

              }
            }
          }
          this.game.genres = tempGenres;
        }

      },
      parseGameMode() {
        if ("game_modes" in this.game) {
          const gameModes = this.game.game_modes;
          for (let i = 0; i < gameModes.length; i++) {
            for (const mode of this.gameModes) {
              if (mode.id === gameModes[i]) {
                gameModes[i] = mode;
                break;

              }
            }
          }
          this.game.game_modes = gameModes;
        }


      },
      parseCover() {
        GamesService.getCover(this.game.cover).then(res => {
          this.coverURL = `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${res.data[0].image_id}.jpg`
        }).catch(function (error) {
          console.log(error);
        });
      },
      parseArtworks() {
        if ("artworks" in this.game) {
          GamesService.getArtworks(this.game.artworks).then(res => {
            const data = res.data;
            this.game["artworks"] = data.map(art => `https://images.igdb.com/igdb/image/upload/t_720p/${art.image_id}.jpg`)
          }).catch(function (error) {
            console.log(error)
          });
        }
      },
      parseCompanies() {
        if ("involved_companies" in this.game) {
          GamesService.getCompanies(this.game.involved_companies).then(res => {
            this.companies = res.data
            const companyNames = [];
            for (const comp of this.companies) {
              companyNames.push(comp["company"])
            }
            GamesService.getCompanyNames(companyNames).then(res => {
              for (const name of res.data) {
                for (const comp of this.companies) {
                  if (comp.company == name.id) {
                    comp.company = name.name
                  }
                }
              }
            })
          }).catch(function (error) {
            console.log(error)
          });
        }
      },
      parsePlatforms() {
        if ("platforms" in this.game) {
          GamesService.getPlatforms(this.game.platforms).then(res => {
            this.game.platforms = res.data
          }).catch(function (error) {
            console.log(error)
          });
        }
      },
      parseAgeRatings() {
        if ("age_ratings" in this.game) {
          GamesService.getAgeRatings(this.game.age_ratings).then(res => {
            this.game.age_ratings = res.data;
            this.ratingLoaded = true;
          }).catch(function (error) {
            console.log(error)
          });
        }
      },
      getRelatedGames() {

        GamesService.getRelatedGames(this.game.similar_games)
                .then(res => {
                  this.relatedGames = res.data;
                  this.parseRelatedGames();
                }).catch(function (error) {
          console.log(error);
        });

      },
      parseRelatedGames() {
        for (const game of this.relatedGames) {
          if ("aggregated_rating" in game) {
            game.aggregated_rating = Math.round((game.aggregated_rating + Number.EPSILON))
          }

        }
        let coverList = [];
        for (const game of this.relatedGames) {
          if ("cover" in game) {
            coverList.push(game.cover);
          }

        }
        if (coverList.length !== 0) {
          GamesService.getListCover(coverList).then(res => {
            const data = res.data;
            for (const game of this.relatedGames) {
              if ("cover" in game) {
                for (let index = 0; index < data.length; index++) {
                  if (data[index].id === game.cover) {
                    game["coverURL"] = `https://images.igdb.com/igdb/image/upload/t_screenshot_med/${data[index].image_id}.jpg`
                  }
                }
              }
            }
            this.relatedLoaded = true;

          }).catch(function (error) {
            console.log(error);
          });
        }


      },
      goToDetail(id) {
        this.isLoaded = false;
        this.game = {};
        this.coverURL = '';
        this.relatedGames = [];
        this.companies = [];
        this.relatedLoaded = false;
        this.ratingLoaded = false;

        this.getGameDetails(id);
      },

    },

};
</script>
