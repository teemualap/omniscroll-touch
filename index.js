var objectility = require('objectility');

//the name of your plugin
var pluginName = 'omniscroll-touch';
var source = 'touchscreen';

//the plugin constructor
var plugin = function(omniscroll,options) {

  var settings = {
    touchFactor: 1,
    preventDefault: true
  };

  objectility.extendOwn(settings,options);

  var y1 = 0;
  var y2 = 0;
  var delta = 0;
  var touchDown = false;

  function onMove(e) {

    if (settings.preventDefault) {
      e.preventDefault();
    }

    if (touchDown) {
      y2 = e.touches[0].clientY;
      delta = y1 - y2;
      if (delta > 2 || delta < -2) {
        y1 = y2;
        delta *= settings.touchFactor;
        omniscroll.consume(delta,source);
      }
    }
  }

  function onStart(e) {
    touchDown = true;
    y1 = e.touches[0].clientY;
  }

  function onEnd(e) {
    touchDown = false;
  }

  //exposed interface
  return {
    bind: function(element) {
      element.addEventListener('touchstart',onStart);
      element.addEventListener('touchmove',onMove);
      element.addEventListener('touchend',onEnd);
    },
    unbind: function(element) {
      element.removeEventListener('touchstart',onStart);
      element.removeEventListener('touchmove',onMove);
      element.removeEventListener('touchend',onEnd);
    }
  }

};

module.exports = function(omniscroll,options) {
  return omniscroll.plugin(pluginName,plugin(omniscroll,options));
};