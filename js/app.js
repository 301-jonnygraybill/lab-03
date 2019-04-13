'use strict';

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
  // Get the template from the HTML document
  let template = $('#horns-template').html();
  // Use Handlebars to "compile" the HTML
  let compiledTemplate = Handlebars.compile(template);

  // Do not forget to return the HTML from this method
  // and... put it in the DOM.
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

Horns.prototype.render = function () {
  $('#photo-template').append(this.toHtml());
};

$('select')
  .change(function () {
    var str = '';
    $('select option:selected').each(function() {
      console.log($(this).text());
      str += $(this).text() + '';
    });
    $('#event').text(str);
  })
  .change();
// let filterHorns = () => {

//   $('select.dropdown').on('change', () => {
//     let selectedClass = $('select option:selected').val();
//     if (selectedClass === 'default') {
//       $('.horn-type:hidden').show();
//     } else {
//       $('.horn-type').toArray().forEach((val) => {
//         val = $(val);
//         if (!val.hasClass(selectedClass)) {
//           val.hide();
//         } else {
//           val.show();
//         }
//       });
//     }
//   });
// };

// filterHorns();

$(() => Horns.readJson());
