
import { useEffect, useMemo, useState } from "react";
import {
  Home, Sofa, BedDouble, CookingPot, Bath, Monitor, Baby,
  Save, RotateCcw, Palette, Trash2, Plus, ChevronUp,
  ChevronDown, ChevronLeft, ChevronRight, Sparkles,
  Maximize2, Minimize2, Minus, PlusCircle, RotateCw, X
} from "lucide-react";
import Room3D from "./components/Room3D";
import "./App.css";

const STORAGE_KEY = "roomora-multi-room-design";

const roomDefinitions = [
  { id: "living", name: "Living Room", icon: Sofa, subtitle: "Relax, entertain and unwind" },
  { id: "bedroom", name: "Main Bedroom", icon: BedDouble, subtitle: "Create your personal retreat" },
  { id: "kitchenDining", name: "Kitchen & Dining", icon: CookingPot, subtitle: "Cook, dine and spend time together" },
  { id: "bathroom", name: "Bathroom", icon: Bath, subtitle: "Create a calming bathroom" },
  { id: "office", name: "Home Office", icon: Monitor, subtitle: "Build your productivity space" },
  { id: "kids", name: "Nursery", icon: Baby, subtitle: "Make space for imagination" }
];

const wallColors = [
  { name: "Warm White", value: "#eee9df" },
  { name: "Cream", value: "#e8dcc8" },
  { name: "Sand", value: "#d8c4a9" },
  { name: "Sage", value: "#aab5a0" },
  { name: "Terracotta", value: "#bd8068" },
  { name: "Dusty Rose", value: "#d4aaa3" },
  { name: "Charcoal", value: "#55534e" },
  { name: "Soft Grey", value: "#c6c5bf" }
];

const floorColors = [
  { name: "Natural Oak", value: "#b88b5c" },
  { name: "Light Oak", value: "#d0ae7e" },
  { name: "Walnut", value: "#79553c" },
  { name: "Dark Wood", value: "#4c382d" },
  { name: "Stone", value: "#aaa69c" },
  { name: "Marble", value: "#dedbd3" },
  { name: "Tile", value: "#c9c5bc" }
];

const furnitureColors = [
  "#c7a98b", "#a8795b", "#e5d6c4", "#8b9b83",
  "#b77c70", "#6c7770", "#393a38", "#d2b56f",
  "#f0e9dc", "#897b70", "#a9b7c1", "#ffffff"
];

const catalogs = {
  living: [
    ["sofa", "Sofa", "#c7a98b"], ["chair", "Armchair", "#8b9b83"],
    ["table", "Coffee table", "#a8795b"], ["tv", "TV unit", "#79553c"],
    ["rug", "Rug", "#c7a98b"], ["plant", "Plant", "#8b9b83"],
    ["lamp", "Floor lamp", "#d2b56f"], ["shelf", "Bookshelf", "#a8795b"]
  ],
  bedroom: [
    ["bed", "Bed", "#e5d6c4"], ["wardrobe", "Wardrobe", "#b88b5c"],
    ["dresser", "Dresser", "#a8795b"], ["nightstand", "Bedside table", "#a8795b"],
    ["lamp", "Floor lamp", "#d2b56f"], ["rug", "Rug", "#c7a98b"],
    ["plant", "Plant", "#8b9b83"], ["mirror", "Standing mirror", "#b9c4c6"]
  ],
  kitchenDining: [
    ["kitchenCabinet", "Kitchen cabinets", "#e5d6c4"],
    ["counter", "Countertop", "#a9a39a"], ["sink", "Kitchen sink", "#a9b7c1"],
    ["fridge", "Refrigerator", "#d9dedf"], ["island", "Kitchen island", "#b88b5c"],
    ["stool", "Bar stool", "#a8795b"], ["dining", "Dining set", "#a8795b"],
    ["cabinet", "Display cabinet", "#b88b5c"], ["plant", "Plant", "#8b9b83"],
    ["lamp", "Floor lamp", "#d2b56f"], ["rug", "Rug", "#c7a98b"],
    ["shelf", "Open shelf", "#a8795b"]
  ],
  bathroom: [
    ["shower", "Shower", "#a9b7c1"], ["curtain", "Shower curtain", "#f5eee3"],
    ["toilet", "Toilet", "#f0e9dc"], ["vanity", "Vanity unit", "#a8795b"],
    ["mirror", "Mirror", "#b9c4c6"], ["shelf", "Storage shelf", "#a8795b"],
    ["plant", "Plant", "#8b9b83"]
  ],
  office: [
    ["desk", "Study desk", "#b88b5c"], ["officeChair", "Office chair", "#6c7770"],
    ["shelf", "Bookshelf", "#a8795b"], ["cabinet", "Storage cabinet", "#b88b5c"],
    ["plant", "Plant", "#8b9b83"], ["lamp", "Floor lamp", "#d2b56f"]
  ],
  kids: [
    ["bed", "Kids' bed", "#d4aaa3"], ["wardrobe", "Wardrobe", "#e5d6c4"],
    ["desk", "Study desk", "#b88b5c"], ["officeChair", "Study chair", "#8b9b83"],
    ["toybox", "Toy storage", "#d4aaa3"], ["rug", "Play rug", "#d4aaa3"],
    ["shelf", "Bookshelf", "#a8795b"]
  ]
};

