export default class Fin extends Phaser.Scene {
    constructor(){
        super("fin")
    }
    preload(){
      this.load.image("fin", "./public/images/fin.jpg");
  
    }
    create(){
      this.add.image(400, 300, "fin")
      .setScale()
      .setInteractive()
      .on('pointerdown', () => this.scene.start("menuprincipal"));

    this.add.text(200,100,"Enhorabuena", {
    fontSize: "64px",
    fontStyle: "oblique",
    fill: "#FFFFFF",
    });
    this.add.text(70,250,"Has superado las misiones y logrado salvar al mundo de una catàstrofe",{
    fontSize: "16px",
    fontStyle: "bold",
    fill: "#FFFFFF",
  });

    this.add.text(110,320,"Esperamos verte mas adelante con las nuevas actualizaciones",{
    fontSize: "16px",
    fontStyle: "bold",
    fill: "#FFFFFF",
    });

    this.add.text(280,530,"SALUDOS CAMARADA",{
    fontSize: "24px",
    fontStyle: "bold",
    fill: "#FFFFFF",
    });
      }
    }