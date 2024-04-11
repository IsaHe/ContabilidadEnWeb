const botonAgregarTransaccion = document.getElementById("agregarTransaccion");
const datosDia = document.getElementById("datosDia");
const botonGuardarDia = document.getElementById("guardarDia");
const tiendas = document.getElementById("tienda");
const fechaIn = document.getElementById("fecha");

const guardarDia = (fecha, balance_transacciones, tienda_id) => {
  fetch('http://localhost:3000/dias', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fecha, balance_transacciones, tienda_id }),
  })
  .then(response => response.json())
  .then(data => console.log(data.message))
  .catch((error) => {
    console.error('Error:', error);
  });
}

const guardarTransaccion = (id, concepto, importe, fecha, idTienda) => {
  fetch('http://localhost:3000/transacciones', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id,concepto, importe, fecha, idTienda}),
  })
  .then(response => response.json())
  .then(data => console.log(data.message))
  .catch((error) => {
    console.error('Error:', error);
  });
}

let transacciones = [];

const agregarTransaccion = () => {
    const concepto = document.createElement("input");
    concepto.type = "text";
    concepto.placeholder = "Concepto";
    const importe = document.createElement("input");
    importe.type = "number";
    importe.placeholder = "Importe";
    
    const br = document.createElement("br");
    
    datosDia.insertBefore(concepto, botonAgregarTransaccion);
    datosDia.insertBefore(importe, botonAgregarTransaccion);
    datosDia.insertBefore(br, botonAgregarTransaccion);
    
    let conceptoValor = {
        valor: importe,
        concepto: concepto,
        fecha: fechaIn,
        id: transacciones.length,
    }
    transacciones.push(conceptoValor);
}

botonAgregarTransaccion.addEventListener("click", agregarTransaccion)

botonGuardarDia.addEventListener("click", () => {
    const fecha = fechaIn.value;
    const tienda = tiendas.value;
    const balance_transacciones = 0;
    
    guardarDia(fecha, balance_transacciones, tienda);
    transacciones.forEach((transaccion) => {
        guardarTransaccion(transaccion.id ,transaccion.concepto.value, transaccion.valor.value, transaccion.fecha.value, tienda);
        console.log(transaccion.id ,transaccion.concepto.value, transaccion.valor.value, transaccion.fecha.value, tienda);
    });
});
    
