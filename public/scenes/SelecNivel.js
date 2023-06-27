export default class SelecNivel extends Phaser.Scene {
    constructor(){
        super("selecnivel")
    }
preload()   {
    this.load.image("selecnivel","./public/images/selecnivel.jpg")
    // Precarga de los recursos necesarios, como imágenes y sonidos
    this.load.image('level1Button', './public/images/boton1.png');
    this.load.image('level2Button', './public/images/boton2.png');
}

create()    {
    this.add.image(400,300,"selecnivel");
    // Creación de los botones de selección de nivel
    var level1Button = this.add.image(276, 322, 'level1Button').setInteractive();
    var level2Button = this.add.image(550, 322, 'level2Button').setInteractive();

    // Asignación de eventos a los botones
    level1Button.on('pointerup', function () {
        // Lógica para cargar el nivel 1
        this.scene.start('escena1'); // Reemplaza 'Level1Scene' por el nombre de tu escena del nivel 1
    }, this);

    level2Button.on('pointerup', function () {
        // Lógica para cargar el nivel 2
        this.scene.start('escena2'); // Reemplaza 'Level2Scene' por el nombre de tu escena del nivel 2
    }, this);
    }    
}

