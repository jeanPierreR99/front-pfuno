import React, { useState } from 'react';

const DraggerA = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = (e) => {
    const offsetX = e.clientX - e.target.getBoundingClientRect().left;
    const offsetY = e.clientY - e.target.getBoundingClientRect().top;

    setPosition({ x: offsetX, y: offsetY });
  };

  const handleDrag = (e) => {
    const posX = e.clientX - position.x;
    const posY = e.clientY - position.y;

    if (posX >= 0 && posY >= 0) {
      e.target.style.transform = `translate(${posX}px, ${posY}px)`;
    }
  };

  const handleDragEnd = (e) => {
    const posX = e.clientX - position.x;
    const posY = e.clientY - position.y;

    if (posX >= 0 && posY >= 0) {
      setPosition({ x: posX, y: posY });
    }
    console.log(e)
  };

  return (
    <div style={{ width: '600px', height: '700px', position: 'relative' }}>
      <div
        draggable
        style={{
          width: '100px',
          height: '50px',
          backgroundColor: 'red',
          position: 'absolute',
          cursor: 'move',
        }}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      >
        Drag me!
      </div>
    </div>
  );
};

export default DraggerA;
