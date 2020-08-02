const Telegraf = require('telegraf') //Importa la librería te métodos TELEGRAF
require('dotenv').config(); //Requiere la libreria para la creación de variables de entorno 
const config = { //Configura variables de entorno para proteger los datos de acceso a las apps
    token: process.env.TOKEN,
};
const bot = new Telegraf(config.token)  //Token de acceso a la App
console.log("Bot online");

bot.start((ctx) => 
{
ctx.reply(`Hola ${ctx.from.first_name}! Bienvenido a mi chat. \n Empecemos con la lista de comandos que te estoy enviando.`);

ctx.reply('/Direccion \n /Horario \n /Garantia \n /Catalogo \n /Precios \n /RedesSociales');

})


bot.help((ctx) => //Menu principal de comandos especificados en la ayuda
{
    ctx.reply('/Direccion \n /Horario \n /Garantia \n /CatalogoWs \n /Precios');
})

bot.settings((ctx) => 
{
    ctx.reply('Configuración en Desarrollo');
})

bot.inlineQuery((ctx) => 
{
    ctx.reply('Configuración en Desarrollo');
})


//LISTA DE COMANDOS PERSONALIZADOS


//Comando dirección
bot.command(['Direccion', 'direccion', 'DIRECCION', 'Dirección', 'dirección', 'DIRECCIÓN'], (ctx) =>
{
    ctx.reply('Estamos ubicados en la Av. Páez del paraíso, Centro profesional paraíso, Diagonal al MC Donalds. Caracas, Distrito Capital. AVISO: Estamos atendiendo previa cita, debido a las restricciones y políticas contra el COVID -19, podemos acordar una fecha y hora para que se acerque a nuestra oficina y pueda ver los productos');
})
//Comando Garantía
bot.command(['Garantía', 'garantía', 'GARANTÍA', 'Garantia', 'garantia', 'GARANTIA'], (ctx) =>
{
    ctx.reply('Todos nuestros equipos son Refurbished, todos con piezas 100% nuevas y ofrecemos 90 días de garantía en nuestra tienda');
})
//Comando Horario
bot.command(['Horario', 'horario', 'HORARIO'], (ctx) =>
{
    ctx.reply('Nuestro horario de trabajo por los momentos es de 9am a 12pm y atendemos los días Lunes / miércoles / viernes');
})
//Comando Catálogo Whatsapp:
bot.command(['Catalogo', 'catalogo', 'CATALOGO', 'Catálogo', 'catálogo','CATÁLOGO'], (ctx) =>
{
    ctx.reply(' Puedes encontrar nuestros productos disponibles en Whatsapp justo aqui:  https://wa.me/c/584244156765 ');
})
//Comando Lista de precios:
bot.command(['Precios', 'precios', 'PRECIOS'], (ctx) =>
{
    ctx.reply('Puedes encontrar nuestra lista de precios siempre actualizada en este enlace: https://bit.ly/37SdCWu');

})
//Comando RedesSociales:
bot.command(['RedesSociales', 'redessociales', 'Redessociales'], (ctx) =>
{
    ctx.reply('Facebook: www.facebook.com/burstcomputers \n Instagram: www.instagram.com/burstcomputers \n Twitter: www.twitter.com/burstcomputers \n\n Tambien puedes charlar con nuestros bots interactivos en Messenger y Discord justo aqui: \n\n Messenger: m.me/burstcomputers \n\n Servidor de Burst en Discord: https://discord.gg/eGbN44');
})


bot.on('sticker', ctx =>
{
 ctx.reply('Me agrada ese sticker');  
})


//Construcción de la IA a través del uso del método BOT.HEARS
bot.hears('optiplex', ctx => 
{
ctx.reply("Si te interesan los equipos optiplex, escribe el comando /precios");
})

bot.hears('Programador', ctx => 
{
ctx.reply("Andrew Clark.\n clark1621@gmail.com");
})
bot.launch()