
import { useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function Mat({ color, roughness = 0.8, metalness = 0 }) {
  return <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />;
}

function Box({ args, position, color, radius = 0.035 }) {
  return (
    <RoundedBox args={args} radius={radius} position={position}>
      <Mat color={color} />
    </RoundedBox>
  );
}

function Sofa({ color }) {
  return (
    <group>
      <Box args={[2.15, 0.34, 0.9]} position={[0, 0.36, 0]} color={color} radius={0.1} />
      <Box args={[2.15, 0.78, 0.25]} position={[0, 0.82, -0.34]} color={color} radius={0.1} />
      {[-0.95, 0.95].map((x) => <Box key={x} args={[0.28, 0.66, 0.9]} position={[x, 0.58, 0]} color={color} radius={0.09} />)}
      {[-0.48, 0.48].map((x) => <Box key={x} args={[0.86, 0.13, 0.12]} position={[x, 0.62, 0.02]} color="#eee5d9" />)}
    </group>
  );
}

function Chair({ color }) {
  return (
    <group>
      <Box args={[0.85, 0.25, 0.78]} position={[0, 0.42, 0]} color={color} radius={0.09} />
      <Box args={[0.85, 0.75, 0.18]} position={[0, 0.85, -0.3]} color={color} />
      {[-0.35, 0.35].map((x) => <Box key={x} args={[0.07, 0.4, 0.07]} position={[x, 0.2, 0.26]} color="#594334" />)}
    </group>
  );
}

function Table({ color }) {
  return (
    <group>
      <Box args={[1.45, 0.12, 0.82]} position={[0, 0.58, 0]} color={color} />
      {[-0.55, 0.55].flatMap((x) => [-0.27, 0.27].map((z) => (
        <Box key={`${x}-${z}`} args={[0.07, 0.52, 0.07]} position={[x, 0.28, z]} color="#594334" />
      )))}
    </group>
  );
}

function Bed({ color }) {
  return (
    <group>
      <Box args={[2.2, 0.25, 2.8]} position={[0, 0.35, 0]} color="#76563f" />
      <Box args={[2.12, 0.28, 2.45]} position={[0, 0.57, 0.08]} color={color} />
      <Box args={[2.24, 0.95, 0.16]} position={[0, 0.78, -1.38]} color={color} />
      {[-0.55, 0.55].map((x) => <Box key={x} args={[0.78, 0.16, 0.55]} position={[x, 0.8, -0.78]} color="#f5eee4" />)}
      <Box args={[2.12, 0.1, 0.85]} position={[0, 0.77, 0.78]} color="#c9b39b" />
    </group>
  );
}

function Wardrobe({ color }) {
  return (
    <group>
      <Box args={[1.65, 2.25, 0.72]} position={[0, 1.15, 0]} color={color} />
      <Box args={[0.025, 2.08, 0.025]} position={[0, 1.15, 0.37]} color="#6b503b" />
      {[-0.38, 0.38].map((x) => <mesh key={x} position={[x, 1.18, 0.405]}><sphereGeometry args={[0.045, 16, 16]} /><Mat color="#d3b47b" metalness={0.5} /></mesh>)}
    </group>
  );
}

function Tv({ color }) {
  return (
    <group>
      <Box args={[2.1, 0.48, 0.62]} position={[0, 0.42, 0]} color={color} />
      <Box args={[1.55, 1.02, 0.09]} position={[0, 1.25, -0.12]} color="#191b1c" />
      <mesh position={[0, 1.25, -0.067]}><boxGeometry args={[1.43, 0.88, 0.012]} /><meshBasicMaterial color="#303b42" /></mesh>
    </group>
  );
}

function Rug({ color }) {
  return (
    <group>
      <Box args={[2.65, 0.045, 2.05]} position={[0, 0.035, 0]} color={color} radius={0.06} />
      <Box args={[2.4, 0.012, 1.8]} position={[0, 0.062, 0]} color="#eee4d7" />
    </group>
  );
}

function Dining({ color }) {
  return (
    <group>
      <Box args={[1.75, 0.14, 1.35]} position={[0, 0.82, 0]} color={color} />
      {[-0.65, 0.65].flatMap((x) => [-0.45, 0.45].map((z) => <Box key={`${x}-${z}`} args={[0.09, 0.78, 0.09]} position={[x, 0.4, z]} color="#614832" />))}
      {[-1.15, 1.15].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <Box args={[0.55, 0.14, 0.55]} position={[0, 0.53, 0]} color="#d6c4ae" />
          <Box args={[0.55, 0.55, 0.12]} position={[0, 0.85, -0.22]} color="#d6c4ae" />
          {[-0.18, 0.18].map((z) => <Box key={z} args={[0.045, 0.48, 0.045]} position={[0, 0.26, z]} color="#614832" />)}
        </group>
      ))}
    </group>
  );
}

