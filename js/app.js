'use strict';

function Horns(rawDataObject) {
  for (let key in rawDataObject) {
    this[key] = rawDataObject[key];
  }
}

Horns.allHorns = [];
Horns.keywords = [];

Horns.prototype.toHtml = function () {
  let $template = $('#horns-template').html();
  let compiledTemplate = Handlebars.compile($template);
  return compiledTemplate(this);
};

Horns.readJson = ($value) => {
  $.get(`./data/${$value}.json`, 'json')
    .then(data => {
      data.forEach(item => {
        Horns.allHorns.push(new Horns(item));
      });
    })
    .then(populateKeywords)
    .then(sortKeywords)
    .then(Horns.loadHorns)
    .then(Horns.loadKeyword);
}

function populateKeywords() {
  Horns.allHorns.forEach(horn => {
    if (!Horns.keywords.includes(horn.keyword)) {
      Horns.keywords.push(horn.keyword)
    }
  })
}

function sortKeywords() {
  Horns.keywords.sort();
}

Horns.loadHorns = () => {
  Horns.allHorns.forEach(horn => {
    $('#horned-animals').append(horn.toHtml())
  });
};

$(() => Horns.readJson($value));
let $value = 'page-1';

Horns.loadKeyword = () => {
  Horns.keywords.forEach((keyword) => {
    $('#filter').append(`<option class="filter-remove" value="${keyword}">${keyword}</option>`);
  })
};

$('#filter').on('change', function () {
  let $selection = $(this).val();
  $('div').hide();
  $(`div[class="${$selection}"]`).show();
});

$('#click').on('change', function() {
  $('.filter-remove').remove();
  $('div').remove();
  let $value = $(this).val();
  Horns.allHorns = [];
  Horns.keywords = [];
  Horns.readJson($value);
});
