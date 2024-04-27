import http from 'http'
import Koa from 'koa'
import Router from 'koa-router'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import { ITestServer, ITestServerOptions } from '../types'

export const createTestServer = (options: ITestServerOptions = {}) => {
  const server: ITestServer = new Koa()
  const router: any = new Router()
  server.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }))
  server.use(json({}))

  if (options.routes) {
    options.routes.forEach((route) => {
      router[route.method](route.url, route.handler)
    })
    server.use(router.routes())
  }

  server.http = http.createServer(server.callback())

  server.listen = () =>
    new Promise((resolve) => {
      server.http.listen()
      resolve(server)
    }).then(() => {
      server.port = server.http.address().port
      server.url = `http://localhost:${server.port}`
    })

  server.close = () =>
    new Promise((resolve) => {
      server.http.close()
      resolve(server)
    }).then(() => {
      server.port = undefined
      server.url = undefined
    })

  return server.listen().then(() => server)
}
