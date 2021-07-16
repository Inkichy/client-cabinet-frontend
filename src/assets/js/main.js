$(document).ready(function () {

  $('.invest-modal__button .btn, .invest-modal__bottom .btn').click(function (e) {
    e.preventDefault();
    $.fancybox.close();
  });

  // Accordion
  if ($(window).width() >= 1100) {
    $(function () {
      $('.pd__block_items .faq__accordion-items').trigger('click');
    });
  }

  function getOffset(el) {
    var _x = 0;
    var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      _x += el.offsetLeft // - el.scrollLeft;
      _y += el.offsetTop // - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: _y, left: _x };
  }

  window.accordion = function () {
    setTimeout(function () {
      $('.faq__accordion-items').click(function () {
        $this = $(this);
        $target = $this.parent().find(".faq__content");
        if ($target.hasClass('active')) {
          $target.prev().removeClass('active');
          $target.removeClass('active').slideUp(350);
        } else {
          $('.faq__accordion-items').removeClass('active');
          $('.faq__content').removeClass('active').slideUp(350);
          $target.prev().addClass('active');
          $target.addClass('active').slideDown(350);
        }
        setTimeout(function () {
          $('html, body').animate({ scrollTop: $this.offset().top - 90 }, 300);
        }, 350);

        return false;
      });
    }, 1000);
    if ($(window).width() >= 1100) {
      $(function () {
        $('.pd__block_items .faq__accordion-items').trigger('click');
      });
    }
  };

  if ($(window).width() <= 1000) {
    $('.remove-fancybox-mobile').each(function () {
      $('.remove-fancybox-mobile').removeAttr('data-fancybox').removeAttr('data-type').removeAttr('data-src').attr('target', '_blank');
    });
  }

  $('.pickup__question .btn:not(.btn-not-closed)').click(function () {
    $(this).parent().parent().parent().parent().addClass("payment__content_hide");
  });

  $('.pd__table-link').click(function () {
    $(this).toggleClass("active");
    $(".pd__table-td").toggleClass("active");
  });



  window.accordionMoreInit = function () {
    $('.pd__table-link').click(function () {
      $(this).toggleClass("active");
      $(".pd__table-td").toggleClass("active");
    });

  };

  $('.ycf__coll-title_visible').click(function () {
    var title = $(this).next();
    $('.ycf__content_visible').not(title).addClass('ycf__content_hide');
    $(this).next().toggleClass('ycf__content_hide');
    $('html, body').animate({ scrollTop: title.offset().top - 200 }, 500);
  });


  /*/ DATEPICKER  /*/
  if ($(".datepicker-here").length > 0) {
    $('.datepicker-here ').datepicker({ multipleDates: false });
  }


  function addSpaces(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
  }


  // About services tabs
  if ($(".bo-body__tab").length > 0) {
    $(function () {
      $('.bo-body__top').each(function () {
        $(this).find('.bo-body__tab').each(function (i) {
          $(this).click(function () {
            $(this).addClass('active').siblings().removeClass('active').closest('.bo-body__content').find('.bo-body__block').removeClass('active').eq(i).addClass('active');
          });
        });
      });
    })
  }

  window.offer_bo = function () {
    if ($(".offer-bo__tab").length > 0) {
      $(function () {
        $('.offer-bo__top').each(function () {
          $(this).find('.offer-bo__tab').each(function (i) {
            $(this).click(function () {
              $(this).addClass('active').siblings().removeClass('active').closest('.offer-bo').find('.offer-bo__body').removeClass('active').eq(i).addClass('active');
            });
          });
        });
      })
    }
  }

  // About services tabs
  if ($(".offer-bo__tab").length > 0) {
    $(function () {
      $('.offer-bo__top').each(function () {
        $(this).find('.offer-bo__tab').each(function (i) {
          $(this).click(function () {
            $(this).addClass('active').siblings().removeClass('active').closest('.offer-bo').find('.offer-bo__body').removeClass('active').eq(i).addClass('active');
          });
        });
      });
    })
  }

  // Du list tabs
  if ($(".du-list__tab").length > 0) {
    $(function () {
      $('.du-list__top').each(function () {
        $(this).find('.du-list__tab').each(function (i) {
          $(this).click(function () {
            $(this).addClass('active').siblings().removeClass('active').closest('.du-list').find('.du-list__item_block').removeClass('active').eq(i).addClass('active');
          });
        });
      });
    })
  }


  /*************************************/
  function calc1() {

    var summa = parseInt($("#slider-non-linear-money1 .noUi-handle-lower[aria-valuetext]").attr("aria-valuetext"));
    var limit = parseInt($("#slider-step-value1").text());
    var sep = parseInt($("#slider-non-linear-summ .noUi-handle-lower[aria-valuetext]").attr("aria-valuetext"));
    var prs = 20; //parseFloat($('.calc').data('persent'));
    var parcent = 0.2;

    var portfel = 0;
    for (var i = 1; i <= limit; i++) {
      if (i == 1) {
        portfel = summa * (1 + parcent);
      } else {
        portfel = (portfel + sep) * (1 + parcent);
      }
    }
    //$("#total_summ").html(portfel + "<span>Ñ€ÑƒÐ±</span>");

    if (sep < 400000) {
      var nv = sep * 0.13;
    } else {
      var nv = 52000;
    }

    var total = portfel + nv - summa - sep * (limit - 1);
    total = parseFloat(total).toFixed(0);

    var month = total / (limit * 12);
    month = parseFloat(month).toFixed(0);

    total = addSpaces(total);
    month = addSpaces(month);
    $("#total_summ").html(total);
    $("#month_summ").html(month);
  }

  var nonLinearSlider1 = document.getElementById('slider-non-linear1');
  if (nonLinearSlider1) {
    nonLinearSlider1 && noUiSlider && noUiSlider.create(nonLinearSlider1, {
      start: [4],
      behaviour: 'tap',
      connect: true,
      step: 1,
      range: {
        'min': [3],
        'max': [10]
      }
    });
    var stepSliderValueElement1 = document.getElementById('slider-step-value1');
    nonLinearSlider1.noUiSlider.on('update', function (values, handle) {
      var year = 'год';
      var val = parseFloat(values[handle]);
      if (val > 1 && val < 5) {
        year = 'годa';
      }
      if (val > 4 && val < 20) {
        year = 'лет';
      }
      stepSliderValueElement1.innerHTML = val + " " + year;
      calc1();
    });
  }

  var nonLinearSliderMoney1 = document.getElementById('slider-non-linear-money1');
  if (nonLinearSliderMoney1) {
    noUiSlider && noUiSlider.create(nonLinearSliderMoney1, {
      start: [140000],
      behaviour: 'tap',
      connect: true,
      step: 10000,
      range: {
        'min': [0],
        'max': [1000000]
      }
    });
    var stepSliderValueElementMoney1 = document.getElementById('slider-step-value-money1');
    nonLinearSliderMoney1.noUiSlider.on('update', function (values, handle) {
      var val = parseInt(values[handle]);
      val = addSpaces(val);
      stepSliderValueElementMoney1.innerHTML = val;
      calc1();
    });
  }

  if (nonLinearSliderSumm) {
    var nonLinearSliderSumm = document.getElementById('slider-non-linear-summ');
    noUiSlider && noUiSlider.create(nonLinearSliderSumm, {
      start: [140000],
      behaviour: 'tap',
      connect: true,
      step: 10000,
      range: {
        'min': [0],
        'max': [1000000]
      }
    });
    var stepSliderValueElementSumm = document.getElementById('slider-step-value-summ');
    nonLinearSliderSumm.noUiSlider.on('update', function (values, handle) {
      var val = parseInt(values[handle]);
      val = addSpaces(val);
      stepSliderValueElementSumm.innerHTML = val;
      calc1();
    });
  }


  $('[data-fancybox-pdf]').fancybox({
    iframe: {
      preload: true
    }
  })

});

