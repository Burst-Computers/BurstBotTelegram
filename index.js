const Telegraf = require('telegraf')
const axios = require('axios')
require('dotenv').config(); 
const config = { 
    token: process.env.TOKEN,
};

const bot = new Telegraf(config.token)
console.log("Bot online"); 


bot.start((ctx) => 
{
ctx.reply(`Hola ${ctx.from.first_name}! Bienvenido al chat \n¿Quieres ver el catálogo de productos? Desde cualquier chat escribe @burstcomp_bot y podrás hacerlo! \n \n /help muestra el menú principal en cualquier momento`);
ctx.telegram.sendMessage(ctx.chat.id, 'Menú principal 🔥',
{
    reply_markup: {
        inline_keyboard: [
            [{text: "Sitio Web 🌎", url: "www.burstcomputers.wordpresss.com"}],
            [{text: "Dirección📍", callback_data: "Direccion"}, {text: "Garantía ✅", callback_data: "Garantia"}, {text: "Horario ⌚️", callback_data: "Horario"}],
            [{text: "Precios 🔖", callback_data: "listadeprecios"}, {text: "Pagos 💵", callback_data: "pagos"}, {text: "Redes 📱", callback_data: "social"}],
            [{text: "Habla con un Operador", url: "https://t.me/burstcomputers"}],
            [{text: "Nuestro canal oficial", url: "https://t.me/burstcomputers_channel"}],
            [{text: "Cerrar el menú", callback_data: "cierramenu"}]
          
        ]
    }
})
})

bot.help((ctx) => 
{
    ctx.telegram.sendMessage(ctx.chat.id, 'Menú principal 🔥',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Sitio Web 🌎", url: "www.burstcomputers.wordpresss.com"}],
                [{text: "Dirección📍", callback_data: "Direccion"}, {text: "Garantía ✅", callback_data: "Garantia"}, {text: "Horario ⌚️", callback_data: "Horario"}],
                [{text: "Precios 🔖", callback_data: "listadeprecios"}, {text: "Pagos 💵", callback_data: "pagos"}, {text: "Redes 📱", callback_data: "social"}],
                [{text: "Habla con un Operador", url: "https://t.me/burstcomputers"}],
                [{text: "Nuestro canal oficial", url: "https://t.me/burstcomputers_channel"}],
                [{text: "Cerrar el menú", callback_data: "cierramenu"}]
              
            ]
        }
    })
})

bot.settings((ctx) => 
{
    ctx.reply('Configuración en Desarrollo');
})

bot.on('inline_query', async (ctx) => 
{
    query = ctx.inlineQuery.query
    url = `https://burst-computers.github.io/BurstBotTelegram/dictionary.json`

    console.log(url)
    
    res = await axios.get(url)

    resArr = res.data
    console.log(resArr.length)


    result = resArr.map((elem, index)=>{
        return {
            type: 'article',
            id: String(index),
            title: elem.title,
            description: elem.description,
            thumb_url: elem.photo,
            input_message_content: {
                message_text: `${elem.title}\n${elem.description} \n${elem.link}`
            },
            url: elem.link
        }
    })

    ctx.answerInlineQuery(index,result)
    
})

bot.action('Direccion', (ctx)=> {

    ctx.deleteMessage()
    ctx.telegram.sendLocation(ctx.chat.id, 10.4841881, -66.935708,),
    ctx.telegram.sendMessage(ctx.chat.id, 'Estamos ubicados en la Av. Páez del paraíso, Centro profesional paraíso, Diagonal al MC Donalds. Caracas, Distrito Capital.',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Volver al menú", callback_data: "backtomenu"}]
            ]
        }
    })
})

bot.action('Garantia', (ctx)=> {
    
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'Todos nuestros equipos incluyen 3 meses de garantía en nuestra tienda',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Volver al menú", callback_data: "backtomenu"}]
            ]
        }
    })
})

bot.action('Horario', (ctx)=> {
    
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'Informamos a nuestros clientes que temporalmente estamos atentiendo previa cita por motivos de seguridad ante la actual pandemia de COVID-19. Puede coordinar una cita con uno de nuestros representantes para observar nuestros productos o para realizar compras',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Hacer cita", url: "t.me/burstcomputers"}],
                [{text: "Volver al menú", callback_data: "backtomenu"}]
            ]
        }
    })
})

