;(function (handler) {
  // Polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;
  }

  // Scrolling
  function scrollTo(target) {
    var bodyStyle = window.getComputedStyle(document.body, null);
    var offsetPadding = bodyStyle.getPropertyValue('padding-top');
    var offsetMargin = bodyStyle.getPropertyValue('margin-top');
    var offset = parseFloat(offsetPadding, 10) + parseFloat(offsetMargin, 10);
    window.scrollBy(0, target.getBoundingClientRect().top - offset);
  }

  // Init by onload
  jQuery(function () {
    var target = document.querySelector('[name="' + location.hash.split("#").pop() + '"]');
    if (target) scrollTo(target);
  })

  // Init by click
  document.addEventListener("click", function (event) {
    // loop parent nodes from the target to the delegation node
    for (var target = event.target; target && target != this; target = target.parentNode) {
      if (target.matches('.anchor')) {
        var error = handler.call(target, event, scrollTo);
        if (error) console.warn(error);
        break;
      }
    }
  }, false);
})(function (event, scrollTo) {
  event.preventDefault();
  var targetLink = this.getAttribute("href");
  if (!targetLink || targetLink.length < 2) return "Anchor has no target link";
  var targetName = targetLink.split("#").pop();
  var targetSelector = '[name="' + targetName + '"]';
  var target = document.querySelector(targetSelector);
  if (!target) return 'Anchor`s target (' + targetSelector + ') not found on page';
  location.hash = '#' + targetName;
  scrollTo(target);
});
