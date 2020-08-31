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
ctx.reply(`Hola ${ctx.from.first_name}! Bienvenido al chat. \n\n¿Lo sabias? puedes enviar productos de nuestro catálogo fácilmente escribiendo @burstcomp_bot desde cualquier chat. \n \n Tambien puedes volver al /menu principal en cualquier momento`);
ctx.telegram.sendMessage(ctx.chat.id, ' 🔥 Menú principal 🔥',
{
    reply_markup: {
        inline_keyboard: [
            [{text: "Sitio Web 🌎", url: "www.burstcomputers.wordpresss.com"}],
            [{text: "Preguntas Frecuentes", callback_data:"preguntasfrecuentes"}],
            [{text: "Catálogo", callback_data: "catalogo"}],
            [{text: "Habla con un Operador", url: "https://t.me/burstcomputers"},{text: "Nuestro canal oficial", url: "https://t.me/burstcomputers_channel"}],
            [{text: "❌ Cerrar el menú", callback_data: "cierramenu"}]
          
             ]
        }
    })
})

bot.command(['Menu','menu','MENU','menú','Menú','MENÚ'], (ctx) => {

    ctx.telegram.sendMessage(ctx.chat.id, ' 🔥 Menú principal 🔥',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Sitio Web 🌎", url: "www.burstcomputers.wordpresss.com"}],
                [{text: "Preguntas Frecuentes", callback_data:"preguntasfrecuentes"}],
                [{text: "Catálogo", callback_data: "catalogo"}],
                [{text: "Habla con un Operador", url: "https://t.me/burstcomputers"},{text: "Nuestro canal oficial", url: "https://t.me/burstcomputers_channel"}],
                [{text: "❌ Cerrar el menú", callback_data: "cierramenu"}]
              
            ]
        }
    })

});

bot.help((ctx) => 
{
    ctx.telegram.sendMessage(ctx.chat.id, ' 🔥 Menú principal 🔥',
{
    reply_markup: {
        inline_keyboard: [
            [{text: "Sitio Web 🌎", url: "www.burstcomputers.wordpresss.com"}],
            [{text: "Preguntas Frecuentes", callback_data:"preguntasfrecuentes"}],
            [{text: "Catálogo", callback_data: "catalogo"}],
            [{text: "Habla con un Operador", url: "https://t.me/burstcomputers"},{text: "Nuestro canal oficial", url: "https://t.me/burstcomputers_channel"}],
            [{text: "❌ Cerrar el menú", callback_data: "cierramenu"}]
          
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

    ctx.answerInlineQuery(result)
    
})

bot.action('preguntasfrecuentes', (ctx) =>{

    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, 'FAQs:',
    
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Dirección📍", callback_data: "Direccion"}, {text: "Garantía ✅", callback_data: "Garantia"}, {text: "Horario ⌚️", callback_data: "Horario"}],
                [{text: "Precios 🔖", callback_data: "listadeprecios"}, {text: "Pagos 💵", callback_data: "pagos"}, {text: "Redes 📱", callback_data: "social"}],
                [{text: " ↩️  Volver al menú", callback_data: "backtomenu"}]
            ]
        }
    
    })
});

bot.action('catalogo', (ctx) => {

    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, '💡 Recuerda que vendemos nuestros equipos con una configuración por defecto, pero son completamente personalizables según tus necesidades. \n\nGalería de productos ordenados por modelo:  ',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "💻 Latitude E5440", callback_data: "E5440"}],
                [{text: "💻 Latitude E6400", callback_data: "E6400"}],
                [{text: "💻 Latitude E6410", callback_data: "E6410"}],
                [{text: "💻 Latitude E6420", callback_data: "E6420"}],
                [{text: "💻 Latitude E6440", callback_data: "E6440"}], 
                [{text: "🖥 Optiplex 780 Desktop", callback_data: "780DT"}],     
                [{text: "🖥 Optiplex 7010 Desktop", callback_data: "7010DT"}],
                [{text: "🖥 Optiplex 3010 Small Form Factor", callback_data: "3010SFF"}],
                [{text: "🖥 Optiplex 7020 Small Form Factor", callback_data: "7020SFF"}],
                [{text: "🖥 Optiplex 9010 Small Form Factor", callback_data: "9010SFF"}],
                [{text: " ↩️  Volver al menú", callback_data: "backtomenu"}]
            ]
        }
    
    })
});

