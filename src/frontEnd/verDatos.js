const botonVerDatos = document.getElementById("verDatos");
const tablaDatos = document.getElementById("tablaDatos");
const fechaInicio = document.getElementById("fechaInicio");
const fechaFin = document.getElementById("fechaFin");
const tienda = document.getElementById("tienda");
const botonVerDatosDias = document.getElementById("verDatosDias");

function createHeaders(headers) {
    const headerRow = document.getElementById("headers");
    // Remove existing headers
    while (headerRow.firstChild) {
        headerRow.removeChild(headerRow.firstChild);
    }
    // Add new headers
    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });
}

botonVerDatos.addEventListener("click", () => {
    const inicio = fechaInicio.value;
    const fin = fechaFin.value;
    const tiendaId = tienda.value;
    const total = document.getElementById("Total");
    let importeTotal = 0;

    fetch(`http://localhost:3000/transacciones?inicio=${inicio}&fin=${fin}&tiendaId=${tiendaId}`)
        .then(response => response.json())
        .then(data => {
            tablaDatos.innerHTML = "<tr id=\"headers\"></tr>";
            createHeaders(["Fecha", "Concepto", "Importe"]);
            
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

botonVerDatosDias.addEventListener("click", () => {
    const inicio = fechaInicio.value;
    const fin = fechaFin.value;
    const tiendaId = tienda.value;

    fetch(`http://localhost:3000/dias?inicio=${inicio}&fin=${fin}&tiendaId=${tiendaId}`)
        .then(response => response.json())
        .then(data => {
            tablaDatos.innerHTML = "<tr id=\"headers\"></tr>";
            createHeaders(["Fecha", "Balance de transacciones"]);

            data.forEach(dia => {
                const row = document.createElement("tr");

                const fechaCell = document.createElement("td");
                fechaCell.textContent = dia.fecha;

                const balanceCell = document.createElement("td");
                balanceCell.textContent = dia.balance_transacciones;

                row.appendChild(fechaCell);
                row.appendChild(balanceCell);

                tablaDatos.appendChild(row);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});