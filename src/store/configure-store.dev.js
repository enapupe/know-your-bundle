import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import promise from 'redux-promise-middleware'
import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'
import { errorMiddleware } from '@cheesecakelabs/boilerplate/middlewares'

import rootReducer from '../modules/reducers'

const logger = createLogger({
  level: 'info',
  collapsed: true,
})

const router = routerMiddleware(browserHistory)

/**
 * Creates a preconfigured store.
 */
const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(
        thunk,
        errorMiddleware,
        promise(),
        router,
        logger,
      ),
      // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../modules/reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('../modules/reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  // This updates our main styles.css file:
  const reporter = window.__webpack_hot_middleware_reporter__ // eslint-disable-line no-underscore-dangle,max-len
  const success = reporter.success
  const DEAD_CSS_TIMEOUT = 900

  reporter.success = () => {
    document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
      const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`)
      const newLink = link.cloneNode()
      newLink.href = nextStyleHref

      link.parentNode.appendChild(newLink)
      setTimeout(() => {
        if (link) {
          link.parentNode.removeChild(link)
        }
      }, DEAD_CSS_TIMEOUT)
    })
    success()
  }

  return store
}

export default configureStore
