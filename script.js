// ---- Gewicht speichern ----
function saveWeight() {
    const value = document.getElementById('weight-input').value;
    if (!value) return;
    const data = JSON.parse(localStorage.getItem('weights') || '[]');
    data.push({ date: new Date().toLocaleDateString(), value });
    localStorage.setItem('weights', JSON.stringify(data));
    document.getElementById('weight-input').value = '';
    renderWeights();
    renderWeightChart();
}

function renderWeights() {
    const data = JSON.parse(localStorage.getItem('weights') || '[]');
    const list = document.getElementById('weight-list');
    list.innerHTML = '';
    data.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.date}: ${entry.value} kg`;
        list.appendChild(li);
    });
}

// ---- Maße speichern ----
function saveMeasurements() {
    const waist = document.getElementById('waist-input').value;
    const hip = document.getElementById('hip-input').value;
    if (!waist || !hip) return;
    const data = JSON.parse(localStorage.getItem('measurements') || '[]');
    data.push({ date: new Date().toLocaleDateString(), waist, hip });
    localStorage.setItem('measurements', JSON.stringify(data));
    document.getElementById('waist-input').value = '';
    document.getElementById('hip-input').value = '';
    renderMeasurements();
    renderMeasureChart();
}

function renderMeasurements() {
    const data = JSON.parse(localStorage.getItem('measurements') || '[]');
    const list = document.getElementById('measure-list');
    list.innerHTML = '';
    data.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.date}: Taille ${entry.waist} cm, Hüfte ${entry.hip} cm`;
        list.appendChild(li);
    });
}

// ---- Blutdruck speichern ----
function saveBloodPressure() {
    const sys = document.getElementById('sys-input').value;
    const dia = document.getElementById('dia-input').value;
    if (!sys || !dia) return;
    const data = JSON.parse(localStorage.getItem('bloodpressure') || '[]');
    data.push({ date: new Date().toLocaleDateString(), sys, dia });
    localStorage.setItem('bloodpressure', JSON.stringify(data));
    document.getElementById('sys-input').value = '';
    document.getElementById('dia-input').value = '';
    renderBloodPressure();
    renderBPChart();
}

function renderBloodPressure() {
    const data = JSON.parse(localStorage.getItem('bloodpressure') || '[]');
    const list = document.getElementById('bp-list');
    list.innerHTML = '';
    data.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.date}: ${entry.sys}/${entry.dia} mmHg`;
        list.appendChild(li);
    });
}

// ---- Charts ----
let weightChart, measureChart, bpChart;

function renderWeightChart() {
    const data = JSON.parse(localStorage.getItem('weights') || '[]');
    const labels = data.map(e => e.date);
    const values = data.map(e => parseFloat(e.value));
    if (weightChart) weightChart.destroy();
    const ctx = document.getElementById('weightChart').getContext('2d');
    weightChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Gewicht (kg)',
                data: values,
                borderColor: '#007aff',
                backgroundColor: 'rgba(0,122,255,0.2)',
                tension: 0.3,
                fill: true
            }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: false } } }
    });
}

function renderMeasureChart() {
    const data = JSON.parse(localStorage.getItem('measurements') || '[]');
    const labels = data.map(e => e.date);
    const waistValues = data.map(e => parseFloat(e.waist));
    const hipValues = data.map(e => parseFloat(e.hip));
    if (measureChart) measureChart.destroy();
    const ctx = document.getElementById('measureChart').getContext('2d');
    measureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Taille (cm)',
                    data: waistValues,
                    borderColor: '#ff6384',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Hüfte (cm)',
                    data: hipValues,
                    borderColor: '#36a2eb',
                    backgroundColor: 'rgba(54,162,235,0.2)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: { responsive: true, scales: { y: { beginAtZero: false } } }
    });
}

function renderBPChart() {
    const data = JSON.parse(localStorage.getItem('bloodpressure') || '[]');
    const labels = data.map(e => e.date);
    const sysValues = data.map(e => parseFloat(e.sys));
    const diaValues = data.map(e => parseFloat(e.dia));
    if (bpChart) bpChart.destroy();
    const ctx = document.getElementById('bpChart').getContext('2d');
    bpChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Systolisch',
                    data: sysValues,
                    borderColor: '#ff9f40',
                    backgroundColor: 'rgba(255,159,64,0.2)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Diastolisch',
                    data: diaValues,
                    borderColor: '#4bc0c0',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: { responsive: true, scales: { y: { beginAtZero: false } } }
    });
}

// ---- Beim Laden alles anzeigen ----
renderWeights();
renderMeasurements();
renderBloodPressure();
renderWeightChart();
renderMeasureChart();
renderBPChart();
