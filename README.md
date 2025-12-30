# Resonance Stealth

> **A single-interface survival stealth game where you remotely control robots through wave physics in a post-apocalyptic radio-silent world.**

[Play the Demo](https://irondumpling.github.io/resonance-stealth/)

---

## Game Overview

**Resonance** is an immersive simulation / survival stealth game set in a world where invisible wave-based creatures have invaded the metro biosphere. These creatures are extremely sensitive to waves, forcing humanity into a decade-long radio silence where survivors are isolated and alone.

You play as a survivor in the cold northern lands. One day, you receive an unknown signal and discover a crashed satellite containing quantum communication devices from another era. Through this device, you're guided by someone calling themselves "Astronaut" to rebuild the communication network.

You must remotely control assembled bionic robots through a computer terminal, using wave physics to explore the frozen wasteland, find survivors, and weave the last connections of humanity through text communication.

---

## Core Features

### Wave-Based Vision System
- The world is dark by default—you can only "see" terrain and enemies by actively emitting waves
- Waves propagate, interfere, and resonate based on frequency physics
- Objects have blocking frequencies: lower frequencies pass through, higher frequencies are blocked and detected

### Energy-Driven Stealth
- Stealth is not just about avoiding sight—it's about controlling your "energy radiation radius" and "frequency"
- Simulates real physical field gameplay where energy consumption creates detectable radiation
- Enemies sense energy, not vision—manage your emissions carefully

### Core-Based Roguelite
- Your robot's "heart" comes from enemy cores
- Different cores determine your robot's class characteristics
- Death means losing your current core—choose your strategy wisely

### Natural Language Interaction (RAG Dialogue)
- Uses semantic retrieval (Embedding) based dialogue system
- Type freely to communicate with NPCs instead of rigid dialogue options
- *Note: Currently in development*

---

## Game Mechanics

### Wave Physics

Waves carry both **energy** and **information**:

- **Interference**: Waves overlap and interfere with each other
- **Resonance**: When frequencies are similar, resonance occurs
- **Blocking Frequency**: Each object has a blocking frequency
  - Waves **below** the blocking frequency pass through (losing some energy, object not detected)
  - Waves **above** the blocking frequency are blocked (object receives kinetic push and is detected)

### Combat System

#### State A: Resonance Overload (Obtain "Hot Core")
1. **Resonance**: Match frequency with enemy to trigger resonance
2. **Overload**: Focused waves cause overload buildup
3. **Stun**: When overload bar fills, enemy is paralyzed
4. **Execute**: Press E to execute—enemy explodes, drops **[Hot Core]**
   - Cannot recover energy, high energy consumption

#### State B: Stealth Assassination (Obtain "Energy" and "Cold Core")
1. **Sneak**: Control radiation radius, approach undetected
2. **Drain**: Match frequency, press E at close range to connect
   - Gain large energy recovery, enemy energy drops to zero and enters dormancy
3. **Execute**: Overload dormant enemies to get **[Cold Core]**
   - Provides energy recovery and materials

#### State C: Capture & Escape
- **Trigger**: Physical contact with active enemy, or radiation too high
- **Consequence**: Enemy continuously drains your energy
- **Choice**:
  - **Give up**: Energy drained, enter dormancy (preserve body, wait for rescue)
  - **Escape (F key)**: Consume durability to force push enemy away (keep energy, but body may be damaged)

### Core Types

- **Scavenger Core**: Initial core. Energy-efficient, basic frequency range
- **Mimic Core**: Rare. Full frequency coverage, can mimic environmental waves
- **Heavy Core**: Very low frequency. Cannot detect details, but waves have physical push (path clearing/knockback)

### Enemy Behavior

- **Invisibility**: Enemies are normally invisible
- **Detection**: Enemies have no vision—they sense different forms of energy
- **Dormancy**: When energy is depleted, enemies become dormant "static objects"
- **Passive Absorption**: Touching dormant enemies causes slow energy flow—if threshold is reached, enemy awakens

---

## Controls

| Key | Action | Description |
|-----|--------|-------------|
| **WASD** | Move | Movement with noticeable delay, produces medium radiation |
| **Shift** | Run | Produces high radiation |
| **Space (Short)** | Ping | Low energy cost, instant reveal |
| **Space (Long)** | Focus/Shoot | High energy cost, produces massive radiation, used for combat/overload |
| **Mouse Wheel** | Adjust Frequency | Adjust emitted wave frequency |
| **E** | Interact/Execute | Stealth drain / Overload execute / Pick up items |
| **F** | Escape/Drag | Consume durability to escape when grabbed |
| **R** | Restore | Use inventory items to restore energy |

---

## Single Interface Design

The game takes place at a workstation with:

- **Radio Transceiver (Left)**: Controls robot wave reception and transmission
  - Frequency tuning
  - Signal detection and recording
  - Antenna direction adjustment
  - Signal transmission

- **CRT Monitor (Right)**: Controls signal decoding, encryption, terrain exploration, route planning, and robot control
  - Wave visualization
  - Radar map
  - Morse code decoding
  - Game view

---

## Technology Stack

- **Pure JavaScript** (Vanilla JS, no frameworks)
- **HTML5 Canvas** for rendering
- **CSS3** for UI styling and CRT effects
- **Web-based** prototype (future Unity port planned)

---

## Development Status

### Completed (Prototype Phase)
- Core wave physics: wave propagation, blocking, resonance
- Radiation stealth algorithm (blind zone/sensitive zone detection)
- Basic combat and stealth systems
- Radio transceiver UI
- CRT monitor display
- Inventory system
- Core-based character system

### In Progress
- RAG dialogue system (MVP with API)
- Morse code encoding/decoding
- Radar map functionality
- Additional enemy types

### Planned (Unity Port)
- Shader implementation for "sonar vision" effects
- Local Embedding model integration (Unity Sentis) for offline dialogue
- Enhanced inventory and assembly systems
- 3-4 enemy types with different frequency behaviors
- NPC scripts and Embedding corpus

---

## References & Inspiration

- **Duskers**: Single-interface immersive simulation and exploration
- **AI Limit**: Wave core design
- **DREDGE**: Backpack management design

---

## How to Play

1. Open `index.html` in a modern web browser
2. Or visit the [live demo](https://irondumpling.github.io/resonance-stealth/)
3. Use WASD to move, mouse to look around
4. Short-press Space to emit waves and reveal the world
5. Long-press Space to focus waves for combat
6. Use mouse wheel to adjust frequency
7. Match enemy frequencies to trigger resonance
8. Manage your energy and radiation carefully!

---

## License

This project is a work in progress. All rights reserved.