function Desk({ color }) {
  return (
    <group>
      <Box args={[1.8, 0.12, 0.8]} position={[0, 0.88, 0]} color={color} />
      {[-0.72, 0.72].map((x) => <Box key={x} args={[0.09, 0.85, 0.68]} position={[x, 0.43, 0]} color="#604832" />)}
      <Box args={[0.62, 0.48, 0.07]} position={[0, 1.22, -0.22]} color="#242729" />
    </group>
  );
}

function Plant({ color }) {
  return (
    <group>
      <mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.25, 0.19, 0.58, 24]} /><Mat color="#b77f5d" /></mesh>
      <mesh position={[0, 0.61, 0]}><cylinderGeometry args={[0.22, 0.22, 0.035, 24]} /><Mat color="#5e4635" /></mesh>
      <mesh position={[0, 1.12, 0]}><cylinderGeometry args={[0.035, 0.045, 1.05, 10]} /><Mat color="#5c704d" /></mesh>
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return <mesh key={i} position={[Math.cos(angle) * 0.28, 0.95 + (i % 3) * 0.2, Math.sin(angle) * 0.28]}><sphereGeometry args={[0.17, 12, 12]} /><Mat color={color} /></mesh>;
      })}
    </group>
  );
}

function Lamp({ color }) {
  return (
    <group>
      <mesh position={[0, 0.06, 0]}><cylinderGeometry args={[0.27, 0.3, 0.12, 24]} /><Mat color="#6d6255" /></mesh>
      <mesh position={[0, 1.05, 0]}><cylinderGeometry args={[0.035, 0.035, 1.9, 12]} /><Mat color="#8d7960" /></mesh>
      <mesh position={[0, 2.02, 0]}><cylinderGeometry args={[0.36, 0.23, 0.52, 24, 1, true]} /><Mat color={color} /></mesh>
    </group>
  );
}

function Shelf({ color }) {
  return (
    <group>
      <Box args={[1.35, 2.15, 0.42]} position={[0, 1.08, 0]} color={color} />
      {[-0.52, 0, 0.52].map((y) => <Box key={y} args={[1.25, 0.07, 0.44]} position={[0, 1.08 + y, 0.23]} color="#65472f" />)}
      {[-0.42, -0.12, 0.2, 0.48].map((x, i) => <Box key={x} args={[0.17, 0.62, 0.25]} position={[x, 0.45, 0.04]} color={["#b67c62", "#d5bd8d", "#8d9a82", "#6f7c8b"][i]} />)}
    </group>
  );
}

/* KITCHEN OBJECTS */

function KitchenCabinet({ color }) {
  return (
    <group>
      <Box args={[2.2, 1.5, 0.62]} position={[0, 0.78, 0]} color={color} />
      <Box args={[2.28, 0.1, 0.7]} position={[0, 1.58, 0]} color="#aaa39a" />
      {[-0.72, 0, 0.72].map((x) => <group key={x}><Box args={[0.68, 1.34, 0.035]} position={[x, 0.78, 0.325]} color={color} /><mesh position={[x, 0.8, 0.36]}><sphereGeometry args={[0.035, 12, 12]} /><Mat color="#b69a72" /></mesh></group>)}
    </group>
  );
}

function Counter({ color }) {
  return <group><Box args={[2.4, 0.85, 0.72]} position={[0, 0.48, 0]} color="#8b735e" /><Box args={[2.5, 0.12, 0.82]} position={[0, 0.97, 0]} color={color} /></group>;
}

function Sink({ color }) {
  return (
    <group>
      <Counter color="#b8b3aa" />
      <mesh position={[0, 1.045, 0]}><boxGeometry args={[0.75, 0.035, 0.43]} /><meshStandardMaterial color={color} metalness={0.55} roughness={0.25} /></mesh>
      <mesh position={[0, 1.22, -0.25]}><torusGeometry args={[0.13, 0.025, 8, 24, Math.PI]} /><Mat color="#a9b7c1" metalness={0.8} /></mesh>
    </group>
  );
}

