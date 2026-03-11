import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

const WorkPost = lazy(() => import('./pages/WorkPost'))
const Services = lazy(() => import('./pages/Services'))
const Page = lazy(() => import('./pages/Page'))
const NotFound = lazy(() => import('./pages/NotFound'))

const App = () => {
  return (
    <>
      <Suspense fallback={<div className="loading" role="status" aria-label="Loading"></div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug/" element={<WorkPost />} />
            <Route path="/services/" element={<Services />} />
            <Route path="/:slug/" element={<Page />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
