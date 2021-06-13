$(document).ready(() => {
    var poa = $("#changePayment");
    var flag = false;

    $("#titlePOA").css({"display":"none"})
    
    poa.click(()=>{

        if(flag){
            flag=false;
            $("#payment_detail").css({"display":"block"})
            $("#titlePOA").css({"display":"none"})
            poa.text("Pago contra entrega")
            $("#addPayment").css({"display":"block"})
        }else{
            flag=true;
            $("#payment_detail").css({"display":"none"})
            $("#titlePOA").css({"display":"block"})
            $("#addPayment").css({"display":"none"})
            poa.text("Pago con tarjeta")
        }
        
    })

});