import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const opts = {
    theme: {
        themes: {
            light: {
                primary: colors.purple,
                secondary: colors.grey.darken1,
                accent: colors.shades.black,
                error: colors.red.accent3,
                background: colors.indigo.lighten5 // Added variable
            },
            dark: {
                primary: colors.blue.lighten3,
                background: colors.indigo.base // If using base color, be use to mark as such to get HEX value
            },
        },
    },
}

export default new Vuetify(opts)