function Fridge({ color }) {
  return (
    <group>
      <Box args={[0.95, 2.45, 0.85]} position={[0, 1.23, 0]} color={color} />
      <Box args={[0.9, 0.025, 0.025]} position={[0, 1.2, 0.435]} color="#858b8d" />
      <Box args={[0.035, 0.45, 0.035]} position={[0.32, 1.8, 0.46]} color="#777f82" />
      <Box args={[0.035, 0.42, 0.035]} position={[0.32, 0.72, 0.46]} color="#777f82" />
    </group>
  );
}

function Island({ color }) {
  return <group><Box args={[2.3, 1.12, 1.25]} position={[0, 0.58, 0]} color={color} /><Box args={[2.45, 0.12, 1.4]} position={[0, 1.2, 0]} color="#dedbd3" /></group>;
}

function Stool({ color }) {
  return (
    <group>
      <mesh position={[0, 0.72, 0]}><cylinderGeometry args={[0.34, 0.34, 0.14, 24]} /><Mat color={color} /></mesh>
      <mesh position={[0, 0.36, 0]}><cylinderGeometry args={[0.06, 0.08, 0.65, 12]} /><Mat color="#594334" /></mesh>
      <mesh position={[0, 0.12, 0]}><cylinderGeometry args={[0.28, 0.28, 0.06, 24]} /><Mat color="#594334" /></mesh>
    </group>
  );
}

/* BATHROOM OBJECTS */

function Shower({ color }) {
  return (
    <group>
      <Box args={[1.5, 0.12, 1.5]} position={[0, 0.08, 0]} color="#d8d4ca" />
      <mesh position={[0, 1.5, -0.68]}><cylinderGeometry args={[0.025, 0.025, 2.8, 10]} /><Mat color={color} metalness={0.6} /></mesh>
      <mesh position={[0, 2.85, -0.35]} rotation={[Math.PI / 4, 0, 0]}><cylinderGeometry args={[0.06, 0.06, 0.7, 12]} /><Mat color={color} metalness={0.6} /></mesh>
      <mesh position={[0, 2.95, -0.1]}><cylinderGeometry args={[0.2, 0.2, 0.07, 24]} /><Mat color={color} metalness={0.6} /></mesh>
      <mesh position={[0.73, 1.35, 0]}><boxGeometry args={[0.025, 2.5, 1.5]} /><meshStandardMaterial color="#b9d1d5" transparent opacity={0.35} /></mesh>
    </group>
  );
}

function Curtain({ color }) {
  return (
    <group>
      {/* Curtain rod */}
      <mesh position={[0, 2.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 2.2, 16]} />
        <Mat color="#b69a72" metalness={0.65} roughness={0.3} />
      </mesh>

      {/* Editable curtain fabric */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[0, 1.3, -0.95 + i * 0.17]}>
          <boxGeometry args={[0.035, 2.25, 0.19]} />
          <meshStandardMaterial color={color} roughness={1} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Curtain rings */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[0, 2.37, -0.95 + i * 0.17]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.055, 0.012, 8, 16]} />
          <Mat color="#b69a72" metalness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function Toilet({ color }) {
  return (
    <group>
      <mesh position={[0, 0.25, 0.05]}><cylinderGeometry args={[0.34, 0.28, 0.48, 24]} /><Mat color={color} /></mesh>
      <mesh position={[0, 0.52, 0.12]}><cylinderGeometry args={[0.4, 0.4, 0.1, 24]} /><Mat color="#e9e6df" /></mesh>
      <Box args={[0.72, 0.9, 0.18]} position={[0, 0.78, -0.35]} color={color} />
    </group>
  );
}

function Vanity({ color }) {
  return (
    <group>
      <Box args={[1.65, 0.82, 0.72]} position={[0, 0.48, 0]} color={color} />
      <Box args={[1.75, 0.12, 0.82]} position={[0, 0.95, 0]} color="#e8e5df" />
      <mesh position={[0, 1.04, 0]}><cylinderGeometry args={[0.24, 0.24, 0.08, 24]} /><Mat color="#f6f2eb" /></mesh>
      <Box args={[0.95, 1.1, 0.06]} position={[0, 1.9, -0.37]} color="#a9b7c1" />
    </group>
  );
}

