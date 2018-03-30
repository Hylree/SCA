/**On initialise une fonction vide */
let initialFunction = () => {};


$(document).ready(() => {
    
initialFunction = () => {
    
/** Boite modal */
$('.modal').modal(); //On initialise la boite modal
$('select').material_select(); //On initialise les selects

chargeModal(); //On charge les boite modals
   
};

 
/**Detecte un changement les filtres pour les utilisateurs */
filter();

initialFunction();
});

getUsers();

let filter = () => {

$('#filter_alphabet_name').click(() => {
    if( $('#filter_alphabet_name').is(':checked') ) {
        $("#filter_nclient").prop('checked', false);   //forcé la checkbox a false
        getUsers("last_name");
        chargeModal();

    }else{
        getUsers();
    }
});
    
$('#filter_nclient').click(() => {
    if($('#filter_nclient').is(':checked')){

        $('#filter_alphabet_name').prop('checked', false);   //forcé la checkbox a false

        getUsers();
        chargeModal();
    }
});

};

/**
 * Afficher tous les utilisateurs
 * Par défault getUsers retourne les utilisateurs trié par numéro client
 */
function getUsers(nameFilter){

    $('#table_users').empty();
    /**On vide le tableau avent l'operation */
    if(nameFilter){        
        let urlAllUsers = "http://localhost:3000/api/users/getUserFilter/" + nameFilter;



        //récuperation des données utilisateurs
        $.getJSON(urlAllUsers,{
            format: "json"
        })
        .done((data) => {
            $.each(data.users, (i, item) => {
            
                /** On verifie si l'humain est un client */
            if(typeof item.client_id === 'undefined'){
                item.client_id = {
                    numero_client : ""
                };
            }

            /** On verifie si l'humain est un utilisateur */
            if(typeof item.user_id === 'undefined'){
                item.user_id = {
                    username : "",
                    profil : ""
                };
            }

            $('<tr>').attr("id", item._id).attr("href", "#modal1").attr("class", "modal-trigger").appendTo("#table_users");

            $('#table_users tr:last')
                .append(
                   '<td>'+ item.client_id.numero_client +'</td>' +
                    '<td>'+ item.civilite +'</td>' +
                    '<td>'+ item.last_name +'</td>' +
                    '<td>'+ item.first_name +'</td>' +
                    '<td>'+ item.user_id.username +'</td>' +
                    '<td>'+ item.tel +'</td>' +
                    '<td>'+ item.code +'</td>' +
                    '<td>'+ item.city +'</td>'+
                    '<td>'+ item.user_id.profil +'</td>'
                );
            });
            initialFunction();
        });
    }else{
        $('#filter_nclient').prop('checked', true);
        let urlAllUsers = "http://localhost:3000/api/users";
        //récuperation des données utilisateurs
        $.getJSON(urlAllUsers,{
            format: "json"
        })
        .done((data) => {
            $.each(data.users, (i, item) => {

            /** On verifie si l'humain est un client */
            if(typeof item.client_id === 'undefined'){
                item.client_id = {
                    numero_client : ""
                };
            }

            /** On verifie si l'humain est un utilisateur */
            if(typeof item.user_id === 'undefined'){
                item.user_id = {
                    username : "",
                    profil : ""
                };
            }

            $('<tr>').attr("id", item._id).attr("href", "#modal1").attr("class", "modal-trigger").appendTo("#table_users");

            $('#table_users tr:last')
                .append(
                    '<td>'+ item.client_id.numero_client +'</td>' +
                    '<td>'+ item.civilite +'</td>' +
                    '<td>'+ item.last_name +'</td>' +
                    '<td>'+ item.first_name +'</td>' +
                    '<td>'+ item.user_id.username +'</td>' +
                    '<td>'+ item.tel +'</td>' +
                    '<td>'+ item.code +'</td>' +
                    '<td>'+ item.city +'</td>'+
                    '<td>'+ item.user_id.profil +'</td>'
                );
            });
            initialFunction();
        });
    }
  
}


/**
 * Charger la boite modal pour l'affichage des utilisateurs
 */
