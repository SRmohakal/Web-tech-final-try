import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'

//initialize express
const app = express()

//Middleware
app.use(cors())

// Connection state tracking
let dbConnected = false

// Connect to database on first request (lazy connection)
const ensureDBConnection = async () => {
    if (!dbConnected) {
        try {
            await connectDB()
            dbConnected = true
        } catch (err) {
            console.error('Database connection failed:', err.message)
            throw err
        }
    }
}

//Routes 
app.get('/', (req, res)=> res.send("API Working"))

app.post('/clerk', express.json(), async (req, res, next) => {
    try {
        await ensureDBConnection()
        clerkWebhooks(req, res, next)
    } catch (err) {
        console.error('Clerk webhook error:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err)
    res.status(500).json({ error: 'Internal server error' })
})

// Export for Vercel serverless
export default app

// Also support local development
const PORT = process.env.PORT || 5000
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}
