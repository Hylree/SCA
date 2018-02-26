    let urlAllUsers = "http://localhost:3000/api/users";
    //récuperation des données utilisateurs
    $.getJSON(urlAllUsers,{
        format: "json"
    })
    .done((data) => {
        $.each(data.users, (i, item) => {
            
                $('<tr>').attr("id", item._id).attr("href", "#modal1").attr("class", "modal-trigger").appendTo("#table_users");
    
                $('#table_users tr:last')
                    .append(
                        '<td>'+ item.numero_client +'</td>' +
                        '<td>'+ item.civilite +'</td>' +
                        '<td>'+ item.last_name +'</td>' +
                        '<td>'+ item.first_name +'</td>' +
                        '<td>'+ item.username +'</td>' +
                        '<td>'+ item.tel +'</td>' +
                        '<td>'+ item.code +'</td>' +
                        '<td>'+ item.city +'</td>'+
                        '<td>'+ item.profil +'</td>'
                    );
        });
    });

$(document).ready(() => {

    /** Boite modal */
    $('.modal').modal();

    /** Contruction de la boite modal */
    $('.modal-trigger').click((event) => {

        let urlUser = "http://localhost:3000/API/users/" + event.currentTarget.id;
        $.getJSON(urlUser,{
            format: "json"
        })
        .done((data) => {

            $('#edition_mode_value').click(function() {
                var checkbox = $(this).prev();
                if ($('#edition_mode_value').is(':checked')){
                    $('#user-swipe-infos')
                        .html(
                        "<div class='row'>" +
                        
                            "<div class='input-field col m2 s12'>" +
                                "<input value='"+ data.user.numero_client +"' id='first_name2' type='text' class='validate'>" +
                                "<label class='active' for'first_name2'>N° client:</label>" +
                            "</div>" +

                            "<div class='input-field col m2 s12'>" +
                                "<input value='"+ data.user.civilite +"' id='first_name2' type='text' class='validate'>" +
                                "<label class='active' for'first_name2'>Civilité:</label>" +
                            "</div>" +

                            "<div class='input-field col m4 s12'>" +
                                "<input value='"+ data.user.last_name +"' id='first_name2' type='text' class='validate'>" +
                                "<label class='active' for'first_name2'>Nom de famille:</label>" +
                            "</div>" +

                            "<div class='input-field col m4 s12'>" +
                                "<input value='"+ data.user.first_name +"' id='first_name2' type='text' class='validate'>" +
                                "<label class='active' for'first_name2'>Prénom:</label>" +
                            "</div>" +

                            "<div class='input-field col m6 s12'>" +
                                "<input value='"+ dateNaissance +"' id='first_name2' type='text' class='validate'>" +
                                "<label class='active' for'first_name2'>Date de naissance:</label>" +
                            "</div>" +
                            
                            "<div class='input-field col m6 s12'>" +
                                "<input value='"+ data.user.tel +"' id='first_name2' type='text' class='validate'>" +
                                "<label class='active' for'first_name2'>Téléphone:</label>" +
                            "</div>" +
                            
                            "<div class='input-field col m6 s12'>" +
                                "<input value='"+ data.user.username +"' id='first_name2' type='text' class='validate'>" +
                                "<label class='active' for'first_name2'>Email:</label>" +
                            "</div>" +

                            "<div class='input-field col m6 s12'>" +
                                "<input value='"+ data.user.profil +"' id='first_name2' type='text' class='validate'>" +
                                "<label class='active' for'first_name2'>Profil:</label>" +
                            "</div>" +                            
                            "<div class='input-field col m3 s12'>" +
                                "<input value='"+ data.user.num_street +"' id='first_name2' type='text' class='validate'>" +
                                "<label class='active' for'first_name2'>N° Rue:</label>" +
                            "</div>" +

                            "<div class='input-field col m9 s12'>" +
                                "<input value='"+ data.user.name_street +"' id='first_name2' type='text' class='validate'>" +
                                "<label class='active' for'first_name2'>Nom de rue:</label>" +
                            "</div>" +
                            "<div class='input-field col m12 s12'>" +
                                "<input value='"+ data.user.more_street +"' id='first_name2' type='text' class='validate'>" +
                                "<label class='active' for'first_name2'>Nom de rue:</label>" +
                            "</div>" +
                            "<div class='input-field col m6 s12'>" +
                                "<input value='"+ data.user.code +"' id='first_name2' type='text' class='validate'>" +
                                "<label class='active' for'first_name2'>CP:</label>" +
                            "</div>" +
                            
                            "<div class='input-field col m6 s12'>" +
                                "<input value='"+ data.user.city +"' id='first_name2' type='text' class='validate'>" +
                                "<label class='active' for'first_name2'>Ville:</label>" +
                            "</div>" +

                        "</div>"
                    );
                }else{
                    $.getJSON(urlUser,{
                        format: "json"
                    }) .done((data) => {
                        $('#user-swipe-infos')
                            .html(  "<div class='row'>" +
                                    "<table class='bordered'>" +
                                        "<tbody>" +
                                            "<tr>" +
                                                "<td>Civilité:</td>" +
                                                "<td>" + data.user.civilite + "</td>" +
                                            "</tr>" +
                                            "<tr>" +
                                                "<td>Nom de famille:</td>" +
                                                "<td>" + data.user.last_name + "</td>" +
                                            "</tr>" +
                                            "<tr>" +
                                                "<td>Prénom:</td>" +
                                                "<td>" + data.user.first_name + "</td>" +
                                            "</tr>" +

                                            "<tr>" +
                                                "<td>Date de naissance:</td>" +
                                                "<td>" +  dateNaissance + "</td>" +
                                            "</tr>" +
                                            
                                            "<tr>" +
                                                "<td>Email:</td>" +
                                                "<td>" + data.user.username + "</td>" +
                                            "</tr>" +
                                            
                                            "<tr>" +
                                                "<td>Téléphone:</td>" +
                                                "<td>" + data.user.tel + "</td>" +
                                            "</tr>" +
                                            
                                            "<tr>" +
                                                "<td>Profil:</td>" +
                                                "<td>" + data.user.profil + "</td>" +
                                            "</tr>" +
                                            
                                            "<tr>" +
                                                "<td>Adresse:</td>" +
                                                "<td>" + data.user.num_street + " " + data.user.name_street + "</td>" +
                                            "</tr>" +
                                            
                                            "<tr>" +
                                                "<td>Complément d'adresse:</td>" +
                                                "<td>" + data.user.more_street + "</td>" +
                                            "</tr>" +
                                            
                                            "<tr>" +
                                                "<td>Ville:</td>" +
                                                "<td>" + data.user.code + " - " + data.user.city +"</td>" +
                                            "</tr>" +
                                            
                                            "<tr>" +
                                                "<td>Type de logement:</td>" +
                                                "<td>" + data.user.home_type + "</td>" +
                                            "</tr>" +
                                            
                                            "<tr>" +
                                                "<td>Situation Familiale:</td>" +
                                                "<td>" + data.user.situation_fam + "</td>" +
                                            "</tr>" +

                                            "<tr>" +
                                                "<td>Situation Professionnel:</td>" +
                                                "<td>" + data.user.situation_pro + "</td>" +
                                            "</tr>" +

                                        "</tbody>" +
                                    "</table>"+
                                "</div>");
    
            
                    console.log(data.user._id);
        
                    });
                }
            });

            let dateNaissance = new Date(data.user.date_naissance).toLocaleDateString();
          /** Contruction du modal de l'user */
                $('#user-swipe-infos')
                .html(  "<div class='row'>" +
                        "<table class='bordered'>" +
                            "<tbody>" +
                                "<tr>" +
                                    "<td>Civilité:</td>" +
                                    "<td>" + data.user.civilite + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>Nom de famille:</td>" +
                                    "<td>" + data.user.last_name + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>Prénom:</td>" +
                                    "<td>" + data.user.first_name + "</td>" +
                                "</tr>" +

                                "<tr>" +
                                    "<td>Date de naissance:</td>" +
                                    "<td>" +  dateNaissance + "</td>" +
                                "</tr>" +
                                
                                "<tr>" +
                                    "<td>Email:</td>" +
                                    "<td>" + data.user.username + "</td>" +
                                "</tr>" +
                                
                                "<tr>" +
                                    "<td>Téléphone:</td>" +
                                    "<td>" + data.user.tel + "</td>" +
                                "</tr>" +
                                
                                "<tr>" +
                                    "<td>Profil:</td>" +
                                    "<td>" + data.user.profil + "</td>" +
                                "</tr>" +
                                
                                "<tr>" +
                                    "<td>Adresse:</td>" +
                                    "<td>" + data.user.num_street + " " + data.user.name_street + "</td>" +
                                "</tr>" +
                                
                                "<tr>" +
                                    "<td>Complément d'adresse:</td>" +
                                    "<td>" + data.user.more_street + "</td>" +
                                "</tr>" +
                                
                                "<tr>" +
                                    "<td>Ville:</td>" +
                                    "<td>" + data.user.code + " - " + data.user.city +"</td>" +
                                "</tr>" +
                                
                                "<tr>" +
                                    "<td>Type de logement:</td>" +
                                    "<td>" + data.user.home_type + "</td>" +
                                "</tr>" +
                                
                                "<tr>" +
                                    "<td>Situation Familiale:</td>" +
                                    "<td>" + data.user.situation_fam + "</td>" +
                                "</tr>" +

                                "<tr>" +
                                    "<td>Situation Professionnel:</td>" +
                                    "<td>" + data.user.situation_pro + "</td>" +
                                "</tr>" +

                            "</tbody>" +
                        "</table>"+
                    "</div>");
    
            
                    console.log(data.user._id);
        
                });
    });
    
    
});

/**
 * 
 */




