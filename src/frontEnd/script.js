const botonAgregarTransaccion = document.getElementById("agregarTransaccion");
const datosDia = document.getElementById("datosDia");

let transaccion = {
    concepto: "",
    importe: 0
};

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
}

botonAgregarTransaccion.addEventListener("click", agregarTransaccion)
