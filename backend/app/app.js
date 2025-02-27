const express = require('express')
require('express-async-errors')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const expressJSDocSwagger = require('express-jsdoc-swagger')
const path = require('path')
const options = require('./utils/swaggerOptions')
const userRoutes = require('./routes/users.routes')
const mediaRoutes = require('./routes/media.routes')
const locationRoutes = require('./routes/location.routes')
const contactRoutes = require('./routes/contact.routes')
const chatRoutes = require('./routes/chat.routes')
const logRoutes = require('./routes/log.routes')

const logger = require('./middleware/handlerLogger')

// const constantsRoute = require("./routes/constants.routes");
const adsRoutes = require('./routes/ads.routes')
const authenticateToken = require('./middleware/verifyToken')

const { loadConstants } = require('./utils/CONSTANTS')

// Check the connection with the DB
loadConstants()

// Initiate the app
const app = express()

app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use('/public', express.static(path.join(__dirname, 'public')))

// Middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json({ limit: '50mb', type: 'application/json' }))

// API
expressJSDocSwagger(app)(options)
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Simple, initial route
app.get('/', (req, res) => {
  res.json({ message: 'ITA DIRECTORY API' })
})

// Routes
// app.use("/", constantsRoute);
app.use('/ads', logger, adsRoutes)
app.use('/users', userRoutes)
app.use('/media', mediaRoutes)
app.use('/location', locationRoutes)
app.use('/contact', contactRoutes)
app.use('/chat', authenticateToken, chatRoutes)
app.use('/log', logRoutes)

module.exports = app
