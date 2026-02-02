const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider-baileys')
const MockAdapter = require('@bot-whatsapp/database-memory')

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()

    // Servidor HTTP simple para mantener vivo el bot en Render/Railway
    const http = require('http')
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end('Bot de WhatsApp activo! 🚀')
    })
    const PORT = process.env.PORT || 3000
    server.listen(PORT, () => console.log(`🌍 Server Keep-Alive running on port ${PORT}`))
}

main()