bot.action('listadeprecios', (ctx)=> {
    
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'En éste momento estamos actualizando nuestra lista, por favor intenta de nuevo mas tarde.',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Volver al menú", callback_data: "backtomenu"}]
            ]
        }
    })
})

bot.action('pagos', (ctx)=> {
    
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'Selecciona tu método de pago preferido:',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Zelle", callback_data: "Zelle"}],
                [{text: "Paypal", callback_data: "Paypal"}],
                [{text: "Banesco Panamá", callback_data: "Panama"}],
                [{text: "Transferencia en Bs", callback_data: "Bs"}],
                [{text: "Volver al menú", callback_data: "backtomenu"}]
            ]
        }
    })
})

bot.action('Zelle', (ctx)=> {
    
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'Paga a la siguiente dirección de correo: \nDMZcomputer2020@gmail.com\nJose Velazquez',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Volver atrás", callback_data: "menupagos"}]
            ]
        }
    })
})

bot.action('Paypal', (ctx)=> {
    
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'Paga a la siguiente dirección de correo: \n123partes@gmail.com',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Volver atrás", callback_data: "menupagos"}]
            ]
        }
    })
})

bot.action('Panama', (ctx)=> {
    
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'Próximamente',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Volver atrás", callback_data: "menupagos"}]
            ]
        }
    })
})

bot.action('Bs', (ctx)=> {
    
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'Banesco Venezuela: \nInversiones DMZ 20, C.A \n0134 0376 71 3761054901 \n J-40344708-0 \nburstcomputers@gmail.com',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Volver atrás", callback_data: "menupagos"}]
            ]
        }
    })
})

bot.action('social', (ctx) =>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'Nuestras Redes Sociales:',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Facebook", url: "www.facebook.com/burstcomputers"}, {text: "Instagram", url: "www.instagram.com/burstcomputers"}, {text: "Twitter", url: "www.twitter.com/burstcomputers"}],
                [{text: "Whatsapp", url: "wa.me/584244156765"}, {text: "Discord", url: "https://discord.gg/7ppZQEz"}],
                [{text: "Source code", url: "https://burst-computers.github.io/BurstBotTelegram/"}],
                [{text: "Volver al menú", callback_data: "backtomenu"}]
            ]
        }
    })
})

bot.action('menupagos', (ctx)=> {
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'Selecciona tu método de pago preferido:',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Zelle", callback_data: "Zelle"}],
                [{text: "Paypal", callback_data: "Paypal"}],
                [{text: "Banesco Panamá", callback_data: "Panama"}],
                [{text: "Transferencia en Bs", callback_data: "Bs"}],
                [{text: "Volver al menú", callback_data: "backtomenu"}]
            ]
        }
    })
})

bot.action('backtomenu', (ctx)=> {
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'Menú principal 🔥',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Sitio Web 🌎", url: "www.burstcomputers.wordpresss.com"}],
                [{text: "Dirección📍", callback_data: "Direccion"}, {text: "Garantía ✅", callback_data: "Garantia"}, {text: "Horario ⌚️", callback_data: "Horario"}],
                [{text: "Precios 🔖", callback_data: "listadeprecios"}, {text: "Pagos 💵", callback_data: "pagos"}, {text: "Redes 📱", callback_data: "social"}],
                [{text: "Habla con un Operador", url: "https://t.me/burstcomputers"}],
                [{text: "Nuestro canal oficial", url: "https://t.me/burstcomputers_channel"}],
                [{text: "Cerrar el menú", callback_data: "cierramenu"}]
              
            ]
        }
    })
})

bot.action('cierramenu', (ctx)=> {
    ctx.deleteMessage()
})

bot.on('sticker', ctx =>
{
 ctx.reply('buen sticker!');  
})

bot.hears('Programador', ctx => 
{
ctx.reply("Andrew Clark.\n clark1621@gmail.com");
})

bot.launch()