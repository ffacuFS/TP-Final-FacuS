export default class Pausa extends Phaser.Scene {
    constructor() {
      super("pausa");
    }
    preload(){
        this.load.image("pantpausa","./public/images/pantallapausa.png");
    }
    create(data) {
      const { sceneToResume } = data;
      // Create the pause screen background
      this.add.image(400, 300, "pantpausa").setScale(3);
  
      // Add pause text
      
  
      // Add resume button
      const resumeButton = this.add.text(410, 330, "Continuar", {
        fontSize: "32px",
        fontStyle: "bold",
        fill: "#FFFFFF",
      }).setOrigin(0.5);
      resumeButton.setInteractive();
      resumeButton.on("pointerdown", () => {
        this.scene.resume("escena1"); // Resume the paused scene
        this.scene.resume(sceneToResume);
        this.scene.stop("pausa"); // Stop the pause scene
      });
  
      // Add restart button
      const restartButton = this.add.text(415, 410, "Reiniciar", {
        fontSize: "32px",
        fontStyle: "bold",
        fill: "#FFFFFF",
      }).setOrigin(0.5);
      restartButton.setInteractive();
      restartButton.on("pointerdown", () => {
        this.scene.stop("pausa"); // Stop the current scene
        this.scene.start("escena1"); // Restart the "escena1" scene
        this.scene.start(sceneToResume);
      });
  }
}