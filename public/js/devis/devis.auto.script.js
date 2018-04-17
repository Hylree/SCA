/**On initialise une fonction vide */
let initialFunction = () => {};

const idSoucripteur = $('.conducteur_for_me').parent().attr('id');
let urlGetConducteurMe = "http://localhost:3000/API/users/" + idSoucripteur;

$(document).ready(() => {

    initialFunction = () => {

    /** Formulaire incription devis auto */
    let data = {
        conducteurs : []
    };

    $('.button-collapse').sideNav();
    $('select').material_select(); //On initialise les selects
    $('.collapsible').collapsible();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 120, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: false // Close upon selecting a date,
    });

    $('#conduite_accompagne_principal').click(() => {
        if($('#conduite_accompagne_principal').is(':checked')){
            
            $('#conducteur_0 .permis_item').attr('disabled', '');
        }else{
            
            $('#conducteur_0 .permis_item').removeAttr('disabled');
        }
    });

    $('.conduite_accompagne').click((event) => {
        var id = event.target.id;
        if($('#conducteur_autre_' + id + ' .conduite_accompagne').is(':checked')){
        
            console.log('check')
            $('#conducteur_autre_' + id +' .permis_item').attr('disabled', '');
        }else{
            
            console.log('check not')
            $('#conducteur_autre_' + id +' .permis_item').removeAttr('disabled');
        }

    });

    $('.type_infraction').on('change',(event) => {

        var id = event.target.id;
        id($("select#infraction_0").val()){
            
        }
    });

    $('.close-conducteur-item').click((event) => {
        var id = event.target.parentElement.id;
        $("#conducteur_autre_" + id + "" ).remove();
        initialFunction();
    });



    /** On calcul le nombre d'élément pour préparer la constuction de l'objet conducteur */
    var numItemsConducteurs = $('.conducteur-item').length;
    var numItemsInputsConducteur = $('.conducteur-item_input').length;
    var numberOfItemInput = numItemsInputsConducteur / numItemsConducteurs;

    console.log(numberOfItemInput);
    console.log(numItemsConducteurs);
    console.log(numItemsInputsConducteur);

    var conducteurs = [];
    var conducteur = {};
    var countNumberOfItemInput = numberOfItemInput;
    $(".conducteur-item .conducteur-item_input").each((i, item) => {
        var name = $(item).attr('name');
        var value = $(item).val();

        if(name != null){
            conducteur[name] = value;
        }

        if(i == countNumberOfItemInput - 1 ){
            countNumberOfItemInput = countNumberOfItemInput + numberOfItemInput;
            conducteurs.push(conducteur);
            conducteur = {};
            
            console.log(conducteurs);
            if(i == numItemsInputsConducteur - 1){
                $.extend(data.conducteurs, conducteurs);
            }
        }
    });
    console.log(data);

    $(".souscripteur-item :input").each((i, item) => {
        var value = $(item).val();
        var name = $(item).attr('name');
        data[name] = value;
        
    });

    $('form').submit((event) => {

    });

};

initialFunction();

});

$('form#devis-auto').change(() => {
    initialFunction();
});

