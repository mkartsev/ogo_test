import '../scss/app.scss';

import $ from 'jquery';
window.jQuery = window.$ = $;

import 'magnific-popup';

$.extend(true, $.magnificPopup.defaults, {
  mainClass: 'mfp-with-anim mfp-zoom-in',
  tClose: 'Закрыть',
  tLoading: 'Загрузка...',
  removalDelay: 300,
  gallery: {
    tPrev: 'Назад',
    tNext: 'Вперед',
    tCounter: '%curr% из %total%'
  },
  image: {
    Error: 'Невозможно загрузить <a href="%url%">изображение</a>'
  },
  ajax: {
    tError: 'Невозможно загрузить <a href="%url%">содержимое</a>',
  },
  callbacks: {
    open: function () {
      $('[data-close]').on('click', function (event) {
        event.preventDefault();
        $.magnificPopup.close();
      });
    }
  }
});

$(document).ready(function(){
  $(function() {
    $('form').on('submit', function(e) {
      var $form = $(this);
      $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize()
      }).done(function() {
        $form.html('<p>Спасибо за вопрос!</p>');
        console.log('form send success');

      }).fail(function() {
        $form.html('<p>Что-то пошло не так!</p>');
        console.log('form send fail');
      });
      //отмена действия по умолчанию для кнопки submit
      e.preventDefault(); 
    });
  });
  
  $('.section__toggler').on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('is-active');
    var target = $('#' + $(this).data('target'));

    if ( $(target).hasClass('expanded') ) {
      target.slideDown('fast').toggleClass('expanded');
    } else {
      target.slideUp('fast').toggleClass('expanded');
    }
  });

  $('.inline-popup').magnificPopup({
    type: 'inline',
    focus: '[autofocus]',
    callbacks: {
      //open: function() {
      //  
      //}
    }
  });
})
