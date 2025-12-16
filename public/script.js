let currentCity = '';

document.addEventListener('DOMContentLoaded', () => {
  loadAllNotes();
  
  document.getElementById('notesSection').classList.remove('show');
  document.getElementById('weatherResult').classList.remove('show');
  
  document.getElementById('showNotesBtn').addEventListener('click', () => {
    const notesModal = document.getElementById('savedNotesModal');
    notesModal.classList.toggle('show');
    loadAllNotes();
  });
  
  window.addEventListener('click', (e) => {
    const modal = document.getElementById('savedNotesModal');
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });
  
  document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('savedNotesModal').classList.remove('show');
  });
});

document.getElementById('weatherForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = document.getElementById('cityInput').value.trim();
  
  if (!city) return;
  
  document.getElementById('notesSection').classList.remove('show');
  document.getElementById('weatherResult').classList.remove('show');
  currentCity = '';
  
  try {
    const res = await fetch(`/weather?city=${encodeURIComponent(city)}`);
    const data = await res.json();
    
    if (res.ok) {
      currentCity = data.city;
      document.getElementById('weatherResult').innerHTML = `
        <h2>Weather in ${data.city}</h2>
        <p><strong>Temperature:</strong> ${data.temperature}°C</p>
        <p><strong>Wind Speed:</strong> ${data.windspeed} km/h</p>
      `;
      document.getElementById('weatherResult').classList.add('show');
      document.getElementById('cityName').textContent = data.city;
      document.getElementById('notesSection').classList.add('show');
    } else {
      document.getElementById('weatherResult').innerHTML = `
        <p class="error-message">Error: ${data.error}</p>
      `;
      document.getElementById('weatherResult').classList.add('show');
    }
  } catch (err) {
    document.getElementById('weatherResult').innerHTML = `
      <p class="error-message">Error fetching weather data</p>
    `;
    document.getElementById('weatherResult').classList.add('show');
  }
});

document.getElementById('noteForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const note = document.getElementById('noteText').value.trim();
  
  if (!note || !currentCity) {
    alert('Please search for a valid city first!');
    return;
  }
  
  try {
    const res = await fetch('/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `city=${encodeURIComponent(currentCity)}&note=${encodeURIComponent(note)}`
    });
    
    if (res.ok) {
      document.getElementById('noteText').value = '';
      loadAllNotes();
      alert('Note saved successfully!');
    }
  } catch (err) {
    alert('Error saving note');
  }
});

async function loadAllNotes() {
  try {
    const res = await fetch('/notes');
    const notes = await res.json();
    
    const container = document.getElementById('notesContainer');
    if (notes.length === 0) {
      container.innerHTML = '<p>No notes saved yet.</p>';
      return;
    }
    
    container.innerHTML = notes.map(note => {
      return `
        <div class="note-item">
          <strong>${note.city}</strong><br>
          ${note.note}
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error('Error loading notes:', err);
  }
}