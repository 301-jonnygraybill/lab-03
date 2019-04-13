'use strict';

// function Horns(horn) {
//   this.title = horn.title;
//   this.image_url = horn.image_url;
//   this.description = horn.description;
//   this.keyword = horn.keyword;
//   this.horns = horn.horns;
// }

let renderTime = 0;

// REVIEW: This is another way to use a constructor to duplicate an array of raw data objects

function Horns(rawDataObject) {

  // This will iterate over the object and assign the property name to the key variable
  for (let key in rawDataObject) {
    console.log('key', key);

    // when using a variable name to identify the property, we MUST use bracket [] notation.
    this[key] = rawDataObject[key];
  }
}

Horns.allHorns = [];

Horns.prototype.toHtml = function () {
  // 1. Get the template from the HTML document
  let $template = $('#horns-template').html();
  console.log('source', $template);
  // 2. Use Handlebars to "compile" the HTML
  let compiledTemplate = Handlebars.compile($template);
  // console.log('is this a function?', compiledTemplate)

  // 3. Do not forget to return the HTML from this method
  // and... put it in the DOM.
  // console.log(compiledTemplate(this));
  return compiledTemplate(this);
};

Horns.readJson = () => {
  $.get('./data/page-1.json', 'json')
    .then(data => {
      data.forEach(item => {
        Horns.allHorns.push(new Horns(item));
        $('#keyword-dropdown').append(`<option id="${item.keyword}">${item.keyword}</option>`)
      })
    })
    .then(Horns.loadHorns)
}

Horns.loadHorns = () => {
  Horns.allHorns.forEach(animal => animal.render())
}

// Horns.allHorns.forEach(item => {
//   item.push(new Horns(item));
// });
Horns.prototype.render = function () {
  // Horns.allHorns.forEach(pushingItem => {
    // console.log('Pushing item: ', pushingItem);
    // What do we need to do here to render each of the neighborhoods to the DOM?
    $('#photo-template').append(this.toHtml());
  // });
};

let filterHorns = () => {

  $('select.dropdown').on('change', () => {
    let selectedClass = $('select option:selected').val();
    if (selectedClass === 'default') {
      $('.horn-type:hidden').show();
    } else {
      $('.horn-type').toArray().forEach((val) => {
        val = $(val);
        if (!val.hasClass(selectedClass)) {
          val.hide();
        } else {
          val.show();
        }
      });
    }
  });
};

filterHorns();

// let createClass = function () {
//   Horns.allHorns.forEach(item => {
//     $(item).attr('class', this.keyword + this.title + ' horn-type ');
//   })
// }

// createClass();

$(() => Horns.readJson());
