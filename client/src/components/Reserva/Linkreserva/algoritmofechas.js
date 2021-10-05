function fechas(obj){
const fecha1 = obj.Checkin;
const fecha2 = obj.Checkout;
const dia1 =fecha1.slice(0,2);
const dia2 =fecha2.slice(0,2);
const mesyaño= fecha1.slice(2)
const cantidaddediasintermedios = parseFloat(dia2) - parseFloat(dia1)
if(cantidaddediasintermedios === 2){
    let dia3 = parseFloat(dia1) + 1
    let fechaintermedia =""+ dia3 + mesyaño
    const fecha=[fecha1,fechaintermedia,fecha2]
    return fecha
}
}


const reserva = {
    Checkin:"10/10/2021",
    Checkout:"12/10/2021"
}