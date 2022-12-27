const fs = require('fs');

class ProductManager {
    constructor(archivo) {
        this.archivo = archivo;
        this.objetos = this.readData(this.archivo) || [];
    }
    //Genera ID
    async generateId() {
        try {
            this.objetos = await this.getAll() || [];
            let maxId = this.objetos.length;
            this.objetos.forEach(elemento => {
                elemento.id > maxId ? maxId = elemento.id : maxId
            })
            return maxId + 1;
        } catch (error) {
            console.log(error);
        }
    }
    //Guarda un objeto
    async addProduct(obj) {
        try {
            const readFile = await this.getAll();
            if (!readFile) {
                obj.id = await this.generateId();
                this.objetos.push(obj);
                this.writeData(this.objetos);
                return obj.id;
            }
            this.objetos = readFile;
            obj.id = await this.generateId();
            this.objetos.push(obj);
            this.writeData(this.objetos);
            return obj.id;
        } catch (error) {
            console.log(error);
        }
    }
    //Devuelve el objeto con el ID buscado
    async getById(id) {
        try {
            this.objetos = await this.getAll();
            const obj = this.objetos.find(elemento => elemento.id === Number(id));
            return obj ? obj : null;
        } catch (error) {
            console.log(error);
        }
    }
    //Devuelve un array con los objetos presentes en el archivo
    async getAll() {
        try {
            const data = await this.readData(this.archivo);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    //Elimina del archivo el objeto con el ID buscado
    async deleteById(id) {
        try {
            this.objetos = await this.getAll();
            this.objetos = this.objetos.filter(elemento => elemento.id != Number(id));
            this.writeData(this.objetos);
        } catch (error) {
            console.log(error);
        }
    }
    //Elimina todos los objetos guardados en el archivo
    async deleteAll() {
        try {
            this.objetos = await this.getAll();
            this.objetos = [];
            this.writeData(this.objetos);
        } catch (error) {
            console.log(error);
        }
    }
    readData(path) {
        const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
        return data;
    }
    writeData(objetos) {
        fs.writeFileSync(this.archivo, JSON.stringify(objetos, null, 2));
    }
}

module.exports = ProductManager;