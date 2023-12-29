import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";

const DraggerA = () => {
  const containerRef = useRef(null); // Referencia al contenedor principal
  const movableRef = useRef(null); // Referencia al div que se puede mover
  const [posicion, setPosicion] = useState({ x: 0, y: 0 }); // Estado para la posición del div interno
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const handleMouseDown = (e) => {
    const container = containerRef.current;
    const movable = movableRef.current;

    const containerRect = container.getBoundingClientRect();
    const movableRect = movable.getBoundingClientRect();

    const offsetX = e.clientX - movableRect.left;
    const offsetY = e.clientY - movableRect.top;

    const maxX = containerRect.width - movableRect.width;
    const maxY = containerRect.height - movableRect.height;

    const handleMouseMove = (e) => {
      let posX = e.clientX - containerRect.left - offsetX;
      let posY = e.clientY - containerRect.top - offsetY;

      // Limitar la posición dentro del contenedor padre
      posX = Math.min(Math.max(posX, 0), maxX);
      posY = Math.min(Math.max(posY, 0), maxY);

      setPosicion({ x: posX, y: posY });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const functionsEvents = ()=>{
    // window.addEventListener("getArguments", async (e) => {
    //   console.log("asd")
    //   });
    //   window.addEventListener("invokerOk", () => {
    //     console.log("todo ok ya firmo");
    //   });
    //   window.addEventListener("invokerCancel", (e) => {
    //     alerta("El proceso de firma digital fue cancelado.", false);
    //   });
  }
  
  useEffect(() => {
    const changeVal = () => {
      if (posicion.x !== 0) {
        setTop(parseInt(posicion.y + 194));
        setLeft(parseInt(posicion.x+98));
      } else {
        setTop(parseInt(posicion.y + 194));
        setLeft(parseInt(posicion.x));
      }
    };
    changeVal();
    functionsEvents()
  },);
function click(){
  const objPositinon = {
    x:left,
    y:top
  }
  localStorage.setItem("position", JSON.stringify(objPositinon))
  initInvoker("W")
}  


  return (
    <div>
      <div className="movable-container" ref={containerRef}>
        <div
          className="movable"
          ref={movableRef}
          style={{
            transform: `translate(${posicion.x}px, ${posicion.y}px)`,
          }}
          onMouseDown={handleMouseDown}
        ></div>
      </div>
      <br />
      <Button type="primary" onClick={()=>{click()}}>FIRMAR</Button>
      {/* <br />
      <span>POSICION X:{posicion.x}</span>
      <br />
      <span>POSICION Y:{posicion.y}</span>
      <br />
      <br />
      <span>POSICION X:{left}</span>
      <br />
      <span>POSICION y:{top}</span>
      <br /> */}
    </div>
  );
};

export default DraggerA;
