
import { useState, useEffect } from 'react';

export default function LePacteMJ() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setRunning(false);
    }
    return () => clearInterval(interval);
  }, [running, timer]);

  const addPlayer = () => {
    if (!name.trim()) return;
    setPlayers([
      ...players,
      {
        name: name.trim(),
        red: 3,
        blue: 2,
        black: 2,
        cards: 0,
        role: '',
        objective: '',
        powerUsed: false,
        revealed: false,
        pactes: ''
      }
    ]);
    setName('');
  };

  const updatePlayer = (index, field, value) => {
    const updated = [...players];
    updated[index][field] = value;
    setPlayers(updated);
  };

  const resetJetons = () => {
    const reset = players.map(p => ({ ...p, red: 3, blue: 2, black: 2 }));
    setPlayers(reset);
  };

  const removePlayer = (index) => {
    const updated = [...players];
    updated.splice(index, 1);
    setPlayers(updated);
  };

  const resetAll = () => {
    setPlayers([]);
    setTimer(0);
    setRunning(false);
  };

  return (
    <div style={{ padding: '1rem', backgroundColor: '#111', minHeight: '100vh', color: 'white' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>MJ - Le Pacte : La Famiglia</h1>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Pseudo du joueur"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ flexGrow: 1, padding: '0.5rem', color: 'black' }}
        />
        <button onClick={addPlayer} style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1rem' }}>
          Ajouter
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button onClick={resetJetons} style={{ backgroundColor: '#d97706', padding: '0.5rem' }}>Reset jetons</button>
        <button onClick={() => { setTimer(120); setRunning(true); }} style={{ backgroundColor: '#dc2626', padding: '0.5rem' }}>Démarrer Chrono 2 min</button>
        <button onClick={resetAll} style={{ backgroundColor: '#374151', padding: '0.5rem' }}>Réinitialiser la partie</button>
        {running && <div style={{ fontSize: '1.1rem' }}>⏳ {timer}s</div>}
      </div>

      {players.length > 0 && (
        <table style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#1f2937' }}>
              <th>#</th><th>Nom</th><th>🔴</th><th>🔵</th><th>⚫</th><th>🃏 Cartes</th><th>Rôle</th><th>Objectif</th><th>Pouvoir ?</th><th>Révélé ?</th><th>Pactes</th><th>🗑️</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index} style={{ borderTop: '1px solid #4b5563' }}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td><input type="number" value={player.red} onChange={(e) => updatePlayer(index, 'red', parseInt(e.target.value))} style={{ width: '3rem', color: 'black' }} /></td>
                <td><input type="number" value={player.blue} onChange={(e) => updatePlayer(index, 'blue', parseInt(e.target.value))} style={{ width: '3rem', color: 'black' }} /></td>
                <td><input type="number" value={player.black} onChange={(e) => updatePlayer(index, 'black', parseInt(e.target.value))} style={{ width: '3rem', color: 'black' }} /></td>
                <td><input type="number" value={player.cards} onChange={(e) => updatePlayer(index, 'cards', parseInt(e.target.value))} style={{ width: '3rem', color: 'black' }} /></td>
                <td><input type="text" value={player.role} onChange={(e) => updatePlayer(index, 'role', e.target.value)} style={{ width: '7rem', color: 'black' }} /></td>
                <td><input type="text" value={player.objective} onChange={(e) => updatePlayer(index, 'objective', e.target.value)} style={{ width: '7rem', color: 'black' }} /></td>
                <td><input type="checkbox" checked={player.powerUsed} onChange={(e) => updatePlayer(index, 'powerUsed', e.target.checked)} /></td>
                <td><input type="checkbox" checked={player.revealed} onChange={(e) => updatePlayer(index, 'revealed', e.target.checked)} /></td>
                <td><input type="text" value={player.pactes} onChange={(e) => updatePlayer(index, 'pactes', e.target.value)} style={{ width: '10rem', color: 'black' }} /></td>
                <td><button onClick={() => removePlayer(index)} style={{ color: '#f87171' }}>✖</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
