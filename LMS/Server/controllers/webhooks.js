export const clerkWebhooks = async (req, res, next) => {
    try {
        // Process Clerk webhook
        console.log('Clerk webhook received')
        
        // TODO: Add your Clerk webhook processing logic here
        // For now, just return success
        res.status(200).json({ success: true, message: 'Webhook processed' })
    } catch (err) {
        console.error('Webhook processing error:', err)
        res.status(500).json({ error: 'Webhook processing failed' })
    }
}
