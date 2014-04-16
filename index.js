var objectility = require('../objectility');

//the name of your plugin
var pluginName = 'omniscroll-touch';
var source = 'touchscreen';

//the plugin constructor
var plugin = function(omniscroll,options) {

  var settings = {
    touchFactor: 2,
    preventDefault: true
  };

  objectility.extendOwn(settings,options);

  var y1 = 0;
  var y2 = 0;
  var delta = 0;

  function onEvent(e) {

    if (settings.preventDefault) {
      e.preventDefault();
    }

    y2 = e.touches[0].pageY;

    delta = (y1 - y2) / Math.abs(y1-y2) * settings.touchFactor || settings.touchFactor;

    omniscroll.consume(delta,source);
  }

  function onEventStart(e) {
    y1 = e.touches[0].pageY;
  }

  //exposed interface
  return {
    bind: function(element) {
      element.addEventListener('touchstart',onEventStart);
      element.addEventListener('touchmove',onEvent);
    },
    unbind: function(element) {
      element.removeEventListener('touchstart',onEventStart);
      element.removeEventListener('touchmove',onEvent);
    }
  }

};

module.exports = function(omniscroll,options) {
  return omniscroll.plugin(pluginName,plugin(omniscroll,options));
};