const roomDefaults = {
  living: {
    wall: "#eee9df", floor: "#b88b5c",
    furniture: [
      ["sofa", "Sofa", [-1.5, 0, 1.35], "#c7a98b"],
      ["table", "Coffee table", [-1.2, 0, -0.1], "#a8795b"],
      ["plant", "Plant", [3.05, 0, 2.25], "#8b9b83"],
      ["chair", "Armchair", [1.7, 0, 1.1], "#8b9b83"],
      ["tv", "TV unit", [1.5, 0, -2.5], "#79553c"]
    ]
  },
  bedroom: {
    wall: "#e8dcc8", floor: "#b88b5c",
    furniture: [
      ["bed", "Bed", [0, 0, 0.25], "#e5d6c4"],
      ["nightstand", "Bedside table", [-1.7, 0, -1], "#a8795b"],
      ["nightstand", "Bedside table", [1.7, 0, -1], "#a8795b"],
      ["wardrobe", "Wardrobe", [-3, 0, -2.2], "#b88b5c"],
      ["lamp", "Floor lamp", [3, 0, 2.2], "#d2b56f"]
    ]
  },
  kitchenDining: {
    wall: "#eee9df", floor: "#aaa69c",
    furniture: [
      ["kitchenCabinet", "Kitchen cabinets", [-2.7, 0, -2.6], "#e5d6c4"],
      ["counter", "Countertop", [0, 0, -2.6], "#a9a39a"],
      ["fridge", "Refrigerator", [3, 0, -2.4], "#d9dedf"],
      ["island", "Kitchen island", [-0.5, 0, -0.1], "#b88b5c"],
      ["stool", "Bar stool", [1, 0, 0.5], "#a8795b"],
      ["dining", "Dining set", [0, 0, 2.1], "#a8795b"],
      ["cabinet", "Display cabinet", [-3, 0, 2.3], "#b88b5c"],
      ["plant", "Plant", [3, 0, 2.3], "#8b9b83"]
    ]
  },
  bathroom: {
    wall: "#dedbd3", floor: "#aaa69c",
    furniture: [
      ["shower", "Shower", [-2.8, 0, -1.8], "#a9b7c1"],
      ["curtain", "Shower curtain", [-1.75, 0, -1.8], "#f5eee3"],
      ["vanity", "Vanity unit", [2.7, 0, -2.2], "#a8795b"],
      ["mirror", "Mirror", [1.3, 0, -2.7], "#b9c4c6"],
      ["toilet", "Toilet", [2.7, 0, 1.2], "#f0e9dc"],
      ["shelf", "Storage shelf", [-2.8, 0, 1.5], "#a8795b"]
    ]
  },
  office: {
    wall: "#e8dcc8", floor: "#79553c",
    furniture: [
      ["desk", "Study desk", [0, 0, -1.6], "#b88b5c"],
      ["officeChair", "Office chair", [0, 0, 0], "#6c7770"],
      ["shelf", "Bookshelf", [-3, 0, -2], "#a8795b"],
      ["plant", "Plant", [3, 0, 2], "#8b9b83"]
    ]
  },
  kids: {
    wall: "#d4aaa3", floor: "#d0ae7e",
    furniture: [
      ["bed", "Kids' bed", [-1.2, 0, 0.5], "#d4aaa3"],
      ["desk", "Study desk", [1.5, 0, -1.7], "#b88b5c"],
      ["toybox", "Toy storage", [2.8, 0, 1.5], "#d4aaa3"],
      ["shelf", "Bookshelf", [-3, 0, -2], "#a8795b"]
    ]
  }
};