let chargeModal = () => {
    /** Contruction de la boite modal */
    $('.modal-trigger').click((event) => {
    
        console.log(event);
        let urlUser = "http://localhost:3000/API/users/" + event.currentTarget.id;
        $.getJSON(urlUser,{
            format: "json"
        })
        .done((data) => {
            $.each(data.user, (i, item) => {
                                     
                /** On verifie si l'humain est un client */
                if(typeof item.client_id === 'undefined'){
                    item.client_id = {
                        numero_client : ""
                    };
                }

                /** On verifie si l'humain est un utilisateur */
                if(typeof item.user_id === 'undefined'){
                    item.user_id = {
                        username : "",
                        profil : ""
                    };
                }
            //forcé la checkbox a false
            $('#edition_mode_value').prop('checked', false);
    
    
            $('#edition_mode_value').click(function() {
    
                if ($('#edition_mode_value').is(':checked')){
    
                    //initisation des select
                    $(this).ready(function() {
                        $('select').material_select();
                    });
                        $.each(data.user, (i, item) => {
                                        
                            /** On verifie si l'humain est un client */
                            if(typeof item.client_id === 'undefined'){
                                item.client_id = {
                                    numero_client : ""
                                };
                            }

                            /** On verifie si l'humain est un utilisateur */
                            if(typeof item.user_id === 'undefined'){
                                item.user_id = {
                                    username : "",
                                    profil : ""
                                };
                            }
    
                    //Mode édition activé
                    $('#user-swipe-infos')
                        .html(
                            "<form action='/API/users/updateOneUser/"+ event.currentTarget.id +"' method='post'>" +
                                "<div class='row'>" +
                                
                                    "<div class='input-field col m2 s12'>" +
                                        "<input value='"+ item.client_id.numero_client +"' id='numero_client' name='numero_client' type='text' class='validate'>" +
                                        "<label class='active' for'numero_client'>N° client:</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col m2 s12'>" +
                                        "<input value='"+ item.civilite +"' id='civilite' name='civilite' type='text' class='validate'>" +
                                        "<label class='active' for'civilite'>Civilité:</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col m4 s12'>" +
                                        "<input value='"+ item.last_name +"' id='last_name' name='last_name' type='text' class='validate'>" +
                                        "<label class='active' for'last_name'>Nom de famille:</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col m4 s12'>" +
                                        "<input value='"+ item.first_name +"' id='first_name'  name='first_name' type='text' class='validate'>" +
                                        "<label class='active' for'first_name'>Prénom:</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col m6 s12'>" +
                                        "<input value='"+ dateNaissance +"' id='bday' name='bday' type='text' class='validate'>" +
                                        "<label class='active' for'bday'>Date de naissance:</label>" +
                                    "</div>" +
                                    
                                    "<div class='input-field col m6 s12'>" +
                                        "<input value='"+ item.tel +"' id='tel' name='tel' type='text' class='validate'>" +
                                        "<label class='active' for'tel'>Téléphone:</label>" +
                                    "</div>" +
                                    
                                    "<div class='input-field col m6 s12'>" +
                                        "<input value='"+ item.user_id.username +"' id='username' name='username' type='text' class='validate'>" +
                                        "<label class='active' for'username'>Email:</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col m6 s12'>" +
                                        "<input value='"+ item.user_id.profil +"' id='profil' name='profil' type='text' class='validate'>" +
                                        "<label class='active' for'profil'>Profil:</label>" +
                                    "</div>" +    
    
                                    "<div class='input-field col m3 s12'>" +
                                        "<input value='"+ item.num_street +"' id='num_street' name='num_street' type='text' class='validate'>" +
                                        "<label class='active' for'num_street'>N° Rue:</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col m9 s12'>" +
                                        "<input value='"+ item.name_street +"' id='name_street' name='name_street' type='text' class='validate'>" +
                                        "<label class='active' for'name_street'>Nom de rue:</label>" +
                                    "</div>" +
                                    
                                    "<div class='input-field col m12 s12'>" +
                                        "<input value='"+ item.more_street +"' id='more_street' name='more_street' type='text' class='validate'>" +
                                        "<label class='active' for'more_street'>Nom de rue:</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col m6 s12'>" +
                                        "<input value='"+ item.code +"' id='code' name='code' type='text' class='validate'>" +
                                        "<label class='active' for'code'>CP:</label>" +
                                    "</div>" +
                                    
                                    "<div class='input-field col m6 s12'>" +
                                        "<input value='"+ item.city +"' id='city' name='city' type='text' class='validate'>" +
                                        "<label class='active' for'city'>Ville:</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col m6 s12'>" +
                                        "<select name='tenant_type' id='tenant_type'>" +
                                            "<option value='" + item.tenant_type + "' selected>" + item.tenant_type + "</option>" +
                                            "<option value='Location'>Location</option>" +
                                            "<option value='Propriétaire'>Propriétaire</option>" +
                                            "<option value='Autres'>Autres</option>" +
                                        "</select>" +
                                            "<label>Qualité de l'occupant de l'habitaion principale</label>" +
                                    "</div>" +
    
    
                                    "<div class='input-field col s12 m6 l6'>" +
                                        "<select name='home_type' id='home_type'>" +
                                            "<option value='" + item.home_type + "'  selected>" + data.home_type + "</option>" +
                                            "<option value='Appartement'>Appartement</option>" +
                                            "<option value='Maison'>Maison</option>" +
                                            "<option value='Autres'>Autres</option>" +
                                        "</select>" +
                                            "<label>Type de logement de votre habitation principale</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col s12 m6 l6'>" +
                                        "<select name='situation_fam' id='situation_fam'>" +
                                            "<option value='" + item.situation_fam +"'  selected>" + item.situation_fam +"</option>" +
                                            "<option value='Célibataire'>Célibataire</option>" +
                                            "<option value='Concubinage'>Concubinage</option>" +
                                            "<option value='Marié'>Marié</option>" +
                                            "<option value='Séparer'>Séparer</option>" +
                                            "<option value='Divorcé'>Divorcé</option>" +
                                            "<option value='Veuf'>Veuf</option>" +
                                            "<option value='Pacs'>Pacs</option>" +
                                        "</select>" +
                                            "<label>Situation familiale</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col s12 m6 l6'>" +
                                        "<select name='situation_pro' id='situation_pro'>" +
                                            '<option value="' + item.situation_pro + '" selected>' + item.situation_pro + '</option>' +
                                            "<option value='Artisan'>Artisan</option>" +
                                            "<option value='Exploitant agricole'>Exploitant agricole</option>" +
                                            "<option value='Profession libérale'>Profession libérale</option>" +
                                            '<option value="Chef d\'entreprise">Chef d\'entreprise</option>' +
                                            "<option value='Salarié'>Salarié</option>" +
                                            "<option value='Fonctionnaire'>Fonctionnaire</option>" +
                                            "<option value='Sans profession'>Sans profession</option>" +
                                            "<option value='Retraité'>Retraité</option>" +
                                            "<option value='Recherche d'emploi'>Recherche d'emploi</option>" +
                                            "<option value='Ecclasiastique'>Ecclasiastique</option>" +
                                        "</select>" +
                                            "<label>Situation Profésionnelle</label>" +
                                    "</div>" +
                                    "<div class='padding_bottom'>" +
                                    "<button type='submit' class='btn' name='action'>Envoyer" +
                                        "<i class='material-icons right'>send</i>" +
                                    "</button>" +
                                    "</div>" +
                                "</div>" +
    
                            "</form>"
                        );
                    });
                }else{
                    //Mode édition désactivé
                    $.getJSON(urlUser,{
                        format: "json"
                    }) .done((data) => {
                        $.each(data.user, (i, item) => {
                                     
                        /** On verifie si l'humain est un client */
                        if(typeof item.client_id === 'undefined'){
                            item.client_id = {
                                numero_client : ""
                            };
                        }

                        /** On verifie si l'humain est un utilisateur */
                        if(typeof item.user_id === 'undefined'){
                            item.user_id = {
                                username : "",
                                profil : ""
                            };
                        }

                        $('#user-swipe-infos')
                        .html(  "<div class='row'>" +
                                "<table class='bordered'>" +
                                    "<tbody>" +
                                        "<tr>" +
                                            "<td>Numéro client:</td>" +
                                            "<td>" + item.client_id.numero_client + "</td>" +
                                        "</tr>" +
                                        "<tr>" +
                                            "<td>Civilité:</td>" +
                                            "<td>" + item.civilite + "</td>" +
                                        "</tr>" +
                                        "<tr>" +
                                            "<td>Nom de famille:</td>" +
                                            "<td>" + item.last_name + "</td>" +
                                        "</tr>" +
                                        "<tr>" +
                                            "<td>Prénom:</td>" +
                                            "<td>" + item.first_name + "</td>" +
                                        "</tr>" +

                                        "<tr>" +
                                            "<td>Date de naissance:</td>" +
                                            "<td>" +  dateNaissance + "</td>" +
                                        "</tr>" +
                                        
                                        "<tr>" +
                                            "<td>Email:</td>" +
                                            "<td>" + item.user_id.username + "</td>" +
                                        "</tr>" +
                                        
                                        "<tr>" +
                                            "<td>Téléphone:</td>" +
                                            "<td>" + item.tel + "</td>" +
                                        "</tr>" +
                                        
                                        "<tr>" +
                                            "<td>Profil:</td>" +
                                            "<td>" + item.user_id.profil + "</td>" +
                                        "</tr>" +
                                        
                                        "<tr>" +
                                            "<td>Adresse:</td>" +
                                            "<td>" + item.num_street + " " + item.name_street + "</td>" +
                                        "</tr>" +
                                        
                                        "<tr>" +
                                            "<td>Complément d'adresse:</td>" +
                                            "<td>" + item.more_street + "</td>" +
                                        "</tr>" +
                                        
                                        "<tr>" +
                                            "<td>Ville:</td>" +
                                            "<td>" + item.code + " - " + item.city +"</td>" +
                                        "</tr>" +

                                        "<tr>" +
                                            "<td>Type de logement:</td>" +
                                            "<td>" + item.home_type + "</td>" +
                                        "</tr>" +
                                        "<tr>" +
                                            "<td>Qualité de l'occupant:</td>" +
                                            "<td>" + item.tenant_type + "</td>" +
                                        "</tr>" +
                                        
                                        "<tr>" +
                                            "<td>Situation Familiale:</td>" +
                                            "<td>" + item.situation_fam + "</td>" +
                                        "</tr>" +
                                        
                                        "<tr>" +
                                            "<td>Situation Professionnel:</td>" +
                                            "<td>" + item.situation_pro + "</td>" +
                                        "</tr>" +

                                    "</tbody>" +
                                "</table>"+
                            "</div>");
                        });
                    });
                }
            });
    
            let dateNaissance = new Date(item.date_naissance).toLocaleDateString();
            
            /** Contruction du modal de l'user */
                $('#user-swipe-infos')
                .html(  "<div class='row'>" +
                        "<table class='bordered'>" +
                            "<tbody>" +
                                "<tr>" +
                                    "<td>Numéro client:</td>" +
                                    "<td>" + item.client_id.numero_client + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>Civilité:</td>" +
                                    "<td>" + item.civilite + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>Nom de famille:</td>" +
                                    "<td>" + item.last_name + "</td>" +
                                "</tr>" +
                                "<tr>" +
                                    "<td>Prénom:</td>" +
                                    "<td>" + item.first_name + "</td>" +
                                "</tr>" +
    
                                "<tr>" +
                                    "<td>Date de naissance:</td>" +
                                    "<td>" +  dateNaissance + "</td>" +
                                "</tr>" +
                                
                                "<tr>" +
                                    "<td>Email:</td>" +
                                    "<td>" + item.user_id.username + "</td>" +
                                "</tr>" +
                                
                                "<tr>" +
                                    "<td>Téléphone:</td>" +
                                    "<td>" + item.tel + "</td>" +
                                "</tr>" +
                                
                                "<tr>" +
                                    "<td>Profil:</td>" +
                                    "<td>" + item.user_id.profil + "</td>" +
                                "</tr>" +
                                
                                "<tr>" +
                                    "<td>Adresse:</td>" +
                                    "<td>" + item.num_street + " " + item.name_street + "</td>" +
                                "</tr>" +
                                
                                "<tr>" +
                                    "<td>Complément d'adresse:</td>" +
                                    "<td>" + item.more_street + "</td>" +
                                "</tr>" +
                                
                                "<tr>" +
                                    "<td>Ville:</td>" +
                                    "<td>" + item.code + " - " + item.city +"</td>" +
                                "</tr>" +
                                
                                "<tr>" +
                                    "<td>Type de logement:</td>" +
                                    "<td>" + item.home_type + "</td>" +
                                "</tr>" +
                                    
                                "<tr>" +
                                    "<td>Qualité de l'occupant:</td>" +
                                    "<td>" + item.tenant_type + "</td>" +
                                "</tr>" +
                                    
                                "<tr>" +
                                    "<td>Situation Familiale:</td>" +
                                    "<td>" + item.situation_fam + "</td>" +
                                "</tr>" +
    
                                "<tr>" +
                                    "<td>Situation Professionnel:</td>" +
                                    "<td>" + item.situation_pro + "</td>" +
                                "</tr>" +
    
                            "</tbody>" +
                        "</table>"+
                    "</div>");
    
    
                });
            });
        });
    };