import Animal from "./animal.module";

class Perro extends Animal {
    #height = 0;
    #width;
    constructor(name, height,width) {
      this.name = name;
      this.#height = height;
        this.#width = width;
    }
  
    speak() {
      console.log(`${this.name} makes a noise.`);
    }

    getHeight() {
        console.log('internamente es '+ this.height);
        return this.#height;
    }
}

export default Perro;