function createInitialRooms() {
  return Object.fromEntries(
    Object.entries(roomDefaults).map(([roomId, config]) => [
      roomId,
      {
        wall: config.wall,
        floor: config.floor,
        furniture: config.furniture.map((item, index) => ({
          id: `${roomId}-${index + 1}`,
          type: item[0],
          name: item[1],
          position: item[2],
          rotation: 0,
          color: item[3],
          scale: 1
        }))
      }
    ])
  );
}

function App() {
  const [rooms, setRooms] = useState(createInitialRooms);
  const [activeRoom, setActiveRoom] = useState("living");
  const [selectedId, setSelectedId] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  const currentRoom = rooms[activeRoom];

  const selectedItem = useMemo(
    () => currentRoom.furniture.find((item) => item.id === selectedId) || null,
    [currentRoom.furniture, selectedId]
  );

  const currentCatalog = catalogs[activeRoom] || catalogs.living;
  const activeRoomInfo = roomDefinitions.find((room) => room.id === activeRoom);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const parsed = JSON.parse(saved);
      if (!parsed.rooms || typeof parsed.rooms !== "object") return;

      const defaults = createInitialRooms();
      const savedRooms = parsed.rooms;
      const migratedRooms = { ...defaults };

      Object.keys(defaults).forEach((roomId) => {
        if (!savedRooms[roomId]) return;

        const oldFurniture = Array.isArray(savedRooms[roomId].furniture)
          ? savedRooms[roomId].furniture
          : defaults[roomId].furniture;

        migratedRooms[roomId] = {
          ...defaults[roomId],
          ...savedRooms[roomId],
          furniture: roomId === "bathroom"
            ? oldFurniture.filter((item) => item.type !== "bathtub")
            : oldFurniture
        };
      });

      if (!savedRooms.kitchenDining && (savedRooms.kitchen || savedRooms.dining)) {
        const oldKitchen = savedRooms.kitchen || {};
        const oldDining = savedRooms.dining || {};

        migratedRooms.kitchenDining = {
          ...defaults.kitchenDining,
          wall: oldKitchen.wall || defaults.kitchenDining.wall,
          floor: oldKitchen.floor || defaults.kitchenDining.floor,
          furniture: [
            ...(Array.isArray(oldKitchen.furniture) ? oldKitchen.furniture : []),
            ...(Array.isArray(oldDining.furniture) ? oldDining.furniture : [])
          ]
        };
      }

      setRooms(migratedRooms);

      let restoredRoom = parsed.activeRoom;
      if (restoredRoom === "kitchen" || restoredRoom === "dining") {
        restoredRoom = "kitchenDining";
      }

      if (roomDefinitions.some((room) => room.id === restoredRoom)) {
        setActiveRoom(restoredRoom);
      }
    } catch {
      console.warn("Roomora could not read the saved project.");
    }
  }, []);

  const updateCurrentRoom = (updater) => {
    setRooms((previous) => ({
      ...previous,
      [activeRoom]: updater(previous[activeRoom])
    }));
  };

  const updateFurniture = (id, updates) => {
    updateCurrentRoom((room) => ({
      ...room,
      furniture: room.furniture.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    }));
  };

  const moveFurniture = (id, position) => {
    const safePosition = [
      Math.max(-3.5, Math.min(3.5, position[0])),
      0,
      Math.max(-2.9, Math.min(2.9, position[2]))
    ];
    updateFurniture(id, { position: safePosition });
  };

  const moveSelected = (axis, amount) => {
    if (!selectedItem) return;
    const next = [...selectedItem.position];
    next[axis] += amount;
    moveFurniture(selectedItem.id, next);
  };

  const rotateSelected = (amount) => {
    if (!selectedItem) return;
    updateFurniture(selectedItem.id, {
      rotation: selectedItem.rotation + amount
    });
  };

  const resizeSelected = (amount) => {
    if (!selectedItem) return;
    updateFurniture(selectedItem.id, {
      scale: Math.max(0.55, Math.min(1.6, selectedItem.scale + amount))
    });
  };

  const addFurniture = (option) => {
    const newItem = {
      id: `${activeRoom}-${Date.now()}`,
      type: option[0],
      name: option[1],
      position: [0, 0, 0],
      rotation: 0,
      color: option[2],
      scale: 1
    };

    updateCurrentRoom((room) => ({
      ...room,
      furniture: [...room.furniture, newItem]
    }));
    setSelectedId(newItem.id);
  };

  const deleteFurniture = () => {
    if (!selectedItem) return;

    const remaining = currentRoom.furniture.filter(
      (item) => item.id !== selectedId
    );

    updateCurrentRoom((room) => ({ ...room, furniture: remaining }));
    setSelectedId(remaining[0]?.id ?? null);
  };

  const saveDesign = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        rooms,
        activeRoom,
        savedAt: new Date().toISOString()
      }));
      setSavedMessage("Your home design has been saved!");
    } catch {
      setSavedMessage("Unable to save. Browser storage may be full.");
    }
    window.setTimeout(() => setSavedMessage(""), 3000);
  };

  const resetCurrentRoom = () => {
    const defaultRoom = createInitialRooms()[activeRoom];
    updateCurrentRoom(() => defaultRoom);
    setSelectedId(null);
    setSavedMessage(`${activeRoomInfo.name} has been reset.`);
    window.setTimeout(() => setSavedMessage(""), 2500);
  };

  const changeRoom = (roomId) => {
    setActiveRoom(roomId);
    setSelectedId(null);
    setIsFullscreen(false);
  };

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#" aria-label="Roomora home">
          <span className="brand-mark">R</span>
          <span className="brand-name">roomora<span>.</span></span>
        </a>

        <div className="nav-center">
          <span className="nav-dot" />
          <span>YOUR HOME DESIGN STUDIO</span>
        </div>

        <div className="nav-actions">
          <button className="nav-reset" onClick={resetCurrentRoom}>
            <RotateCcw size={15} /><span>Reset room</span>
          </button>
          <button className="save-button" onClick={saveDesign}>
            <Save size={16} /> Save home
          </button>
        </div>
      </header>

      <main className="studio">
        <section className="workspace">
          <div className="page-heading">
            <div>
              <p className="eyebrow">YOUR CREATIVE SPACE</p>
              <h1>Design your <em>dream home.</em></h1>
              <p className="heading-description">
                Every room, every detail. Make your space truly yours.
              </p>
            </div>
            <div className="room-status">
              <span className="status-indicator" /> 3D LIVE PREVIEW
            </div>
          </div>

          <section className="room-selector-section">
            <div className="room-selector-heading">
              <div>
                <h2>Your rooms</h2>
                <p>Choose a room to start designing</p>
              </div>
              <span>{roomDefinitions.length} ROOMS</span>
            </div>

            <div className="room-selector">
              {roomDefinitions.map((room) => {
                const Icon = room.icon;
                return (
                  <button
                    key={room.id}
                    className={`room-card ${activeRoom === room.id ? "room-card-active" : ""}`}
                    onClick={() => changeRoom(room.id)}
                  >
                    <span className="room-card-icon"><Icon size={19} /></span>
                    <span className="room-card-name">{room.name}</span>
                    <span className="room-card-count">
                      {rooms[room.id]?.furniture.length ?? 0} items
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <div className={`preview ${isFullscreen ? "preview-fullscreen" : ""}`}>
            <div className="preview-topbar">
              <div className="preview-label">
                <span className="preview-live-dot" />
                <span>{activeRoomInfo.name.toUpperCase()} PREVIEW</span>
              </div>
              <div className="preview-tools">
                <span className="preview-hint">Drag objects to move · Scroll to zoom</span>
                <button
                  className="icon-button"
                  onClick={() => setIsFullscreen((value) => !value)}
                  title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
                </button>
              </div>
            </div>

            <div className="canvas">
              <Room3D
                roomType={activeRoom}
                wallColor={currentRoom.wall}
                floorColor={currentRoom.floor}
                furniture={currentRoom.furniture}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onMove={moveFurniture}
              />
            </div>

            <div className="preview-footer">
              <span>↗ Orbit to explore your room</span>
              <span>{currentRoom.furniture.length} objects in this room</span>
            </div>
          </div>

          <div className="workspace-bottom">
            <div className="tip-card">
              <div className="tip-icon"><Sparkles size={18} /></div>
              <div>
                <strong>{activeRoomInfo.name}</strong>
                <p>{activeRoomInfo.subtitle}. Select furniture and make it your own.</p>
              </div>
            </div>
            <div className="selection-count">
              <span className="selection-count-number">
                {currentRoom.furniture.length.toString().padStart(2, "0")}
              </span>
              <span>ROOM OBJECTS</span>
            </div>
          </div>
        </section>

        <aside className="controls">
          <div className="controls-heading">
            <div>
              <p className="eyebrow">DESIGN WORKSPACE</p>
              <h2>Studio controls</h2>
            </div>
            <span className="controls-sparkle"><Sparkles size={17} /></span>
          </div>

          <div className="active-room-label">
            <Home size={15} />
            <span>Editing: <strong>{activeRoomInfo.name}</strong></span>
          </div>

          <section className="control-section">
            <div className="section-title">
              <div className="section-icon"><Palette size={16} /></div>
              <div><h3>Room colours</h3><p>Set the mood of your space</p></div>
            </div>

            <div className="colour-group">
              <div className="colour-label">
                <span>Wall colour</span>
                <span className="colour-value">
                  {wallColors.find((c) => c.value === currentRoom.wall)?.name || "Custom"}
                </span>
              </div>
              <div className="swatches">
                {wallColors.map((color) => (
                  <button
                    key={color.value}
                    className={`swatch ${currentRoom.wall === color.value ? "selected" : ""}`}
                    style={{ background: color.value }}
                    onClick={() => updateCurrentRoom((room) => ({ ...room, wall: color.value }))}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="colour-group">
              <div className="colour-label">
                <span>Floor colour</span>
                <span className="colour-value">
                  {floorColors.find((c) => c.value === currentRoom.floor)?.name || "Custom"}
                </span>
              </div>
              <div className="swatches">
                {floorColors.map((color) => (
                  <button
                    key={color.value}
                    className={`swatch ${currentRoom.floor === color.value ? "selected" : ""}`}
                    style={{ background: color.value }}
                    onClick={() => updateCurrentRoom((room) => ({ ...room, floor: color.value }))}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="control-section">
            <div className="section-title">
              <div className="section-icon"><Plus size={16} /></div>
              <div>
                <h3>Add to {activeRoomInfo.name}</h3>
                <p>Room-specific furniture collection</p>
              </div>
            </div>
            <div className="furniture-grid">
              {currentCatalog.map((option) => (
                <button
                  className="furniture-option"
                  key={option[0]}
                  onClick={() => addFurniture(option)}
                >
                  <span className="furniture-option-icon"><PlusCircle size={19} /></span>
                  <span>{option[1]}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="control-section">
            <div className="section-title">
              <div className="section-icon"><Sofa size={16} /></div>
              <div><h3>Room furniture</h3><p>Select an object to customise it</p></div>
            </div>
            <div className="object-list">
              {currentRoom.furniture.length === 0 ? (
                <p className="empty-state">This room is empty. Add furniture to get started.</p>
              ) : currentRoom.furniture.map((item) => (
                <button
                  key={item.id}
                  className={`object-row ${selectedId === item.id ? "object-selected" : ""}`}
                  onClick={() => setSelectedId(item.id)}
                >
                  <span className="object-icon"><Plus size={15} /></span>
                  <span className="object-name">{item.name}</span>
                  <span className="object-colour" style={{ background: item.color }} />
                </button>
              ))}
            </div>
          </section>

          <section className="control-section selected-section">
            <div className="section-title">
              <div className="section-icon"><Sparkles size={16} /></div>
              <div>
                <h3>Selected object</h3>
                <p>{selectedItem ? `Customise ${selectedItem.name.toLowerCase()}` : "Choose an object first"}</p>
              </div>
            </div>

            {selectedItem ? (
              <div className="selected-editor">
                <div className="selected-item-heading">
                  <div><strong>{selectedItem.name}</strong><span>Selected in 3D room</span></div>
                  <button className="delete-button" onClick={deleteFurniture} title="Delete object">
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="editor-subtitle">Object colour</div>
                <div className="swatches furniture-swatches">
                  {furnitureColors.map((color) => (
                    <button
                      key={color}
                      className={`swatch ${selectedItem.color === color ? "selected" : ""}`}
                      style={{ background: color }}
                      onClick={() => updateFurniture(selectedId, { color })}
                      title={color}
                    />
                  ))}
                </div>

                <div className="editor-subtitle position-heading">Position</div>
                <div className="movement-pad">
                  <span className="movement-label">Move object</span>
                  <div className="movement-grid">
                    <span />
                    <button onClick={() => moveSelected(2, -0.25)} title="Move forward"><ChevronUp size={17} /></button>
                    <span />
                    <button onClick={() => moveSelected(0, -0.25)} title="Move left"><ChevronLeft size={17} /></button>
                    <span className="movement-center">✥</span>
                    <button onClick={() => moveSelected(0, 0.25)} title="Move right"><ChevronRight size={17} /></button>
                    <span />
                    <button onClick={() => moveSelected(2, 0.25)} title="Move backward"><ChevronDown size={17} /></button>
                    <span />
                  </div>
                </div>

                <div className="editor-subtitle">Rotation</div>
                <div className="adjust-row">
                  <span>Rotate object</span>
                  <div className="adjust-buttons">
                    <button onClick={() => rotateSelected(-Math.PI / 12)} title="Rotate left"><RotateCcw size={15} /></button>
                    <button onClick={() => rotateSelected(Math.PI / 12)} title="Rotate right"><RotateCw size={15} /></button>
                  </div>
                </div>

                <div className="editor-subtitle">Size</div>
                <div className="adjust-row">
                  <span>Object scale</span>
                  <div className="adjust-buttons">
                    <button onClick={() => resizeSelected(-0.1)} title="Smaller"><Minus size={15} /></button>
                    <span className="scale-value">{Math.round(selectedItem.scale * 100)}%</span>
                    <button onClick={() => resizeSelected(0.1)} title="Larger"><Plus size={15} /></button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-selection">
                <Sparkles size={22} />
                <p>Select an item from the room or furniture list to edit it.</p>
              </div>
            )}
          </section>

          <div className="sidebar-bottom">
            <button className="save-button sidebar-save" onClick={saveDesign}>
              <Save size={16} /> Save entire home
            </button>
            {savedMessage && <p className="saved-message">{savedMessage}</p>}
            <p className="save-note">All rooms are saved together in this browser.</p>
          </div>
        </aside>
      </main>

      {isFullscreen && (
        <button className="fullscreen-exit" onClick={() => setIsFullscreen(false)}>
          <X size={17} /> Exit fullscreen
        </button>
      )}
    </div>
  );
}

export default App;
