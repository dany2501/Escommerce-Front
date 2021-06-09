$(document).ready(() => {

    var button = $("#button");
    var token = "fc4b878f-9cd6-4a8d-b2e4-44c95b0d0e28";
    var n1 = $("#n1");
    var n2 = $("#n2");
    var n3 = $("#n3");
    var n4 = $("#n4");
    var n5 = $("#n5");
    var n6 = $("#n6");

    button.click(()=>{
        one = n1.val();
        two = n2.val();
        three = n3.val();
        four = n4.val();
        five = n5.val();
        six = n6.val();

        if (one != null && two != null && three != null && four != null && five != null && six != null){
            code = one+""+two+""+three+""+four+""+five+""+six;
            sendCode(token,code).then((response)=>{

                n1.val("");
                n2.val("");
                n3.val("");
                n4.val("");
                n5.val("");
                n6.val("");
                if(response.success){
                    alert("Email validado.")
                }else{
                    n1.focus();
                    alert(response.error.message);
                }

            })
        }

    });


});


const sendCode = (token, code) => {

    return $.ajax({
        method: "POST",
        url: 'http://localhost:5001/email',
        dataType: 'json',
        headers: { 'Access-Control-Allow-Origin': '*', "token": token },
        data: { code: code },
        accepts: 'application/json',
        success: (data, status) => {
            return data;
        }
    })

}