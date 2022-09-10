const fs = require('fs');
const express = require('express');
const app = express();


const PORT = process.env.PORT || 8080


const { connected } = require('process');



class contenedor {

    constructor(data) { 
        this.data = data
    }
    
    async Save(info) {
        try {
            let file = await fs.promises.readFile(`./${this.data}`, 'utf-8');
            let filejson = JSON.parse(file);
            let IDend = filejson.length - 1;
            let ID = filejson[IDend].id;
            info.id = ID + 1;
            let createID = info.id;

            filejson.push(info)

            await fs.promises.writeFile(`./${this.data}`, JSON.stringify(filejson) )
            
            return createID

            // console.log(filejson)

        } catch (error) {
            console.log(error.message)
        }

        
    }

    async getById(id) {
         
        try {
            const read = await fs.promises.readFile(`./${this.data}`, 'utf-8');
            let readjson = JSON.parse(read)
            
            let content 

            readjson.forEach( element => {
                if (element.id == id ) {
                    content = element
                }

            
            });

            return content    
            
        } catch (error) {

            console.log(error.message)
            
        }
        //  console.log(readjson);
    }

    async getAll() {
        try {
            let read = await fs.promises.readFile(`./${this.data}`, 'utf-8')
            let readjson = JSON.parse(read)

            
            return (readjson)

        } catch (error) {
            console.log(error.message)
        }
    }
    async deleteById(id) {
        try {
            let read = await fs.promises.readFile(`./${this.data}` , 'utf-8');
            let readjson = JSON.parse(read);
            
            let contenidofilter = readjson.filter((element) => element.id !== id)
            
            const objetodelete = await fs.promises.writeFile(`./${this.data}`, JSON.stringify(contenidofilter));
            return console.log('Id delete')

            
        } catch (error) {
            console.log(error.message)
        }
    }

    async deleteAll() {
        try {
            const read = await fs.promises.readFile(`./${this.data}`, 'utf-8');
            const readjson = JSON.parse(read)

            
            await fs.promises.writeFile(`./${this.data}`, JSON.stringify([{}]));
            return console.log ('Objet delete')
            
        } catch (error) {
            console.log(error.message)
        }
    }
}


let NewContenedor = new contenedor("productos.json");

let infoNueva = {
        "id": 1,
        "product": "mouse",
        "price": 500
}


app.get('/productos', async (req, res) => {
    const productos = await NewContenedor.getAll().then((res) => res);
    res.send(productos)
});


app.get('/productosrandom', async (req, res) => {
    const productos = await NewContenedor.getAll();
    let random = Math.floor(Math.random() * productos.length)

    res.send(productos[random])
});





const Connected = app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}`)
});

Connected.on('error', (error) => {
    console.log(error);
});