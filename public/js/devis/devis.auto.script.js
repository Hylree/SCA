/**On initialise une fonction vide */
let initialFunction = () => {};


$(document).ready(() => {

   

initialFunction = () => {
    
/** Boite modal */
$('select').material_select(); //On initialise les selects
$('.collapsible').collapsible();

/** Formulaire incription devis auto */
let data = {};
$(".conducteur-item :input").each(() => {
    var inputtest = $(this); // This is the jquery object of the input, do what you will

    console.log(inputtest);


});
$("#conducteur-item0 :input").each(() => {
    var inputtest = $(this); // This is the jquery object of the input, do what you will

    console.log(inputtest);


});

$("form#devis-auto :input").each(() => {
    var inputs = $(this); // This is the jquery object of the input, do what you will
    let conducteurs = [];


});

$('form').submit((event) => {
let conducteurs = [];
  console.log(event);  


});


};



initialFunction();
});


$('#filter_nclient').click(() => {
    if($('#filter_nclient').is(':checked')){
        
    }
});

$('#trigger-button-conducteur').click(() => {
    getOtherConducteur();
});

let getOtherConducteur = () => {

    $('<tr>').attr("id", item._id).attr("href", "#modal1").attr("class", "modal-trigger").appendTo("#conducteur-data");

    $('#table_users div:last')
        .append('');
    initialFunction();
}