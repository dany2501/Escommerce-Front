$(document).ready(()=>{

    var token = localStorage.getItem('tokenSession');
    var container = $("#payments");
    var card = "";
    getList(token).then((response)=>{
        console.log(response);

        if (response != null ){
            if(response.success){
                console.log(response);
                response.payment.forEach(element => {
                    card +=payment(element.id,element.name,element.digits,element.month,element.year);
                    
                });
                container.html(card);
            }
        }
    });

});


const getList = (token)=>{
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
    });
}

const payment = (id,name,card,month,year)=>{

    return (`
    <div class="direcciones">

        <h3 class="titulo">Tarjeta</h3>
        <br>
        <ul class="lista-datos">
            <li><i class="fa fa-angle-right"></i> Titular: ${name}</li>
            <li><i class="fa fa-angle-right"></i> Número de tarjeta: XXXX-XXXX-XXXX-${card}</li>



        </ul>
        <ul class="lista-datos">
            <li><i class="icono fa fa-angle-right"></i>Mes de vencimiento: ${month}</li>
            <li><i class="icono fa fa-angle-right"></i>Año de vencimiento: ${year}</li>

        </ul>
        <br><br><br>


        <a class="dir" id="selectdir" id=see-${id}> Seleccionar</a>


    </div>`);
}