$('.conducteur_me').click(() => {
    if($('.conducteur_me').is(':checked')){
        $('.conducteur_for_me').empty();
    }else{       
        $.getJSON(urlGetConducteurMe,{
            format: "json"
        })
        .done((data) => {
            $.each(data.user, (i, item) => {

                $('.conducteur_for_me').html(
                    
                    '<div class="conducteur-item">' +
                        '<div class="switch-zone">' +
                            '<div class="switch valign-wrapper">'+
                                '<label>' +
                            
                                    '<input id="0" name="conducteur_principal" class="me conducteur-item_input" type="checkbox">' +
                                    '<span class="lever"></span>' +
                                    'Conducteur principal' +
                                '</label>' +
                            '</div>' +
                        '</div>' +
                    '<div class="row">' +
                    
                        '<div class="input-field col m2 s12">' +
                            '<input disabled value="' + item.civilite +'" name="civilite_conducteur"  type="text" class="conducteur-item_input">' +
                            '<label for="disabled">Civilité</label>' +
                        '</div>' +
                
                        '<div class="input-field col m5 s12">' +
                            '<input disabled value="' + item.last_name +'" name="last_name_conducteur"  type="text" class="conducteur-item_input">' +
                            '<label for="disabled">Nom</label>' +
                        '</div>' +
                
                        '<div class="input-field col m5 s12">' +
                            '<input disabled value="' + item.first_name +'" name="first_name_conducteur" type="text" class="conducteur-item_input">' +
                            '<label for="disabled">Prénom</label>' +
                        '</div>' +
                
                        '<div class="input-field col m12 s12">' +
                            '<input disabled placeholder="' + item.date_naissance +'" name="bday_conducteur" type="text" class="datepicker conducteur-item_input">' +
                            '<label for="date_naissance">Date de naissance</label>' +
                        '</div>' +
                
                        '<div class="input-field col s12 m6 l6">' +
                            '<select disabled name="situation_pro" id="situation_pro" class="conducteur-item_input">' +
                                '<option value="' + item.situation_pro +'" selected>' + item.situation_pro +'</option>' +
                                '<option value="Artisan">Artisan</option>' +
                                '<option value="Exploitant agricole">Exploitant agricole</option>' +
                                '<option value="Profession libérale">Profession libérale</option>' +
                                '<option value="Chef d\'entreprise">Chef d\'entreprise</option>' +
                                '<option value="Salarié">Salarié</option>' +
                                '<option value="Fonctionnaire">Fonctionnaire</option>' +
                                '<option value="Sans profession">Sans profession</option>' +
                                '<option value="Retraité">Retraité</option>' +
                                '<option value="Recherche d\'emploi">Recherche d\'emploi</option>' +
                                '<option value="Ecclasiastique">Ecclasiastique</option>' +
                        '</select>' +
                                '<label>Situation Profésionnelle</label>' +
                        '</div>' +
                
                        '<div class="input-field col s12 m6 l6">' +
                            '<select disabled name="situation_fam" id="situation_fam" class="conducteur-item_input">' +
                                '<option value="' + item.situation_fam +'" selected>' + item.situation_fam +'</option>' +
                                '<option value="Célibataire">Célibataire</option>' +
                                '<option value="Concubinage">Concubinage</option>' +
                                '<option value="Marié">Marié</option>' +
                                '<option value="Séparer">Séparer</option>' +
                                '<option value="Divorcé">Divorcé</option>' +
                                '<option value="Veuf">Veuf</option>' +
                                '<option value="Pacs">Pacs</option>' +
                            '</select>' +
                                '<label>Situation familiale</label>' +
                        "</div>" +
                
            
                        '<div class="switch valign-wrapper col m12 s12">' +
                            '<label>' +
                        
                                '<input  name="conduite_accompagne" id="conduite_accompagne_principal" class="conducteur-item_input" type="checkbox">' +
                                '<span class="lever"></span>' +
                                'Conduite accompagné' +
                            '</label>' +
                        '</div>' +
                        '<div class="input-field col m12 s12">' +
                            '<input name="date_obtention" type="text" class="datepicker permis_item conducteur-item_input">' +
                            '<label for="date_obtention">Date d\'obtention du permis</label>' +
                        '</div>' +
            
                        '<div class="input-field col m12 s12">' +
                            '<input name="bday_permis" type="text" class="datepicker permis_item conducteur-item_input">' +  
                            '<label for="date_permis">Nouvelle de permis si annulation</label>' +
                        '</div>' +
                        '<div class="input-field col s12 m4 l4">' +
                            '<select name="lieu_obtention" id="lieu_obtention" class="permis_item conducteur-item_input">' +
                                '<option value="France" selected>France</option>' +
                                '<option value="EEE">EEE</option>' +
                                '<option value="Hors EEE">Hors EEE</option>' +
                            '</select>' +
                                '<label>Lieu d\'obtention du permis</label>' +
                        '</div>' +
                    '</div>' +
                '</div>');

            });
            
        initialFunction();
        });

        
    }
});



$('.me').click((event) => {
    var id = event.target.id;
    if($('.me').is(':checked')){
        $('#conducteur_autre_' + id +' .permis_item').removeAttr('disabled');
    }else{
        
        $('#conducteur_autre_' + id +' .permis_item').attr('disabled', '');
    }
});

/** Ajout conducteur */
let nbrConducteur = 0;
$('#trigger-button-conducteur').click(() => {
    getOtherConducteur();
    initialFunction();
    nbrConducteur += 1;
});