function Mirror({ color }) {
  return (
    <group>
      <Box args={[1.1, 1.8, 0.08]} position={[0, 1.4, 0]} color="#8c7965" />
      <mesh position={[0, 1.4, 0.05]}><boxGeometry args={[0.95, 1.65, 0.025]} /><meshStandardMaterial color={color} metalness={0.75} roughness={0.12} /></mesh>
    </group>
  );
}

/* OTHER OBJECTS */

function Dresser({ color }) {
  return <group><Box args={[1.5, 1.05, 0.65]} position={[0, 0.55, 0]} color={color} />{[0.28, 0.58, 0.88].map((y) => <Box key={y} args={[1.36, 0.025, 0.025]} position={[0, y, 0.34]} color="#6d5038" />)}</group>;
}

function Nightstand({ color }) {
  return <group><Box args={[0.72, 0.72, 0.65]} position={[0, 0.4, 0]} color={color} /><Box args={[0.74, 0.06, 0.68]} position={[0, 0.79, 0]} color="#d5bd9f" /></group>;
}

function OfficeChair({ color }) {
  return <group><Box args={[0.75, 0.18, 0.7]} position={[0, 0.72, 0]} color={color} /><Box args={[0.75, 0.9, 0.15]} position={[0, 1.2, -0.28]} color={color} /><mesh position={[0, 0.35, 0]}><cylinderGeometry args={[0.055, 0.055, 0.65, 12]} /><Mat color="#777f82" /></mesh><mesh position={[0, 0.05, 0]}><cylinderGeometry args={[0.32, 0.32, 0.08, 16]} /><Mat color="#777f82" /></mesh></group>;
}

function Cabinet({ color }) {
  return <group><Box args={[1.45, 1.8, 0.55]} position={[0, 0.95, 0]} color={color} />{[-0.36, 0.36].map((x) => <mesh key={x} position={[x, 0.98, 0.29]}><sphereGeometry args={[0.04, 12, 12]} /><Mat color="#d3b47b" /></mesh>)}</group>;
}

function Toybox({ color }) {
  return <group><Box args={[1.2, 0.72, 0.8]} position={[0, 0.4, 0]} color={color} /><Box args={[1.28, 0.12, 0.86]} position={[0, 0.82, 0]} color="#f0e9dc" /></group>;
}

function Bathtub({ color }) {
  return <group><Box args={[2.3, 0.5, 1.2]} position={[0, 0.35, 0]} color={color} radius={0.18} /><Box args={[1.9, 0.12, 0.83]} position={[0, 0.62, 0]} color="#e8e5df" /></group>;
}

const models = {
  sofa: Sofa, chair: Chair, table: Table, bed: Bed,
  wardrobe: Wardrobe, tv: Tv, rug: Rug, dining: Dining,
  desk: Desk, plant: Plant, lamp: Lamp, shelf: Shelf,
  kitchenCabinet: KitchenCabinet, counter: Counter, sink: Sink,
  fridge: Fridge, island: Island, stool: Stool,
  shower: Shower, curtain: Curtain, toilet: Toilet,
  vanity: Vanity, mirror: Mirror, dresser: Dresser,
  nightstand: Nightstand, officeChair: OfficeChair,
  cabinet: Cabinet, toybox: Toybox, bathtub: Bathtub
};

/* DRAGGABLE FURNITURE */

