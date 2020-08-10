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
ctx.reply(`Hola ${ctx.from.first_name}! Bienvenido al chat \n¿Quieres ver el catálogo de productos o enviarlo a un amigo? Desde cualquier chat solamente escribe @burstcomp_bot y podrás hacerlo! \n \n /help@Burstcomputers_bot es la manera de llamarme si te encuentras en un grupo 💡`);
ctx.telegram.sendMessage(ctx.chat.id, 'Menú principal 🔥',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Sitio Web 🌎", url: "www.burstcomputers.wordpresss.com"}],
                [{text: "Dirección 📍", callback_data: "Direccion"}, {text: "Garantía ✅", callback_data: "Garantia"}, {text: "Horario ⌚️", callback_data: "Horario"}],
                [{text: "Lista de precios 🔖", callback_data: "listadeprecios"}, {text: "Métodos de pago", callback_data: "pagos"}, {text: "Redes Sociales 📱", callback_data: "social"}]
              
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
                [{text: "Dirección 📍", callback_data: "Direccion"}, {text: "Garantía ✅", callback_data: "Garantia"}, {text: "Horario ⌚️", callback_data: "Horario"}],
                [{text: "Lista de precios 🔖", callback_data: "listadeprecios"}, {text: "Métodos de pago", callback_data: "pagos"}, {text: "Redes Sociales 📱", callback_data: "social"}]
              
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
    url = `https://burst-computers.github.io/BurstBotTelegram/dictionary.json?tag=${query}`

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
                message_text: `${elem.title}\n${elem.description}\n${elem.photo}\n${elem.link}`
            },
            url: elem.link
        }
    })

    ctx.answerInlineQuery(result)
    
})

bot.action('Direccion', (ctx)=> {
    
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'Estamos ubicados en la Av. Páez del paraíso, Centro profesional paraíso, Diagonal al MC Donalds. Caracas, Distrito Capital.',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Ver en Google Maps", url: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x8c2a5f11707d886b:0x4022abc7e7c2c887?utm_source=mstt_1"}],
                [{text: "Volver al menú", callback_data: "backtomenu"}]

                
            ]
        }
    })
})

bot.action('Garantia', (ctx)=> {
    
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'Todos nuestros equipos son Refurbished, todos con piezas 100% nuevas y ofrecemos 3 meses de garantía en nuestra tienda',
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
    ctx.telegram.sendMessage(ctx.chat.id, 'Nuestro horario de trabajo por los momentos es de 9am a 12pm y atendemos los días Lunes / miércoles / viernes',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Volver al menú", callback_data: "backtomenu"}]
            ]
        }
    })
})

bot.action('listadeprecios', (ctx)=> {
    
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, 'Puedes encontrar nuestra lista de precios siempre actualizada en este enlace: https://bit.ly/37SdCWu',
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
    ctx.telegram.sendMessage(ctx.chat.id, 'Aceptamos Zelle, Paypal, Banesco Panamá, Transferencias en Bs de todo tipo y efectivo de todo tipo',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Volver al menú", callback_data: "backtomenu"}]
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
                [{text: "Whatsapp", url: "wa.me/584244156765"}, {text: "Discord", url: "https://discord.gg/7ppZQEz"}, {text: "Github", url: "https://burst-computers.github.io/BurstBotTelegram/"}],
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
                [{text: "Dirección 📍", callback_data: "Direccion"}, {text: "Garantía ✅", callback_data: "Garantia"}, {text: "Horario ⌚️", callback_data: "Horario"}],
                [{text: "Lista de precios 🔖", callback_data: "listadeprecios"}, {text: "Métodos de pago", callback_data: "pagos"}, {text: "Redes Sociales 📱", callback_data: "social"}]
              
            ]
        }
    })
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