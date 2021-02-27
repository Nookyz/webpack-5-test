import React, { Suspense, lazy } from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom"
import { createGlobalStyle } from 'styled-components'

const Home = lazy(() => import('./components/Home'))
const About = lazy(() => import('./components/About'))
const Navigation = lazy(() => import('./components/Navigation'))

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    line-height: normal;
  }
  
  html,
  body {
    height: 100%;
    margin: 0;
  }

  #root {
    max-width: 552px;
    margin: 0px auto;
    background-color: white;
    position: relative;
    height: 100%;
  }
`;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
        <Navigation />
      </Suspense>
    </BrowserRouter>
  )
}

export default App
