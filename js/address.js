$(document).ready(() => {

    var add = $("#addAddress")
    var token = localStorage.getItem('tokenSession');
    var shipping = $("#changeShipping");

    var flag = false;

    $("#addressId").css({ "display": "none" })
    $("#titleShipping").css({ "display": "none" })
    getAddress(token).then((response) => {
        if (response != null) {

            if (response.success) {
                var address = response.address
                console.log(address);
                localStorage.setItem('addressId', address.id)
                $("#addressId").val(address.id);
                $("#name").val(address.name);
                $("#lastName").val(address.lastName);
                $("#street").val(address.street);
                $("#extNum").val(address.extNum);
                $("#city").val(address.city);
                $("#suburb").val(address.suburb);
                $("#zipCode").val(address.zipCode);
                $("#phone").val(address.phone);
                add.text("Modificar")
            }
        }
    });

    shipping.click(() => {
        if (!flag) {
            flag = true;
            $("#addressId").val(0);
            $("#address-container").css({ "display": "none" });
            $("#titleShipping").css({ "display": "block" });
            shipping.text("Dirección de envío")
        } else {
            flag = false;
            $("#address-container").css({ "display": "block" });
            $("#titleShipping").css({ "display": "none" });

            shipping.text("Entrega en Escom")
        }

    });
    add.click(() => {
        var name = $("#name").val();
        var lastName = $("#lastName").val();
        var street = $("#street").val();
        var extNum = $("#extNum").val();
        var city = $("#city").val();
        var suburb = $("#suburb").val();
        var zipCode = $("#zipCode").val();
        var phone = $("#phone").val();
        var notes = $("#notes").val();
        if (name != "" && lastName != "" && street != "" && extNum != "" && city != "" && suburb != "" && zipCode != "" && phone != "") {

            address(name + " " + lastName, street, extNum, city, suburb, zipCode, phone, token).then((response) => {
                $('#agregart').modal('show');
                if (response != null) {

                    if (response.success) {
                        $("#title").text("Confirmación")
                        $("#msg").text("La dirección de envío ha sido agregado correctamente");
                        add.text("Modificar")
                        window.location.reload()
                    } else {

                        if(response.error.code == 1002){
                            $("#zipCode").val("");
                            $("#zipCode").focus();
        
                        }
                        $("#title").text("Lo sentimos :( ")
                        $("#msg").text(response.error.message);
                    }

                } else {
                    $("#title").text("Lo sentimos :( ")
                    $("#msg").text("No se pudo guardar la dirección de envío. Intenta más tarde")
                }

            })
        } else {
            alert("Ingresa los datos correspondientes")
        }
    });


});

const address = (name, street, extNum, city, suburb, zipCode, phone, token) => {

    return $.ajax({
        method: "POST",
        url: 'http://localhost:5001/address',
        contentType: 'application/json',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        data: JSON.stringify({
            "name": name,
            "street": street,
            "extNum": extNum,
            "city": city,
            "suburb": suburb,
            "zipCode": zipCode,
            "phone": phone
        }),
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    });

}

const getAddress = (token) => {
    return $.ajax({
        method: "GET",
        url: 'http://localhost:5001/address',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    });
}

