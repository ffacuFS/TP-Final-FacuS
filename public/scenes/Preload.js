export default class Preload extends Phaser.Scene {
    constructor(){
        super("preload")
    }
    preload(){
      this.load.audio("musicafondo","./public/audio/musica.mp3")
  
    }
    create(){
        this.scene.start("menuprincipal");
        this.musicaFondo = this.sound.add("musicafondo");
        this.musicaFondo.volume = 0.5; // Establecer volumen (0.0 a 1.0)
        this.musicaFondo.loop = true; // Reproducir en bucle
        this.musicaFondo.play(); // Reproducir la música
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P))) {
            if (this.musicaFondo.isPlaying) {
              this.musicaFondo.pause(); // Pausar la música
            } else {
              this.musicaFondo.resume(); // Reanudar la música
            }
          }
    }
  }