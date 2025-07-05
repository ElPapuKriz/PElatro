import { useState } from "react";
import "./menu.css"; 

const Voices = Array.from({length:11}, (_,i) => `${process.env.PUBLIC_URL}/resources/sounds/voice${i+1}.ogg`);

function Menu() {
  class Cartas {
    constructor(nombre, precio, imagen) {
      this.nombre = nombre;
      this.precio = precio;
      this.imagen = imagen;
    }
  }

  const joker_clasico = new Cartas(
    "Joker clásico",
    4,
    "https://oyster.ignimgs.com/mediawiki/apis.ign.com/balatro/e/ef/Joker.png?width=325"
  );

  
  const [transform, setTransform] = useState("");

  const handleClick = () => {
    
    let randomIndex = Math.floor(Math.random() * Voices.length)
    const Joker_hablando = new Audio(Voices[randomIndex]);
    Joker_hablando.play();
  };

  // Maneja el movimiento del mouse sobre la carta
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // posición X dentro de la carta
    const y = e.clientY - rect.top;  // posición Y dentro de la carta
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Ajusta el divisor para controlar la inclinación (mayor divisor = menos inclinación)
    const rotateX = ((y - centerY) / centerY) * 11; // máximo 8 grados
    const rotateY = ((x - centerX) / centerX) * 11; // máximo 8 grados
    setTransform(`perspective(500px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform(""); // Restablece la transformación
    
  };


  return (
    <div className="menu">
      <div className="card" style={{ transform, transition: "transform 0.01s" }}

        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        
      >
        <img
          src={joker_clasico.imagen}
          alt={joker_clasico.nombre}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="nombre-carta" style={{ textAlign: "center", marginTop: "10px" }}>
        <h4>{joker_clasico.nombre}</h4>
      </div>
    </div>
  );
}

export default Menu;