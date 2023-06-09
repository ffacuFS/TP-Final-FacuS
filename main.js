import Derrota from "./public/scenes/Derrota.js";
import Escena1 from "./public/scenes/Escena1.js";
import Escena2 from "./public/scenes/Escena2.js";
import MenuPrincipal from "./public/scenes/MenuPrincipal.js";
import Victoria from "./public/scenes/Victoria.js";
import Fin from "./public/scenes/Fin.js";
import SelecNivel from "./public/scenes/SelecNivel.js";
import Preload from "./public/scenes/Preload.js";
// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Preload,MenuPrincipal,SelecNivel, Escena1, Escena2, Victoria, Derrota,Fin],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