function Furniture({ item, selected, onSelect, onMove, controlsRef }) {
  const dragRef = useRef(false);
  const offsetRef = useRef(new THREE.Vector3());
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const { gl } = useThree();
  const Model = models[item.type] || Table;

  const handlePointerDown = (event) => {
    event.stopPropagation();
    onSelect(item.id);
    dragRef.current = true;

    if (controlsRef.current) controlsRef.current.enabled = false;

    try {
      event.target.setPointerCapture(event.pointerId);
    } catch {}

    const point = new THREE.Vector3();
    if (event.ray.intersectPlane(plane, point)) {
      offsetRef.current.set(item.position[0] - point.x, 0, item.position[2] - point.z);
    }

    gl.domElement.style.cursor = "grabbing";
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current) return;
    event.stopPropagation();

    const point = new THREE.Vector3();
    if (event.ray.intersectPlane(plane, point)) {
      onMove(item.id, [
        point.x + offsetRef.current.x,
        0,
        point.z + offsetRef.current.z
      ]);
    }
  };

  const handlePointerUp = (event) => {
    if (!dragRef.current) return;
    dragRef.current = false;

    if (controlsRef.current) controlsRef.current.enabled = true;

    try {
      if (event.target.hasPointerCapture(event.pointerId)) {
        event.target.releasePointerCapture(event.pointerId);
      }
    } catch {}

    gl.domElement.style.cursor = "grab";
  };

  return (
    <group
      position={item.position}
      rotation={[0, item.rotation, 0]}
      scale={item.scale}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(item.id);
      }}
    >
      <Model color={item.color} />
      {selected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
          <ringGeometry args={[0.82, 0.9, 48]} />
          <meshBasicMaterial color="#a8795b" transparent opacity={0.9} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

/* ROOM ENVIRONMENT */

function RoomShell({ wallColor, floorColor, roomType }) {
  const isBathroom = roomType === "bathroom";

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[8, 7]} />
        <meshStandardMaterial color={floorColor} roughness={0.82} />
      </mesh>

      <mesh position={[0, 2.1, -3.55]} receiveShadow>
        <boxGeometry args={[8, 4.2, 0.12]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>

      <mesh position={[-4.05, 2.1, 0]} receiveShadow>
        <boxGeometry args={[0.12, 4.2, 7]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>

      {isBathroom && (
        <mesh position={[4.05, 2.1, 0]} receiveShadow>
          <boxGeometry args={[0.12, 4.2, 7]} />
          <meshStandardMaterial color={wallColor} roughness={0.95} />
        </mesh>
      )}

      <group position={[1.95, 2.35, -3.46]}>
        <Box args={[1.9, 1.75, 0.08]} position={[0, 0, 0]} color="#f8f4ec" />
        <mesh position={[0, 0, 0.055]}>
          <boxGeometry args={[1.72, 1.57, 0.025]} />
          <meshBasicMaterial color={isBathroom ? "#c3d9dd" : "#b9d0d6"} />
        </mesh>
        <Box args={[0.045, 1.6, 0.03]} position={[0, 0, 0.08]} color="#f4eee5" />
        <Box args={[1.75, 0.045, 0.03]} position={[0, 0, 0.08]} color="#f4eee5" />
      </group>

      <Box args={[8, 0.16, 0.1]} position={[0, 0.08, -3.46]} color="#d0c4b5" />
      <Box args={[0.1, 0.16, 7]} position={[-3.96, 0.08, 0]} color="#d0c4b5" />

      {isBathroom && (
        <Box args={[0.1, 0.16, 7]} position={[3.96, 0.08, 0]} color="#d0c4b5" />
      )}
    </>
  );
}

/* 3D SCENE */

function Scene({
  roomType, wallColor, floorColor, furniture,
  selectedId, onSelect, onMove, controlsRef
}) {
  return (
    <>
      <color attach="background" args={["#eae5dc"]} />
      <ambientLight intensity={1.05} />
      <hemisphereLight intensity={0.65} groundColor="#b4a18d" />
      <directionalLight
        position={[5, 9, 5]}
        intensity={2.1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-5, 5, -4]} intensity={0.55} />

      <RoomShell wallColor={wallColor} floorColor={floorColor} roomType={roomType} />

      {/* Curtain is now rendered like every other editable furniture object. */}
      {furniture.map((item) => (
        <Furniture
          key={item.id}
          item={item}
          selected={item.id === selectedId}
          onSelect={onSelect}
          onMove={onMove}
          controlsRef={controlsRef}
        />
      ))}

      <ContactShadows position={[0, 0.01, 0]} opacity={0.35} scale={10} blur={2.5} far={4} />
    </>
  );
}

/* MAIN COMPONENT */

export default function Room3D({
  roomType = "living",
  wallColor,
  floorColor,
  furniture,
  selectedId,
  onSelect,
  onMove
}) {
  const controlsRef = useRef();

  return (
    <Canvas
      shadows
      camera={{ position: [9, 7, 11], fov: 38 }}
      dpr={[1, 1.5]}
      onCreated={({ gl }) => {
        gl.setClearColor("#eae5dc");
        gl.domElement.style.cursor = "grab";
      }}
      onPointerMissed={() => onSelect(null)}
    >
      <Scene
        roomType={roomType}
        wallColor={wallColor}
        floorColor={floorColor}
        furniture={furniture}
        selectedId={selectedId}
        onSelect={onSelect}
        onMove={onMove}
        controlsRef={controlsRef}
      />

      <OrbitControls
        ref={controlsRef}
        makeDefault
        target={[0, 1.1, 0]}
        minDistance={6}
        maxDistance={17}
        maxPolarAngle={Math.PI / 2.02}
        minPolarAngle={0.2}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}
