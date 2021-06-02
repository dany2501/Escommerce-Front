$(document).ready(() => {

    var add = $("#addAddress")
    var token = localStorage.getItem('tokenSession');
    getAddress(token).then((response) => {
        if (response.success) {
            console.log(response.address)
            var address = response.address
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
        address(name + " " + lastName, street, extNum, city, suburb, zipCode, phone, token).then((response) => {

            if (response.success) {
                $("#title").text("Confirmación")
                $("#msg").text("La dirección de envío ha sido agregado correctamente")
            } else {
                $("#title").text("Lo sentimos :( ")
                $("#msg").text("No se pudo guardar la dirección de envío. Intenta más tarde")
            }

        })
    });


});

const address = (name, street, extNum, city, suburb, zipCode, phone, token) => {

    return $.ajax({
        method: "POST",
        url: 'http://localhost:5001/address',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', 'token': token },
        data: {
            name: name,
            street: street,
            extNum: extNum,
            city: city,
            suburb: suburb,
            zipCode: zipCode,
            phone: phone
        },
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

