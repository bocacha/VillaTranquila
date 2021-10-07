export default function fechas(obj){
const fecha1 = obj.Checkin;
const fecha2 = obj.Checkout;
const dia1 =fecha1.slice(0,2);
const dia2 =fecha2.slice(0,2);
const mes1= fecha1.slice(3,5)
const mes2= fecha2.slice(3,5)
const fecha=[]
const mesyaño1= fecha1.slice(2)
const mesyaño2= fecha2.slice(2)
if(mes1 - mes2 === 0){
    const diferencia= parseFloat(dia2) - parseFloat(dia1)
    
    fecha.push(fecha1)
    for(let i=1; i<diferencia ;i++){
        let dia3 = parseFloat(dia1) + i
        if(parseFloat(dia3)<10){
         let fechaintermedia ="0"+ dia3 + mesyaño1
         fecha.push(fechaintermedia)
        }else{
         let fechaintermedia =""+ dia3 + mesyaño1
         fecha.push(fechaintermedia)        
        }
    }
    fecha.push(fecha2)
    return fecha

}else{
   if(parseFloat(mes1) === 1|| parseFloat(mes1) === 3||parseFloat(mes1) === 5||parseFloat(mes1) === 7|| parseFloat(mes1) === 8||parseFloat(mes1) === 10||parseFloat(mes1) === 12 ){
       let diasdemes = 32 - parseFloat(dia1)
       fecha.push(fecha1)
       for(let i=1; i<diasdemes ;i++){
           let dia3 = parseFloat(dia1) + i
           if(parseFloat(dia3)<10){
            let fechaintermedia ="0"+ dia3 + mesyaño1
            fecha.push(fechaintermedia)
           }else{
            let fechaintermedia =""+ dia3 + mesyaño1
            fecha.push(fechaintermedia)        
           }
       }
        for(let j=parseFloat(dia2)-1; j>0 ;j--){
            let dia3 = parseFloat(dia2) - j
            if(parseFloat(dia3)<10){
                let fechaintermedia ="0"+ dia3 + mesyaño2
                fecha.push(fechaintermedia)
            }else{
                let fechaintermedia =""+ dia3 + mesyaño2
                fecha.push(fechaintermedia)        
            }
        }
        fecha.push(fecha2)
   };

   if(parseFloat(mes1) === 2 ){
    let diasdemes = 29 - parseFloat(dia1)
    fecha.push(fecha1)
    for(let i=1; i<diasdemes ;i++){
        let dia3 = parseFloat(dia1) + i
        if(parseFloat(dia3)<10){
            let fechaintermedia ="0"+ dia3 + mesyaño1
            fecha.push(fechaintermedia)
           }else{
            let fechaintermedia =""+ dia3 + mesyaño1
            fecha.push(fechaintermedia)        
           }
       }
     for(let j=parseFloat(dia2)-1; j>0 ;j--){
         let dia3 = parseFloat(dia2) - j
         if(parseFloat(dia3)<10){
            let fechaintermedia ="0"+ dia3 + mesyaño2
            fecha.push(fechaintermedia)
        }else{
            let fechaintermedia =""+ dia3 + mesyaño2
            fecha.push(fechaintermedia)        
        }
    }
     fecha.push(fecha2)
};

if(parseFloat(mes1) === 4||parseFloat(mes1) === 6||parseFloat(mes1) === 9||parseFloat(mes1) === 11){
   let diasdemes = 31 - parseFloat(dia1)
   fecha.push(fecha1)
   for(let i=1; i<diasdemes ;i++){
       let dia3 = parseFloat(dia1) + i
       if(parseFloat(dia3)<10){
        let fechaintermedia ="0"+ dia3 + mesyaño1
        fecha.push(fechaintermedia)
       }else{
        let fechaintermedia =""+ dia3 + mesyaño1
        fecha.push(fechaintermedia)        
       }
   }
    for(let j=parseFloat(dia2)-1; j>0 ; j--){
        let dia3 = parseFloat(dia2) - j
        if(parseFloat(dia3)<10){
            let fechaintermedia ="0"+ dia3 + mesyaño2
            fecha.push(fechaintermedia)
        }else{
            let fechaintermedia =""+ dia3 + mesyaño2
            fecha.push(fechaintermedia)        
        }
    }
    fecha.push(fecha2)
};
   return fecha
}
}
// const reserva1={
//     Checkin:"05/01/2021",
//     Checkout:"07/01/2021"
// }
// const reserva2={
//     Checkin:"10/02/2021",
//     Checkout:"25/03/2021"
// }
// const reserva3 = {
//     Checkin:"10/10/2021",
//     Checkout:"25/11/2021"
// }
// const reserva4 = {
//     Checkin:"10/05/2021",
//     Checkout:"05/06/2021"
// }
// const reserva6={
//     Checkin:"29/12/2021",
//     Checkout:"05/01/2022"
// }