bot.action('E6400', (ctx) => {

    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, 'Latitude E6400',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Menú Principal", callback_data: "backtomenu"}],
                [{text: "Comprar", url: "t.me/burstcomputers"}],
                [{text: "Volver al catálogo", callback_data: "catalogo"}]
            ]
        }
    })
    ctx.telegram.sendMediaGroup(ctx.chat.id, [

            {
                type: 'photo',
                media: {
                    source: 'src/E6400/E6400.jpg'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/E6400/E64001.jpg'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/E6400/E64002.jpg'
                }
            },
    ])
   
});

bot.action('E6410', (ctx) => {

    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, 'Latitude E6410',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Menú Principal", callback_data: "backtomenu"},
                {text: "Comprar", url: "t.me/burstcomputers"},
                {text: "Volver al catálogo", callback_data: "catalogo"}]
            ]
        }
    })
    ctx.telegram.sendMediaGroup(ctx.chat.id, [

            {
                type: 'photo',
                media: {
                    source: 'src/E6410/E6410.jpg'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/E6410/E64102.jpg'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/E6410/E64103.jpg'
                }
            },
    ])
   
});

bot.action('E6420', (ctx) => {

    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, 'Latitude E6420',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Menú Principal", callback_data: "backtomenu"},
                {text: "Comprar", url: "t.me/burstcomputers"},
                {text: "Volver al catálogo", callback_data: "catalogo"}]
            ]
        }
    })
    ctx.telegram.sendMediaGroup(ctx.chat.id, [

            {
                type: 'photo',
                media: {
                    source: 'src/E6420/6420.jpg'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/E6420/64201.jpg'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/E6420/64202.jpg'
                }
            },
    ])
   
});

bot.action('E6440', (ctx) => {

    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, 'Latitude E6440',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Menú Principal", callback_data: "backtomenu"},
                {text: "Comprar", url: "t.me/burstcomputers"},
                {text: "Volver al catálogo", callback_data: "catalogo"}]
            ]
        }
    })
    ctx.telegram.sendMediaGroup(ctx.chat.id, [

            {
                type: 'photo',
                media: {
                    source: 'src/E6440/6440.jpg'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/E6440/64402.jpg'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/E6440/64403.jpg'
                }
            },
    ])
   
});

bot.action('7010DT', (ctx) => {

    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, 'Optiplex 7010 Desktop',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Menú Principal", callback_data: "backtomenu"},
                {text: "Comprar", url: "t.me/burstcomputers"},
                {text: "Volver al catálogo", callback_data: "catalogo"}]
            ]
        }
    })
    ctx.telegram.sendMediaGroup(ctx.chat.id, [

            {
                type: 'photo',
                media: {
                    source: 'src/7010DT/7010.jpg'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/7010DT/7012.jpg'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/7010DT/7013.jpg'
                }
            },
    ])
   
});

bot.action('7020SFF', (ctx) => {

    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, 'Optiplex 7020 Small Form Factor',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Menú Principal", callback_data: "backtomenu"},
                {text: "Comprar", url: "t.me/burstcomputers"},
                {text: "Volver al catálogo", callback_data: "catalogo"}]
            ]
        }
    })
    ctx.telegram.sendMediaGroup(ctx.chat.id, [

            {
                type: 'photo',
                media: {
                    source: 'src/7020SFF/7020.jpg'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/7020SFF/70202.jpg'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/7020SFF/70203.jpg'
                }
            },
    ])
   
});

bot.action('9010SFF', (ctx) => {

    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, 'Optiplex 9010 Small Form Factor',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Menú Principal", callback_data: "backtomenu"},
                {text: "Comprar", url: "t.me/burstcomputers"},
                {text: "Volver al catálogo", callback_data: "catalogo"}]
            ]
        }
    })
    ctx.telegram.sendMediaGroup(ctx.chat.id, [

            {
                type: 'photo',
                media: {
                    source: 'src/9010SFF/9010.jpg'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/9010SFF/90102.jpg'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/9010SFF/90103.jpg'
                }
            },
    ])
   
});

bot.action('3010SFF', (ctx) => {

    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, 'Optiplex 3010 Small Form Factor',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Menú Principal", callback_data: "backtomenu"},
                {text: "Comprar", url: "t.me/burstcomputers"},
                {text: "Volver al catálogo", callback_data: "catalogo"}]
            ]
        }
    })
    ctx.telegram.sendMediaGroup(ctx.chat.id, [

            {
                type: 'photo',
                media: {
                    source: 'src/3010SFF/3010.jpg'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/3010SFF/30102.jpg'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/3010SFF/30103.jpg'
                }
            },
    ])
   
});

