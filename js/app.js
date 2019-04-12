'use strict';

function Horns(horn) {
  this.title = horn.title;
  this.image_url = horn.image_url;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}

Horns.allHorns = [];


Horns.prototype.render = function () {
  $('main').append('<div class="clone"></div>');
  let hornClone = $('div[class="clone"]');

  let hornHtml = $('#photo-template').html();

  hornClone.html(hornHtml);

  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src', this.image_url);
  hornClone.find('p').text(this.description);
  hornClone.find('h3').text(this.keyword);
  hornClone.find('h4').text(this.horns);
  hornClone.removeClass('clone');
  hornClone.attr('class', this.keyword + this.title + ' horn-type ');
}

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
  Horns.allHorns.forEach(horn => horn.render())
}

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

$(() => Horns.readJson());
