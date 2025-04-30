import React, { useState, useEffect } from 'react';
import './App.css'; // For styling
// Import the drumPads data structure defined above
// import { drumPads } from './drumPadData'; // If you put data in a separate file

// Or define drumPads directly in App.jsx for simplicity
const drumPads = [
  {
    key: 'Q',
    keyCode: 81,
    id: 'Heater-1',
    url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3',
    description: 'Heater 1'
  },
  {
    key: 'W',
    keyCode: 87,
    id: 'Heater-2',
    url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3',
    description: 'Heater 2'
  },
  {
    key: 'E',
    keyCode: 69,
    id: 'Heater-3',
    url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3',
    description: 'Heater 3'
  },
  {
    key: 'A',
    keyCode: 65,
    id: 'Heater-4',
    url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3',
    description: 'Heater 4'
  },
  {
    key: 'S',
    keyCode: 83,
    id: 'Clap',
    url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3',
    description: 'Clap'
  },
  {
    key: 'D',
    keyCode: 68,
    id: 'Open-HH',
    url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3',
    description: 'Open Hi-Hat'
  },
  {
    key: 'Z',
    keyCode: 90,
    id: 'Kick-n-Hat',
    url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3',
    description: 'Kick n\' Hat'
  },
  {
    key: 'X',
    keyCode: 88,
    id: 'Kick',
    url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3',
    description: 'Kick'
  },
  {
    key: 'C',
    keyCode: 67,
    id: 'Closed-HH',
    url: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3',
    description: 'Closed Hi-Hat'
  }
];


function App() {
  // State for the display message
  const [displayMessage, setDisplayMessage] = useState('');
  const [volume, setVolume] = useState(0.5); // State for volume, initialized to 50%'

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value); // Get the new volume value
    setVolume(newVolume); // Update volume state

    // Update the volume of all audio elements
    const audioElements = document.querySelectorAll('.clip');
    audioElements.forEach(audio => {
        audio.volume = newVolume;
    });
  };
  // Function to play the audio and update the display
  const playSound = (key, description) => {
    const audio = document.getElementById(key); // Get the audio element by its ID (Q, W, E, etc.)

    if (audio) {
      audio.currentTime = 0; // Rewind to the start
      audio.volume = volume; // Set volume before playing
      audio.play(); // Play the audio
      setDisplayMessage(description); // Update the display state
    }
  };

  // Click handler for drum pads
  const handleClick = (event) => {
    // Get the key and description from the clicked element's dataset or attributes
    // We'll attach these to the button/div later
    const key = event.target.innerText; // Get the key from the button's text
    const pad = drumPads.find(pad => pad.key === key); // Find the corresponding pad data

    if (pad) {
        playSound(pad.key, pad.description); // Play sound using data from the array
    }
  };


  // --- Keyboard Event Handling (Will add in the next step) ---
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if the pressed key matches any of our drum pad keys (case-insensitive)
      const pressedKey = event.key.toUpperCase();
      const pad = drumPads.find(pad => pad.key === pressedKey);

      if (pad) {
        // If a matching pad is found, play the sound and update display
        playSound(pad.key, pad.description);
        // You could also trigger a click event on the corresponding button here if you need button active states
        // document.getElementById(pad.key).parentElement.click(); // Assuming audio is child of button/div with key ID
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty dependency array means this runs only once on mount and cleanup on unmount


  return (
    <div id="drum-machine" className="drum-machine"> {/* Outer container */}
      <div className="controls">
      {/* Display element */}
      <div id="display" className="display">{displayMessage}</div>

      {/* Volume Control */}
      <div className="volume-control"> {/* Optional wrapper for label and slider */}
          <label htmlFor="volume-slider" className="volume-label">Volume:</label>
          <input
              type="range"
              id="volume-slider"
              min="0" // Minimum volume (0%)
              max="1" // Maximum volume (100%)
              step="0.01" // Step value for finer control
              value={volume} // Controlled component: slider value from state
              onChange={handleVolumeChange} // Handler to update volume state and audio elements
          />
      </div>
  </div>


      <div className="pad-bank"> {/* Container for the drum pads */}
        {drumPads.map(pad => (
          <div
            key={pad.id} // Unique key for React list rendering
            id={pad.id} // Unique ID for the drum pad div
            className="drum-pad"
            onClick={handleClick} // Attach click handler
          >
            {pad.key} {/* The key text (Q, W, E, etc.) */}
            <audio
              className="clip"
              id={pad.key} // Audio ID must be the key (Q, W, E)
              src={pad.url}
            ></audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;