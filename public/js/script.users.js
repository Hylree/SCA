    let urlAllUsers = "http://localhost:3000/api/users";
    //récuperation des données utilisateurs
    $.getJSON(urlAllUsers,{
        format: "json"
    })
    .done((data) => {
        $.each(data.users, (i, item) => {
            
                $('<tr>').attr("id", item._id).attr("href", "#modal1").attr("class", "modal-trigger").appendTo("#table_users");
    
                $('#table_users tr:last')
                    .append('<td>'+ item.civilite +'</td>' +
                    '<td>'+ item.last_name +'</td>' +
                    '<td>'+ item.first_name +'</td>' +
                    '<td>'+ item.username +'</td>' +
                    '<td>'+ item.tel +'</td>' +
                    '<td>'+ item.code +'</td>' +
                    '<td>'+ item.city +'</td>'+
                    '<td>'+ item.profil +'</td>');
        });
    });

$(document).ready(() => {

    /** Boite modal */
    $('.modal').modal();

    /** Contruction de la boite modal */
    $('.modal-trigger').click((event) => {

        let urlUser = "http://localhost:3000/API/users/" + event.currentTarget.id;
        console.log(urlUser);
        $.getJSON(urlUser,{
            format: "json"
        })
        .done((data) => {
           /* 
           <div class="input-field col s12">
            <input disabled value="I am not editable" id="disabled" type="text" class="validate">
            <label for="disabled">Disabled</label>
          </div>
          */

          /** Contruction du modal de l'user */
            $('#user-swipe-infos')
                .html("<div class='row'>" +
                    "<div class='input-field col m2 s12'>" +
                    "<input value='" + data.user.civilite + "' id='disabled' type='text' class='validate'>" +
                        "</div>" +
                    "<div class='col m5'>"+
                        "<span>" +
                            data.user.last_name +
                        "</span>" +
                    "</div>" +
                    "<div class='col m5'>"+
                        "<span>" +
                        data.user.first_name +
                        "</span>" +
                    "</div>" +
                "</div>");
    
            console.log(data.user._id);
        });
    });
    
    
});

/**
 * 
 */




