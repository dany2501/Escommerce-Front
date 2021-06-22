$(document).ready(() => {
    var poa = $("#changePayment");
    var flag = false;
    var addPayment = $("#addPayment");
    var token = localStorage.getItem('tokenSession');
    var hasChanges = false;
    var cardHolder = $("#cardHolder");
    var cardNumber = $("#cardNumber");
    var month = $("#month");
    var year = $("#year");
    var cvv = $("#cvv");
    $("#paymentId").css({"display":"none"});

    $("#titlePOA").css({ "display": "none" });



    getPaymentMethod(token).then((response) => {
        if (response != null) {
            if (response.success && response.payment.length!=0) {
                
            }
        }

    });
    document.addEventListener('keypress', e => {
        hasChanges = true;
    })
    poa.click(() => {

        if (flag) {
            flag = false;
            $("#payment_detail").css({ "display": "block" })
            $("#titlePOA").css({ "display": "none" })
            poa.text("Pago contra entrega")
            addPayment.css({ "display": "block" })
        } else {
            flag = true;
            $("#payment_detail").css({ "display": "none" })
            $("#titlePOA").css({ "display": "block" })
            addPayment.css({ "display": "none" })
            $("#paymentId").val(0)
            poa.text("Pago con tarjeta")
        }

    })

    addPayment.click(() => {
        if (!flag) {
            cH = cardHolder.val();
            cN = cardNumber.val();
            m = month.val();
            y = year.val();
            ccv = cvv.val();

            if (cN.length != 16 && typeof (cN) != "int") {
                alert("Número de tarjeta inválido");
                cardNumber.val("");
                cardNumber.focus();
                return;
            }
            if (m > 12) {
                alert("Ingresa un mes de expiración válid");
                month.val("");
                month.focus();
                return;
            }
            if (y <= 21 && m <= 06) {
                alert("Tarjeta expirada");
                year.val("");
                month.val("");
                year.focus();
                cvv.val("");
                return;
            }


            if (cH != "" && cN != "" && m != "" && y != "" && ccv != "") {

                if (hasChanges) {
                    updatePaymentMethod(token, cH, cN, m, y, ccv).then((response) => {
                        if (response != null) {
                            if (response.success) {
                                alert("Método de pago agregado");
                                window.location.reload();
                            } else {
                                alert(response.error.message);
                            }
                        }
                    });
                } else {
                    savePaymentMethod(token, cH, cN, m, y, ccv).then((response) => {
                        if (response != null) {
                            if (response.success) {
                                alert("Método de pago agregado");
                                window.location.reload();
                            } else {
                                alert(response.error.message);
                            }
                        }
                    });
                }
                
            }
            else {
                alert("Ingresa datos válidos")
            }

        }
    });

});

const savePaymentMethod = (token, cardHolder, cardNumber, month, year, cvv) => {

    var payment = {
        "cardHolder": cardHolder,
        "cardNumber": cardNumber,
        "month": month,
        "year": year,
        "cvv": cvv
    }

    return $.ajax({
        method: "POST",
        url: 'http://localhost:5001/payment',
        dataType: 'json',
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        data: JSON.stringify({ "payment": payment }),
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    })

}


const getPaymentMethod = (token) => {

    return $.ajax({
        method: "GET",
        url: 'http://localhost:5001/payment',
        dataType: 'json',
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    })

}

const updatePaymentMethod = (token, cardHolder, cardNumber, month, year, cvv, id) => {

    var payment = {
        "id": id,
        "cardHolder": cardHolder,
        "cardNumber": cardNumber,
        "month": month,
        "year": year,
        "cvv": cvv
    }

    return $.ajax({
        method: "POST",
        url: 'http://localhost:5001/payment',
        dataType: 'json',
        contentType: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        data: JSON.stringify({ "payment": payment }),
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    })

}