/** On rajoute des conducteurs */
let getOtherConducteur = () => {
    $('<div>').attr("class", "conducteur-item").attr("id", "conducteur_autre_" + nbrConducteur + "").appendTo("#list_autres_conducteurs");

    $('#list_autres_conducteurs div:last')
        .append(
            '<div id="' + nbrConducteur + '" class="close-conducteur-item"><i class="small material-icons">close</i></div>' +
            '<div class="row">' +

                '<div class="switch-zone">' +
                    '<div class="switch valign-wrapper">' +
                        '<label>' +
                    
                            '<input id="'+ nbrConducteur +'" name="conducteur_principal" class="me conducteur-item_input" type="checkbox">' +
                            '<span class="lever"></span>' +
                            'Conducteur principal' +
                        '</label>' +
                    '</div>' +
                '</div>' +
                '<div class="input-field col m2 s12">' +
                    '<input value="" name="civilite_conducteur"  type="text" class="conducteur-item_input">' +
                    '<label for="disabled">Civilité</label>' +
                '</div>' +

                '<div class="input-field col m5 s12">' +
                    '<input value="" name="last_name_conducteur"  type="text" class="conducteur-item_input">' +
                    '<label for="disabled">Nom</label>' +
                '</div>' +

                '<div class="input-field col m5 s12">' +
                    '<input value="" name="first_name_conducteur" type="text" class="conducteur-item_input">' +
                    '<label for="disabled">Prénom</label>' +
                '</div>' +

                '<div class="input-field col m12 s12">' +
                    '<input name="bday_conducteur" type="text" class="datepicker conducteur-item_input">' +
                    '<label for="date_naissance">Date de naissance</label>' +
                '</div>' +

                '<div class="input-field col s12 m6 l6">' +
                    '<select name="situation_pro" id="situation_pro" class="conducteur-item_input">' +
                        '<option value="Artisan" selected >Artisan</option>' +
                        '<option value="Profession libérale">Profession libérale</option>' +
                        '<option value="Chef d\'entreprise">Chef d\'entreprise</option>' +
                        '<option value="Salarié">Salarié</option>' +
                        '<option value="Fonctionnaire">Fonctionnaire</option>' +
                        '<option value="Sans profession">Sans profession</option>' +
                        '<option value="Retraité">Retraité</option>' +
                        '<option value="Recherche d\'emploi">Recherche d\'emploi</option>' +
                        '<option value="Ecclasiastique">Ecclasiastique</option>' +
                    '</select>' +
                        '<label>Situation Profésionnelle</label>' +
                '</div>' +

                '<div class="input-field col s12 m6 l6">' +
                    '<select name="situation_fam" id="situation_fam" class="conducteur-item_input">' +
                        '<option value="Célibataire" selected>Célibataire</option>' +
                        '<option value="Concubinage">Concubinage</option>' +
                        '<option value="Marié">Marié</option>' +
                        '<option value="Séparer">Séparer</option>' +
                        '<option value="Divorcé">Divorcé</option>' +
                        '<option value="Veuf">Veuf</option>' +
                        '<option value="Pacs">Pacs</option>' +
                    '</select>' +
                        '<label>Situation familiale</label>' +
                '</div>' +


                    '<div class="switch valign-wrapper col m12 s12">' +
                        '<label>' +
                    
                            '<input id="'+ nbrConducteur +'" name="conduite_accompagne" class="conduite_accompagne conducteur-item_input" type="checkbox">' +
                            '<span class="lever"></span>' +
                            'Conduite accompagné' +
                        '</label>' +
                    '</div>' +
                    '<div class="input-field col m12 s12">' +
                        '<input name="date_obtention" type="text" class="datepicker permis_item conducteur-item_input">' +
                        '<label for="date_obtention">Date d\'obtention du permis</label>'+
                    '</div>' +

                    '<div class="input-field col m12 s12">' +
                        '<input name="bday_permis" type="text" class="datepicker permis_item conducteur-item_input">'+
                        '<label for="date_permis">Nouvelle de permis si annulation</label>'+
                    '</div>' +
                    '<div class="input-field col s12 m4 l4">' +
                        '<select name="lieu_obtention" id="lieu_obtention" class="permis_item conducteur-item_input">' +
                            '<option value="France" selected>France</option>' +
                            '<option value="EEE">EEE</option>' +
                            '<option value="Hors EEE">Hors EEE</option>' +
                        '</select>' +
                            '<label>Lieu d\'obtention du permis</label>' +
                    '</div>' +
            '</div>');
}