bot.action('780DT', (ctx) => {

    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, 'Optiplex 780 Desktop',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Menú Principal", callback_data: "backtomenu"},
                {text: "Comprar", url: "t.me/burstcomputers"},
                {text: "Volver al catálogo", callback_data: "catalogo"}]
            ]
        }
    })
    ctx.telegram.sendMediaGroup(ctx.chat.id, [

            {
                type: 'photo',
                media: {
                    source: 'src/780DT/780.png'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/780DT/7802.png'
                }
            },
    ])
   
});

bot.action('E5440', (ctx) => {

    ctx.deleteMessage();
    ctx.telegram.sendMessage(ctx.chat.id, 'Latitude E5440',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Menú Principal", callback_data: "backtomenu"},
                {text: "Comprar", url: "t.me/burstcomputers"},
                {text: "Volver al catálogo", callback_data: "catalogo"}]
            ]
        }
    })
    ctx.telegram.sendMediaGroup(ctx.chat.id, [

            {
                type: 'photo',
                media: {
                    source: 'src/E5440/E5440.jpg'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/E5440/E54402.jpg'
                }
            },
            {
                type: 'photo',
                media: {
                    source: 'src/E5440/E54403.jpg'
                }
            },
    ])
   
});

bot.action('Direccion', (ctx)=> {

    ctx.deleteMessage()
    ctx.telegram.sendLocation(ctx.chat.id, 10.4841881, -66.935708,),
    ctx.telegram.sendMessage(ctx.chat.id, 'Estamos ubicados en la Av. Páez del paraíso, Centro profesional paraíso, Diagonal al MC Donalds. Caracas, Distrito Capital.',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "↩️  Volver atrás", callback_data: "preguntasfrecuentes"}],
                [{text: "Menú principal", callback_data: "backtomenu"}]
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
                [{text: "↩️  Volver atrás", callback_data: "preguntasfrecuentes"}],
                [{text: "Menú principal", callback_data: "backtomenu"}]
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
                [{text: "Hacer una cita", url: "t.me/burstcomputers"}],
                [{text: "↩️  Volver atrás", callback_data: "preguntasfrecuentes"}],
                [{text: "Menú principal", callback_data: "backtomenu"}]
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
                [{text: "↩️  Volver atrás", callback_data: "preguntasfrecuentes"}],
                [{text: "Menú principal", callback_data: "backtomenu"}]
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
                [{text: "↩️  Volver atrás", callback_data: "preguntasfrecuentes"}],
                [{text: "Menú principal", callback_data: "backtomenu"}]
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
                [{text: "↩️  Volver atrás", callback_data: "preguntasfrecuentes"}],
                [{text: "Menú principal", callback_data: "backtomenu"}]
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
                [{text: "↩️  Volver atrás", callback_data: "preguntasfrecuentes"}],
                [{text: "Menú principal", callback_data: "backtomenu"}]
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
                [{text: "↩️  Volver atrás", callback_data: "preguntasfrecuentes"}],
                [{text: "Menú principal", callback_data: "backtomenu"}]
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
                [{text: "↩️  Volver atrás", callback_data: "preguntasfrecuentes"}],
                [{text: "Menú principal", callback_data: "backtomenu"}]
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
                [{text: "↩️  Volver atrás", callback_data: "preguntasfrecuentes"}],
                [{text: "Menú principal", callback_data: "backtomenu"}]
            ]
        }
    })
})

bot.action('backtomenu', (ctx)=> {
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id, ' 🔥 Menú principal 🔥',
    {
        reply_markup: {
            inline_keyboard: [
                [{text: "Sitio Web 🌎", url: "www.burstcomputers.wordpresss.com"}],
                [{text: "Preguntas Frecuentes", callback_data:"preguntasfrecuentes"}],
                [{text: "Catálogo", callback_data: "catalogo"}],
                [{text: "Habla con un Operador", url: "https://t.me/burstcomputers"},{text: "Nuestro canal oficial", url: "https://t.me/burstcomputers_channel"}],
                [{text: "❌ Cerrar el menú", callback_data: "cierramenu"}]
              
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