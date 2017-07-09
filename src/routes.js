import React from 'react'
import { Route } from 'react-router'

import App from './components/app'
import Main from './views/main'
import GithubOAuth from './views/github-oauth'

const routes = () => (
  <Route component={App} >
    <Route path="/" component={Main} />
    <Route path="/oauth/github" component={GithubOAuth} />
  </Route>
)

export default routes
