const Menu = require('../../models/menu')

function homeController(){
    //factory functions =>notes
    return {
        //crud controller
        async index(req,res){

            const pizzas = await Menu.find()            
            return res.render('home',{pizzas: pizzas})
            
            
        }
    }
}

module.exports = homeController;

/**
 * can use also , but above is cleaner
 *           // Menu.find().then((pizzas)=>{
            //     //console.log()
            //     return res.render('home',{pizzas: pizzas});
            // })
 */