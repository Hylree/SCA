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
        console.log('name');
        $("#filter_nclient").prop('checked', false);   //forcé la checkbox a false
        getUsers("last_name", -1);
        chargeModal();

    }else{
        getUsers();
    }
});
    
$('#filter_nclient').click(() => {
    if($('#filter_nclient').is(':checked')){
        console.log('num');
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
function getUsers(nameFilter, sensFilter){

    $('#table_users').empty();
    /**On vide le tableau avent l'operation */
    if(nameFilter && sensFilter){        
        let urlAllUsers = "http://localhost:3000/api/users/getUserFilter/" + nameFilter + "/" + sensFilter;
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
            //forcé la checkbox a false
            $('#edition_mode_value').prop('checked', false);
    
    
            $('#edition_mode_value').click(function() {
    
                if ($('#edition_mode_value').is(':checked')){
    
                    //initisation des select
                    $(this).ready(function() {
                        $('select').material_select();
                    });
    
                    //Mode édition activé
                    $('#user-swipe-infos')
                        .html(
                            "<form action='/API/users/updateOneUser/"+ event.currentTarget.id +"' method='post'>" +
                                "<div class='row'>" +
                                
                                    "<div class='input-field col m2 s12'>" +
                                        "<input value='"+ data.user.numero_client +"' id='numero_client' name='numero_client' type='text' class='validate'>" +
                                        "<label class='active' for'numero_client'>N° client:</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col m2 s12'>" +
                                        "<input value='"+ data.user.civilite +"' id='civilite' name='civilite' type='text' class='validate'>" +
                                        "<label class='active' for'civilite'>Civilité:</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col m4 s12'>" +
                                        "<input value='"+ data.user.last_name +"' id='last_name' name='last_name' type='text' class='validate'>" +
                                        "<label class='active' for'last_name'>Nom de famille:</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col m4 s12'>" +
                                        "<input value='"+ data.user.first_name +"' id='first_name'  name='first_name' type='text' class='validate'>" +
                                        "<label class='active' for'first_name'>Prénom:</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col m6 s12'>" +
                                        "<input value='"+ dateNaissance +"' id='bday' name='bday' type='text' class='validate'>" +
                                        "<label class='active' for'bday'>Date de naissance:</label>" +
                                    "</div>" +
                                    
                                    "<div class='input-field col m6 s12'>" +
                                        "<input value='"+ data.user.tel +"' id='tel' name='tel' type='text' class='validate'>" +
                                        "<label class='active' for'tel'>Téléphone:</label>" +
                                    "</div>" +
                                    
                                    "<div class='input-field col m6 s12'>" +
                                        "<input value='"+ data.user.username +"' id='username' name='username' type='text' class='validate'>" +
                                        "<label class='active' for'username'>Email:</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col m6 s12'>" +
                                        "<input value='"+ data.user.profil +"' id='profil' name='profil' type='text' class='validate'>" +
                                        "<label class='active' for'profil'>Profil:</label>" +
                                    "</div>" +    
    
                                    "<div class='input-field col m3 s12'>" +
                                        "<input value='"+ data.user.num_street +"' id='num_street' name='num_street' type='text' class='validate'>" +
                                        "<label class='active' for'num_street'>N° Rue:</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col m9 s12'>" +
                                        "<input value='"+ data.user.name_street +"' id='name_street' name='name_street' type='text' class='validate'>" +
                                        "<label class='active' for'name_street'>Nom de rue:</label>" +
                                    "</div>" +
                                    
                                    "<div class='input-field col m12 s12'>" +
                                        "<input value='"+ data.user.more_street +"' id='more_street' name='more_street' type='text' class='validate'>" +
                                        "<label class='active' for'more_street'>Nom de rue:</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col m6 s12'>" +
                                        "<input value='"+ data.user.code +"' id='code' name='code' type='text' class='validate'>" +
                                        "<label class='active' for'code'>CP:</label>" +
                                    "</div>" +
                                    
                                    "<div class='input-field col m6 s12'>" +
                                        "<input value='"+ data.user.city +"' id='city' name='city' type='text' class='validate'>" +
                                        "<label class='active' for'city'>Ville:</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col m6 s12'>" +
                                        "<select name='tenant_type' id='tenant_type'>" +
                                            "<option value='" + data.user.tenant_type + "' selected>" + data.user.tenant_type + "</option>" +
                                            "<option value='Location'>Location</option>" +
                                            "<option value='Propriétaire'>Propriétaire</option>" +
                                            "<option value='Autres'>Autres</option>" +
                                        "</select>" +
                                            "<label>Qualité de l'occupant de l'habitaion principale</label>" +
                                    "</div>" +
    
    
                                    "<div class='input-field col s12 m6 l6'>" +
                                        "<select name='home_type' id='home_type'>" +
                                            "<option value='" + data.user.home_type + "'  selected>" + data.user.home_type + "</option>" +
                                            "<option value='Appartement'>Appartement</option>" +
                                            "<option value='Maison'>Maison</option>" +
                                            "<option value='Autres'>Autres</option>" +
                                        "</select>" +
                                            "<label>Type de logement de votre habitation principale</label>" +
                                    "</div>" +
    
                                    "<div class='input-field col s12 m6 l6'>" +
                                        "<select name='situation_fam' id='situation_fam'>" +
                                            "<option value='" + data.user.situation_fam +"'  selected>" + data.user.situation_fam +"</option>" +
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
                                            '<option value="' + data.user.situation_pro + '" selected>' + data.user.situation_pro + '</option>' +
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
                }else{
                    //Mode édition désactivé
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
                                                "<td>Qualité de l'occupant:</td>" +
                                                "<td>" + data.user.tenant_type + "</td>" +
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
    };
