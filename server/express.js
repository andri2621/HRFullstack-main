import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'

// #10.modules for server side rendering
import helmet from 'helmet'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import MainRouter from './../client/MainRouter'
import { StaticRouter } from 'react-router-dom'
import Template from './../template'

//comment script dibawah before building for production
import devBundle from './devBundle'

// #1. add this script to import model dan routes
import models from './models/IndexModel';
import routes from './routes/IndexRoute';


const app = express()

// parse body params and attache them to req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// use helmet spy bisa dikenali SEO
app.use(helmet())
// secure apps by setting various HTTP headers
app.use(compress())
// enable CORS - Cross Origin Resource Sharing
app.use(cors());


//comment script dibawah before building for production
 devBundle.compile(app)
const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist'))) 

// #middleware
app.use(async (req, res, next) => {
  req.context = {models};
  next();
});


// #2 add this script when you add other route
app.use('/api/regions', routes.regions);
app.use('/api/users', routes.users);
app.use('/api/emps', routes.employees);
app.use('/api/photos',routes.photos)
app.use('/api/v1', routes.uploadDownload);


// for serverside
  app.get('*', (req, res) => {
  
  const context = {}
  const markup = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
            <MainRouter/>
      </StaticRouter>
  );
    if (context.url) {
      return res.redirect(303, context.url)
    } 
    
    res.status(200).send(Template())
});   


// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"error" : err.name + ": " + err.message})
  }else if (err) {
    res.status(400).json({"error" : err.name + ": " + err.message})
    console.log(err)
  }
})

export default app
