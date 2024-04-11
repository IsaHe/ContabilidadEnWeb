const botonVerDatos = document.getElementById("verDatos");
const tablaDatos = document.getElementById("tablaDatos");
const fechaInicio = document.getElementById("fechaInicio");
const fechaFin = document.getElementById("fechaFin");
const tienda = document.getElementById("tienda");

botonVerDatos.addEventListener("click", () => {
    const inicio = fechaInicio.value;
    const fin = fechaFin.value;
    const tiendaId = tienda.value;
    const total = document.getElementById("Total");
    let importeTotal = 0;

    fetch(`http://localhost:3000/transacciones?inicio=${inicio}&fin=${fin}&tiendaId=${tiendaId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(dia => {
                const row = document.createElement("tr");
                const fechaCell = document.createElement("td");
                fechaCell.textContent = dia.fecha;
                const conceptoCell = document.createElement("td");
                conceptoCell.textContent = dia.concepto;
                const importeCell = document.createElement("td");
                importeCell.textContent = dia.valor;
                importeTotal += parseFloat(dia.valor);
                row.appendChild(fechaCell);
                row.appendChild(conceptoCell);
                row.appendChild(importeCell);
                tablaDatos.appendChild(row);
            });
            total.textContent = "Total: " + importeTotal;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});