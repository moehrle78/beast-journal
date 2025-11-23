// ---- Gewicht speichern ----
function saveWeight() {
    const value = document.getElementById("weight-input").value;
    if (!value) return;

    const data = JSON.parse(localStorage.getItem("weights") || "[]");
    data.push({ date: new Date().toLocaleDateString(), value });
    localStorage.setItem("weights", JSON.stringify(data));
    document.getElementById("weight-input").value = "";
    renderWeights();
}

function renderWeights() {
    const data = JSON.parse(localStorage.getItem("weights") || "[]");
    const list = document.getElementById("weight-list");
    list.innerHTML = "";
    data.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.date}: ${entry.value} kg`;
        list.appendChild(li);
    });
}

// ---- Maße speichern ----
function saveMeasurements() {
    const waist = document.getElementById("waist-input").value;
    const hip = document.getElementById("hip-input").value;

    if (!waist || !hip) return;

    const data = JSON.parse(localStorage.getItem("measurements") || "[]");
    data.push({
        date: new Date().toLocaleDateString(),
        waist,
        hip
    });

    localStorage.setItem("measurements", JSON.stringify(data));
    document.getElementById("waist-input").value = "";
    document.getElementById("hip-input").value = "";
    renderMeasurements();
}

function renderMeasurements() {
    const data = JSON.parse(localStorage.getItem("measurements") || "[]");
    const list = document.getElementById("measure-list");
    list.innerHTML = "";
    data.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.date}: Taille ${entry.waist} cm, Hüfte ${entry.hip} cm`;
        list.appendChild(li);
    });
}

// ---- Blutdruck speichern ----
function saveBloodPressure() {
    const sys = document.getElementById("sys-input").value;
    const dia = document.getElementById("dia-input").value;

    if (!sys || !dia) return;

    const data = JSON.parse(localStorage.getItem("bloodpressure") || "[]");
    data.push({
        date: new Date().toLocaleDateString(),
        sys,
        dia
    });

    localStorage.setItem("bloodpressure", JSON.stringify(data));
    document.getElementById("sys-input").value = "";
    document.getElementById("dia-input").value = "";
    renderBloodPressure();
}

function renderBloodPressure() {
    const data = JSON.parse(localStorage.getItem("bloodpressure") || "[]");
    const list = document.getElementById("bp-list");
    list.innerHTML = "";
    data.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.date}: ${entry.sys}/${entry.dia} mmHg`;
        list.appendChild(li);
    });
}

// ---- Beim Laden alles anzeigen ----
renderWeights();
renderMeasurements();
renderBloodPressure();