window.sliderInit = function (serviceFee, successfulFee, incomePercent) {
  function addSpaces(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
  }

  function calc() {
    var summa = parseInt(document.getElementById('slider-step-value-money').value.replace(/\s+/g, ''));
    var limit = parseInt(document.getElementById('slider-step-value').value);
    var percent = 1 + incomePercent / 100;
    var month = 0;

    var total = summa * (Math.pow(percent, limit)) - summa;
    total = parseFloat(total).toFixed(0);

    if (limit !== 0) {
      month = total / 12 / limit;
      month = parseFloat(month).toFixed(0);
    }

    total = addSpaces(total);
    month = addSpaces(month);
    $("#total_summ").html(total);
    $("#month_summ").html(month);
  }

  if ($("#slider-non-linear").length > 0) {
    var nonLinearSlider = document.getElementById('slider-non-linear');
    try {
      nonLinearSlider.noUiSlider.destroy();
    } catch (e) {

    }

    var stepYear = 1;

    nonLinearSlider && noUiSlider && noUiSlider.create(nonLinearSlider, {
      start: [1],
      behaviour: 'tap',
      connect: true,
      step: stepYear,
      range: {
        'min': [1],
        'max': [9]
      }
    });
  }
  if ($("#slider-step-value").length > 0) {
    var stepSliderValueElement = document.getElementById('slider-step-value');
    try {
      stepSliderValueElement.noUiSlider.destroy();
    } catch (e) {

    }
    nonLinearSlider.noUiSlider.on('update', function (values, handle) {
      var year = 'год';
      var val = parseFloat(values[handle]);
      if (val === 0) {
        year = 'лет';
      }
      if (val > 1 && val < 5) {
        year = 'года';
      }
      if (val > 4 && val < 10) {
        year = 'лет';
      }
      stepSliderValueElement.value = val + " " + year;
      calc();
    });

    $(stepSliderValueElement).on('input', function (ev) {
      var valueYear = parseInt(stepSliderValueElement.value);
      if (isNaN(valueYear)) {
        nonLinearSlider.noUiSlider.set(0);
        stepSliderValueElement.value = null;
      } else {
        nonLinearSlider.noUiSlider.set(valueYear);
        stepSliderValueElement.value = valueYear;
      }
    });
    stepSliderValueElement.onfocus = function (ev) {
      (parseInt(stepSliderValueElement.value) === 0) ?
      stepSliderValueElement.value = null: stepSliderValueElement.value = parseInt(stepSliderValueElement.value);
    };
    stepSliderValueElement.onblur = function (ev) {
      valueYear = parseInt(stepSliderValueElement.value);
      if (!isNaN(valueYear)) {
        nonLinearSlider.noUiSlider.set(valueYear);
      } else {
        nonLinearSlider.noUiSlider.set(0);
      }
    };

  }
  if ($("#slider-non-linear-money").length > 0) {
    var nonLinearSliderMoney = document.getElementById('slider-non-linear-money');
    try {
      nonLinearSliderMoney.noUiSlider.destroy();
    } catch (e) {

    }

    var stepSlider = 10000;

    noUiSlider.create(nonLinearSliderMoney, {
      start: [1000000],
      behaviour: 'tap',
      connect: true,
      step: stepSlider,
      range: {
        'min': [0],
        'max': [10000000]
      },
      value: nonLinearSliderMoney.value
    });
  }
  if ($("#slider-step-value-money").length > 0) {
    var stepSliderValueElementMoney = document.getElementById('slider-step-value-money');

    nonLinearSliderMoney.noUiSlider.on('update', function (values, handle) {
      var val = parseInt(values[handle]);
      val = addSpaces(val);
      stepSliderValueElementMoney.value = addSpaces(val);
      calc();
    });

    $(stepSliderValueElementMoney).on('input', function (ev) {
      var valueMoney = parseInt(stepSliderValueElementMoney.value.replace(/\s+/g, ''));
      if (isNaN(valueMoney)) {
        nonLinearSliderMoney.noUiSlider.set(0);
        stepSliderValueElementMoney.value = null;
      } else {
        nonLinearSliderMoney.noUiSlider.set(valueMoney);
        stepSliderValueElementMoney.value = valueMoney;
        calc();
      }
    });
    stepSliderValueElementMoney.onfocus = function (ev) {
      (parseInt(stepSliderValueElementMoney.value) === 0) ?
      stepSliderValueElementMoney.value = null: stepSliderValueElementMoney.value = stepSliderValueElementMoney.value.replace(/\s+/g, '');
    };

    stepSliderValueElementMoney.onblur = function (ev) {
      valueMoney = parseInt(stepSliderValueElementMoney.value.replace(/\s+/g, ''));
      if (!isNaN(valueMoney)) {
        if (valueMoney < stepSlider && valueMoney !== 0) {
          nonLinearSliderMoney.noUiSlider.set(stepSlider);
        } else {
          nonLinearSliderMoney.noUiSlider.set(valueMoney);
        }
        stepSliderValueElementMoney.value = addSpaces(valueMoney);
        calc();
      } else {
        nonLinearSliderMoney.noUiSlider.set(0);
      }
    };

  }
}
