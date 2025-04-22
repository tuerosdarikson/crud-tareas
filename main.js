const apiUrl = "http://localhost:5000/tareas"; // cambiar esto según tu backend

document.getElementById("tarea-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descripcion = document.getElementById("descripcion").value;

  const nuevaTarea = { titulo, descripcion };

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevaTarea),
  });

  if (res.ok) {
    document.getElementById("tarea-form").reset();
    cargarTareas();
  }
});

async function cargarTareas() {
  const res = await fetch(apiUrl);
  const tareas = await res.json();

  const lista = document.getElementById("lista-tareas");
  lista.innerHTML = "";

  tareas.forEach(t => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
      <span>${t.titulo} - ${t.descripcion}</span>
      <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${t.id})">Eliminar</button>
    `;
    lista.appendChild(li);
  });
}

async function eliminarTarea(id) {
  const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  if (res.ok) cargarTareas();
}

cargarTareas();
