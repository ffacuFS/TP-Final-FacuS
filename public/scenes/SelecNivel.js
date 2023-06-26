export default class SelecNivel extends Phaser.Scene {
    constructor(){
        super("selecnivel")
    }
preload()   {

    // Precarga de los recursos necesarios, como imágenes y sonidos
    this.load.image('level1Button', 'ruta/a/imagen/level1.png');
    this.load.image('level2Button', 'ruta/a/imagen/level2.png');
}

create()    {

    // Creación de los botones de selección de nivel
    var level1Button = this.add.image(200, 200, 'level1Button').setInteractive();
    var level2Button = this.add.image(400, 200, 'level2Button').setInteractive();

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

