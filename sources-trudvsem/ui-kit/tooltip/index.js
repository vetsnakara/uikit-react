;jQuery(function() {
  // Polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;
  }

  var container = document.querySelector('body');
  var hoveredTooltipElement = null;
  var toggledTooltipElement = null;

  var createElement = function (className, content) {
    var element = document.createElement('div');
    element.classList.add(className);
    if(content) element.textContent = content;
    return element;
  }

  var toggleTooltipOn = function (element, toggling) {
    var $element = jQuery(element);
    var theme = $element.data('tooltip-theme') || 'default';
    var tooltip = createElement('tooltip', $element.data('tooltip'));
    var arrow = createElement('tooltip__arrow');

    if($element.data("tooltip-container")) {
      container = document.querySelector($element.data("tooltip-container"));
    }

    if(toggling) tooltip.classList.add('tooltip_toggle');
    element.classList.add('tooltip_active');
    tooltip.classList.add('tooltip_theme-' + theme);
    tooltip.insertBefore(arrow, tooltip.firstChild);
    container.appendChild(tooltip);

    var tooltipRect = tooltip.getBoundingClientRect();
    var arrowRect = arrow.getBoundingClientRect();
    var elementOffset = $element.offset();
    var xMin = 22; // More than scroll, sync with css
    var xMax = window.innerWidth - tooltipRect.width - xMin;
    var xCur = elementOffset.left + $element.outerWidth() / 2 - tooltipRect.width / 2;
    var xTooltip = Math.min(xMax, Math.max(xMin, xCur));
    var xArrow = (tooltipRect.width - arrowRect.width) / 2 - (xTooltip - xCur);
    var yTooltip = Math.round(elementOffset.top - arrowRect.height - tooltipRect.height);
    var yArrow = Math.round(tooltipRect.height);

    tooltip.style.cssText = 'transform: translate(' + xTooltip + 'px,' + yTooltip + 'px)';
    arrow.style.cssText = 'transform: translate(' + xArrow + 'px,' + yArrow + 'px)';
    return tooltip;
  }

  var toggleTooltipOff = function (event) {
    var handler = container.querySelector('.tooltip_active[data-tooltip][data-tooltip-toggle]');
    if(handler) {
      handler.classList.remove('tooltip_active');
      toggledTooltipElement.parentNode.removeChild(toggledTooltipElement);
      toggledTooltipElement = null;
    }    
  }

  var toggleTooltip = function (event) {
    if (toggledTooltipElement) {
      toggleTooltipOff(event)
    } else {
      for (var target = event.target; target && target != this; target = target.parentNode) {
        if (target.matches('[data-tooltip][data-tooltip-toggle]')) {
          toggledTooltipElement = toggleTooltipOn(target, true);
          break;
        }
      }
    }
  }

  var hideTooltip = function (event) {
    if (event.target.matches('[data-tooltip]:not([data-tooltip-toggle])')) {
      event.target.classList.remove('tooltip_active');
      hoveredTooltipElement.parentNode.removeChild(hoveredTooltipElement);
      hoveredTooltipElement = null;
      container.removeEventListener('mouseleave', hideTooltip, true);
    }
  }

  var showTooltip = function (event) {
    if (event.target.matches('[data-tooltip]:not([data-tooltip-toggle])')) {
      hoveredTooltipElement = toggleTooltipOn(event.target, false);
      container.addEventListener('mouseleave', hideTooltip, true);
    }
  }

  container.addEventListener('mouseenter', showTooltip, true);
  container.addEventListener('click', toggleTooltip, true);
});
