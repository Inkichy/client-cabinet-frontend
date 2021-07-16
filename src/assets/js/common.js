$(document).ready(function () {

  window.maskInit = function () {
    if ($('.field-data').length > 0) {
      $(".field-data").mask("99.99.9999");
    }
    if ($('.field-seria').length > 0) {
      $(".field-seria").mask("99 99");
    }
    if ($('.field-numer').length > 0) {
      $(".field-numer").mask("99 99 99");
    }
    if ($('.field-code').length > 0) {
      $(".field-code").mask("999 - 999");
    }
    if ($('.field-snils').length > 0) {
      $(".field-snils").mask("999 - 999 - 999 - 99");
    }
    if ($('.field-inn').length > 0) {
      $(".field-inn").mask("999999999");
    }
    if ($('.field-phone').length > 0) {
      $(".field-phone").mask("+7 999 999 99 99");
    }
    if ($('.field-number').length > 0) {
      $(".field-number").mask("9 9 9 9 9 9");
    }
  }

  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $('.scroll-top').addClass('active');
    } else {
      $('.scroll-top').removeClass('active');
    }
  });
  $(document).on('click', '.scroll-top a', function () {
    $("html, body").animate({
      scrollTop: 0
    }, 300);
    return false;
  });


  $(window).scroll(function () {
    if ($('.user_fixed').get(0)) {
      if ($(window).width() > 1100) {
        if ($(this).scrollTop() > 75) {
          var wrapperContent = $('.content').innerWidth();
          var wrapperWidth = $('.wrapper').innerWidth();
          //alert(wrapperContent);
          $('.user_fixed').addClass('active').width(wrapperContent / 100 * wrapperWidth);
          $('.top-panel').first().css('padding-top', '105px');
        } else {
          $('.user_fixed').removeClass('active').width('auto');
          $('.top-panel').first().css('padding-top', '0px');
        }
      }
    }
  });


  $('body').on('click touchstart', '.add-document--js', function (e) {
    e.preventDefault();

    var html = '<div class="fields__row flex">';
    html = html + '<div class="fields__col">';
    html = html + '<label class="fields__label">';
    html = html + '<div class="fields__name">Страна</div>';
    html = html + '<input type="text" class="field">';
    html = html + '</label>';
    html = html + '</div>';
    html = html + '<div class="fields__col">';
    html = html + '<label class="fields__label">';
    html = html + '<div class="fields__name">ИНН / Аналог</div>';
    html = html + '<input type="text" class="field">';
    html = html + '</label>';
    html = html + '</div>';
    html = html + ' <span class="fields__row-delete fields__row-delete--js" title="Удалить строку"><img src="images/main/delete-icon.png" alt=""></span>';
    html = html + '</div>';

    $(this).parent().before(html);
  });

  $('body').on('click touchstart', '.fields__row-delete--js', function () {
    $(this).parent().remove();
  });

  $(document).on('touchstart', '.settings__title_mobile--js', function () {
    var title = $(this).next();
    $('.settings__title_mobile--js').not(title).addClass('settings__items_hide');
    title.toggleClass('settings__items_hide');
    $('html, body').animate({
      scrollTop: title.offset().top - 200
    }, 500);
  });
});
