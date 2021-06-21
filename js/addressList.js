$(document).ready(() => {
    var token = localStorage.getItem('tokenSession');
    var items = $("#items");


    getAddress(token).then((response) => {

        if (response != null) {
            if (response.success) {
                var cont ="";
                response.address.forEach(element => {
                    cont +=adrs(element.id,element.name,element.phone,element.street);
                });
                items.html(cont);
            }
        }

        console.log(response);

    })





});


const adrs = (id, name, phone, street) => {

    return (`
    <div class="direcciones" style="display:flex; justifyContent:space-between; ">   
        <br>
        <ul class="lista-datos">
            <li><i class="fa fa-angle-right"></i>${name}</li>
            <li><i class="fa fa-angle-right"></i> Telefono: ${phone}</li>
        </ul>
        <ul class="lista-datos">
            <li><i class="icono fa fa-angle-right"></i>Calle : ${street}</li>
            <li><i class="icono fa fa-angle-right"></i>Año de vencimiento: ${street}</li>

        </ul>
        <br><br><br>


    </div>`);
}