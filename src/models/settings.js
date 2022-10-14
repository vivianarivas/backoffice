import store from 'store'
import qs from 'qs'

const STORED_SETTINGS = storedSettings => {
  const settings = {}
  Object.keys(storedSettings).forEach(key => {
    const item = store.get(`app.settings.${key}`)
    settings[key] = typeof item !== 'undefined' ? item : storedSettings[key]
  })
  return settings
}

export default {
  namespace: 'settings',
  state: {
    ...STORED_SETTINGS({
      authProvider: 'oauth', // firebase, jwt
      logo: 'Back-office',
      locale: 'es-ES',
      flag:false,
      isSidebarOpen: false,
      isSupportChatOpen: false,
      isMobileView: false,
      isMobileMenuOpen: false,
      isMenuCollapsed: false,
      menuLayoutType: 'left', // left, top, nomenu
      routerAnimation: 'slide-fadein-up', // none, slide-fadein-up, slide-fadein-right, fadein, zoom-fadein
      menuColor: 'white', // white, dark, gray
      theme: 'default', // default, dark
      authPagesColor: 'image', // white, gray, image
      primaryColor: '#b5121b',
      leftMenuWidth: 256,
      isMenuUnfixed: false,
      isMenuShadow: false,
      isTopbarFixed: false,
      isGrayTopbar: false,
      isContentMaxWidth: false,
      isAppMaxWidth: false,
      isGrayBackground: true,
      isCardShadow: true,
      isSquaredBorders: false,
      isBorderless: false,
    }),
  },
  reducers: {
    SET_STATE: (state, action) => ({ ...state, ...action.payload }),
  },
  effects: {
    *SETTING({ payload }, { put }) {
      console.log(payload);
      const {checked}=payload
      yield put({
        type: 'SET_STATE',
        payload: {
          flag: checked,
        },
      })
    },
    *CHANGE_SETTING({ payload: { setting, value } }, { put }) {
      yield store.set(`app.settings.${setting}`, value)
      yield put({
        type: 'SET_STATE',
        payload: {
          [setting]: value,
        },
      })
    },
    *SET_PRIMARY_COLOR({ payload: { color } }, { put }) {
      color='#b5121b'
      const addStyles = () => {
        const styleElement = document.querySelector('#primaryColor')
        if (styleElement) {
          styleElement.remove()
        }
        const body = document.querySelector('body')
        const styleEl = document.createElement('style')
        const css = document.createTextNode(`:root { --kit-color-primary: ${color};}`)
        styleEl.setAttribute('id', 'primaryColor')
        styleEl.appendChild(css)
        body.appendChild(styleEl)
      }

      yield addStyles()
      yield store.set(`app.settings.primaryColor`, color)
      yield put({
        type: 'SET_STATE',
        payload: {
          primaryColor: color,
        },
      })
    },
    *SET_THEME({ payload: { theme } }, { put }) {
      const nextTheme = theme === 'dark' ? 'dark' : 'default'
      yield document.querySelector('html').setAttribute('data-kit-theme', nextTheme)
      yield store.set(`app.settings.theme`, nextTheme)
      yield put({
        type: 'SET_STATE',
        payload: {
          theme: nextTheme,
        },
      })
    },
  },
  subscriptions: {
    setup: ({ dispatch, history }) => {
      // load settings from url on app load
      const changeSettings = search => {
        const query = qs.parse(search, { ignoreQueryPrefix: true })
        Object.keys(query).forEach(key => {
          let value
          switch (query[key]) {
            case 'false':
              value = false
              break
            case 'true':
              value = true
              break
            default:
              value = query[key]
              break
          }
          if (key === 'theme') {
            dispatch({
              type: 'SET_THEME',
              payload: {
                theme: value,
              },
            })
            return
          }
          dispatch({
            type: 'CHANGE_SETTING',
            payload: {
              setting: key,
              value,
            },
          })
        })
      }
      changeSettings(history.location.search)
      history.listen(params => {
        const { search } = params
        changeSettings(search)
      })

      // set primary color on app load
      const primaryColor = () => {
        //const color = store.get('app.settings.primaryColor')
        const color='#b5121b'
        if (color) {
          dispatch({
            type: 'SET_PRIMARY_COLOR',
            payload: {
              color,
            },
          })
        }
      }
      primaryColor()

      // init theme on app load
      const initTheme = () => {
        const { search } = history.location
        const query = qs.parse(search, { ignoreQueryPrefix: true })
        const theme = query.theme || store.get('app.settings.theme') || 'default'
        dispatch({
          type: 'SET_THEME',
          payload: {
            theme: 'default',
          },
        })
      }
      initTheme()

      // detect isMobileView setting on app load and window resize
      const isMobileView = (load = false) => {
        const currentState = global.window.innerWidth < 768
        const prevState = store.get('app.settings.isMobileView')
        if (currentState !== prevState || load) {
          dispatch({
            type: 'CHANGE_SETTING',
            payload: {
              setting: 'isMobileView',
              value: currentState,
            },
          })
        }
      }

      // detect viewport width on app load and window resize
      const isMenuToggled = () => {
        const shouldToggle = global.window.innerWidth < 1024
        const prevState = store.get('app.settings.isMenuCollapsed')
        if (shouldToggle || prevState) {
          dispatch({
            type: 'CHANGE_SETTING',
            payload: {
              setting: 'isMenuCollapsed',
              value: true,
            },
          })
        }
      }

      isMobileView(true)
      isMenuToggled()
      window.addEventListener('resize', () => {
        isMobileView()
        isMenuToggled()
      })
    },
  },
}
