/**On initialise une fonction vide */
let initialFunction = () => {};


$(document).ready(() => {
    
initialFunction = () => {
    
/** Boite modal */
$('.modal').modal(); //On initialise la boite modal
$('select').material_select(); //On initialise les selects
$('.collapsible').collapsible();

chargeModal(); //On charge les boites modals
   
};

 
/** Detecte un changement les filtres pour les utilisateurs */
filter();

initialFunction();
});


$('#filter_nclient').click(() => {
    if($('#filter_nclient').is(':checked')){
        
    }
});

$('#trigger-button-conducteur').click({
    getOtherConducteur();
});

let getOtherConducteur = () => {

    $('<tr>').attr("id", item._id).attr("href", "#modal1").attr("class", "modal-trigger").appendTo("#conducteur-data");

    $('#table_users div:last')
        .append(

        );
    initialFunction();
}