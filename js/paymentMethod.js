$(document).ready(() => {
    var tarjeta = $("#pago1");
    var poa = $("#pago2");
    var flag = false;
    poa.click(()=>{
        if(flag){
            flag=false;
            $("#poa").prop('checked', false);
        }else{
            flag=true;
        }
        
    })

});