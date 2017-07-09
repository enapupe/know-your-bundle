import React from 'react'
import { Route } from 'react-router'

import App from './components/app'
import Main from './views/main'

const routes = () => (
  <Route component={App} >
    <Route path="/" component={Main} />
  </Route>
)

export default routes
