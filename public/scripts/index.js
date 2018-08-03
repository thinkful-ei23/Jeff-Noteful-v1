/* global $ noteful api store */
'use strict';

$(document).ready(function () {
  noteful.bindEventListeners();

  // api.search({}, response => {
  //   store.notes = response;
  //   noteful.render();
  // });

  api.search({})
    .then(function(response){
      store.notes = response;
      noteful.render();
    });
});