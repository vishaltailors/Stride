/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'

// Create Virtual Routes

const LayoutIndexLazyImport = createFileRoute('/_layout/')()
const LayoutWorkoutsLazyImport = createFileRoute('/_layout/workouts')()
const LayoutChangelogLazyImport = createFileRoute('/_layout/changelog')()
const LayoutActivityLazyImport = createFileRoute('/_layout/activity')()
const LayoutAboutLazyImport = createFileRoute('/_layout/about')()

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexLazyRoute = LayoutIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() => import('./routes/_layout/index.lazy').then((d) => d.Route))

const LayoutWorkoutsLazyRoute = LayoutWorkoutsLazyImport.update({
  id: '/workouts',
  path: '/workouts',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() =>
  import('./routes/_layout/workouts.lazy').then((d) => d.Route),
)

const LayoutChangelogLazyRoute = LayoutChangelogLazyImport.update({
  id: '/changelog',
  path: '/changelog',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() =>
  import('./routes/_layout/changelog.lazy').then((d) => d.Route),
)

const LayoutActivityLazyRoute = LayoutActivityLazyImport.update({
  id: '/activity',
  path: '/activity',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() =>
  import('./routes/_layout/activity.lazy').then((d) => d.Route),
)

const LayoutAboutLazyRoute = LayoutAboutLazyImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() => import('./routes/_layout/about.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/_layout/about': {
      id: '/_layout/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof LayoutAboutLazyImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/activity': {
      id: '/_layout/activity'
      path: '/activity'
      fullPath: '/activity'
      preLoaderRoute: typeof LayoutActivityLazyImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/changelog': {
      id: '/_layout/changelog'
      path: '/changelog'
      fullPath: '/changelog'
      preLoaderRoute: typeof LayoutChangelogLazyImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/workouts': {
      id: '/_layout/workouts'
      path: '/workouts'
      fullPath: '/workouts'
      preLoaderRoute: typeof LayoutWorkoutsLazyImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutIndexLazyImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

interface LayoutRouteChildren {
  LayoutAboutLazyRoute: typeof LayoutAboutLazyRoute
  LayoutActivityLazyRoute: typeof LayoutActivityLazyRoute
  LayoutChangelogLazyRoute: typeof LayoutChangelogLazyRoute
  LayoutWorkoutsLazyRoute: typeof LayoutWorkoutsLazyRoute
  LayoutIndexLazyRoute: typeof LayoutIndexLazyRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutAboutLazyRoute: LayoutAboutLazyRoute,
  LayoutActivityLazyRoute: LayoutActivityLazyRoute,
  LayoutChangelogLazyRoute: LayoutChangelogLazyRoute,
  LayoutWorkoutsLazyRoute: LayoutWorkoutsLazyRoute,
  LayoutIndexLazyRoute: LayoutIndexLazyRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof LayoutRouteWithChildren
  '/about': typeof LayoutAboutLazyRoute
  '/activity': typeof LayoutActivityLazyRoute
  '/changelog': typeof LayoutChangelogLazyRoute
  '/workouts': typeof LayoutWorkoutsLazyRoute
  '/': typeof LayoutIndexLazyRoute
}

export interface FileRoutesByTo {
  '/about': typeof LayoutAboutLazyRoute
  '/activity': typeof LayoutActivityLazyRoute
  '/changelog': typeof LayoutChangelogLazyRoute
  '/workouts': typeof LayoutWorkoutsLazyRoute
  '/': typeof LayoutIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/_layout/about': typeof LayoutAboutLazyRoute
  '/_layout/activity': typeof LayoutActivityLazyRoute
  '/_layout/changelog': typeof LayoutChangelogLazyRoute
  '/_layout/workouts': typeof LayoutWorkoutsLazyRoute
  '/_layout/': typeof LayoutIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/about' | '/activity' | '/changelog' | '/workouts' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '/about' | '/activity' | '/changelog' | '/workouts' | '/'
  id:
    | '__root__'
    | '/_layout'
    | '/_layout/about'
    | '/_layout/activity'
    | '/_layout/changelog'
    | '/_layout/workouts'
    | '/_layout/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LayoutRoute: typeof LayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  LayoutRoute: LayoutRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/_layout"
      ]
    },
    "/_layout": {
      "filePath": "_layout.jsx",
      "children": [
        "/_layout/about",
        "/_layout/activity",
        "/_layout/changelog",
        "/_layout/workouts",
        "/_layout/"
      ]
    },
    "/_layout/about": {
      "filePath": "_layout/about.lazy.jsx",
      "parent": "/_layout"
    },
    "/_layout/activity": {
      "filePath": "_layout/activity.lazy.jsx",
      "parent": "/_layout"
    },
    "/_layout/changelog": {
      "filePath": "_layout/changelog.lazy.jsx",
      "parent": "/_layout"
    },
    "/_layout/workouts": {
      "filePath": "_layout/workouts.lazy.jsx",
      "parent": "/_layout"
    },
    "/_layout/": {
      "filePath": "_layout/index.lazy.jsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
