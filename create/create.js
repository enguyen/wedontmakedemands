/*
 * Copyright 2011 Eric Nguyen
 * See http://wedontmakedemands.org/ for more details.
 */

// Set up namespace and properties.
function PosterMaker() {
  this.editPane;
  this.inEditMode;
  this.messageInput;
  this.messageOutput;
  this.linkInput;
  this.linkPreview;
  this.qrcode;
  this.qrcodeLink;
  this.shareButton;
  this.shortLink;
  this.sharePane;
}
 
// Protect against XSS attacks by whitelisting any user-provided
// data before it is added anywhere to the DOM.
PosterMaker.prototype.sanitize = function(string) {
  if (!string) {
    return ''; // In case it's undefined or otherwise falsy.
  }
  var out = '';
  // TODO: Quadruple-check. Two output contexts, both assigned 
  //     via DOM properties: innerHTML and as tag attributes 
  //     (href and title, for the qrcode link).
  var whitelist = /[\w\d\s\/,.?\/~\-_=+:;'"!@#$%^&*()]/;
  for (var i = 0; i < string.length; i += 1) {
    var char = string[i];
    if (whitelist.test(char)) {
      out += char;
    } else {
      console.log('Invalid char: ' + char);
    }
  }
  return out;
} 

// Sanitize, highlight, and output message.
PosterMaker.prototype.updateMessage = function() {
  var message = this.sanitize(this.messageInput.val());
  message = message.replace('\n', ' <br/> ');
  var tokens = message.split(/\s/);
  tokens = $.map(tokens, function(token) {
    return token == token.toUpperCase() ?
        '<span>' + token + '</span>' : token;
  });
  this.messageOutput[0].innerHTML = tokens.join(' ');
  this.updateUrl();
}

PosterMaker.prototype.updateFontScale = function(percentChange) {
	var self = this;
  var scaleStyle = $.proxy(function(originalProperty) {
    var oldScale = this.messageOutput.data('fontScale');
    var newScale = oldScale + (percentChange / 100);
    this.messageOutput.data('fontScale', newScale);
    var originalValue = this.messageOutput.data(originalProperty);
    return (originalValue * newScale) + 'px';
  }, this);
  this.messageOutput.css('font-size', scaleStyle('originalFontSize'));
  this.messageOutput.css('line-height', scaleStyle('originalLineHeight'));
  this.updateUrl();
}

// Sanitize and output Wikipedia link. Throttle this to 
// keep it from hitting the Charts API too often.
PosterMaker.prototype.updateLink = function() {        
  var linkValue = this.sanitize(this.linkInput.val());
  this.qrcode[0].src = 'https://chart.googleapis.com/chart?' +
      'cht=qr&chs=120x120&choe=UTF-8&chld=M|0&chl=' +
      'http://en.qrwp.org/' + linkValue;
  this.qrcodeLink[0].href = 'http://en.qrwp.org/' + linkValue;
  this.qrcodeLink[0].title = 'Wikipedia article: "' + linkValue + '"'
  this.linkPreview[0].src = this.qrcodeLink[0].href;
  this.updateUrl();
}

PosterMaker.prototype.makeThrottled = function(inputFunction, delay) {
  var timedExecution;
  var throttled = $.proxy(function() {
    clearTimeout(timedExecution);
    timedExecution = setTimeout($.proxy(inputFunction, this), delay);
  }, this);
  return throttled;
}

PosterMaker.prototype.updateUrl = function() {
  var params = {
    e: this.inEditMode ? 't' : null,
    m: this.messageInput.val(),
    l: this.linkInput.val(),
    s: Math.round(100 * this.messageOutput.data('fontScale')) / 100
  };
  var hashString = '';
  for (var paramName in params) {
    var value = params[paramName];
    if (value) hashString += (paramName + '=' + encodeURI(value) + '&');
  }
  window.location.hash = hashString;
}

// Takes a callback function, with the shortened URL as its param.
PosterMaker.prototype.getShortLink = function(callback) {
  gapi.client.load('urlshortener', 'v1', $.proxy(function() {
    var request = gapi.client.urlshortener.url.insert({
      resource: { 
        key: 'AIzaSyDQ8kbLY0NXOFDlqE80D_8W4zN1JTnF2Z0',
        longUrl: window.location.href
      }
    });
    var resp = request.execute($.proxy(function(resp) {
      if (!resp.error) {
        var url = resp.id
        var message = '"' + this.messageInput.val() +
            '" - a poster at WeDontMakeDemands.org';

        // Push new share params into the sharing elements.
        this.shortLink.val(url);
        addthis.update('share', 'url', url);
        addthis.update('share', 'title', message);

        // Callback, if any
        callback && callback(url);
      }
    }, this));
  }, this));
}

PosterMaker.prototype.switchMode = function(newMode) {
  this.inEditMode = newMode == 'edit';
  if (this.inEditMode) {
    this.sharePane.hide();
    this.editPane.show();
  } else {
    this.sharePane.show();
    this.editPane.hide();
  }
  this.updateUrl();
};


// Separated out so that we can call this on load() (after the
// Google API bootstrapper has loaded) rather than ready()
PosterMaker.prototype.onload = function() {
  this.getShortLink();
}

// Main setup tasks to be executed immediately after the DOM is
// ready.
PosterMaker.prototype.onready = function() {
  // Set globals.
  this.editPane = $('#edit');
  this.messageInput = $('#edit .message-input');
  this.messageOutput = $('#poster .message');
  this.linkInput = $('#edit .link-input');
  this.linkPreview = $('#edit .link-preview');
  this.qrcode = $('#poster .qrcode');
  this.qrcodeLink = $('#poster .qrcode-link');
  this.shareButton = $('#edit .share-button');
  this.sharePane = $('#share');
  this.shortLink = $('#share .short-link');
  remixButton = $('#share .remix-button');

  // Extract initial settings from URL. Sanitize.
  var paramStrings = window.location.hash.slice(1).split('&');
  var params = {};
  for (var i = 0; i < paramStrings.length; i += 1) {
    var hash = paramStrings[i].split('=');
    params[hash[0]] = this.sanitize(decodeURI(hash[1]));
  }

  // Initialize to the correct mode, defaulting to view mode.
  this.switchMode(params.e ? 'edit' : null);

  // Push initial settings into editor.
  this.messageInput.val(params.m);
  this.linkInput.val(params.l);
  
  // Set up events and initialize poster.
  // Message.
  this.messageInput.keyup(this.makeThrottled(this.updateMessage, 250));
  this.updateMessage();
  
  // Link.
  this.linkInput.keyup(this.makeThrottled(this.updateLink, 2000));
  params.l && this.updateLink();
  
  // Font size and line height.
  this.messageOutput.data('fontScale', parseFloat(params.s) || 1);
  this.messageOutput.data('originalFontSize', 
      parseInt(this.messageOutput.css('font-size').slice(0,-2)));
  this.messageOutput.data('originalLineHeight', 
      parseInt(this.messageOutput.css('line-height').slice(0,-2)));
  $('#edit .larger-button').click($.proxy(function() {
    this.updateFontScale(1)
  }, this));
  $('#edit .smaller-button').click($.proxy(function() {
    this.updateFontScale(-1)
  }, this));
  params.s && this.updateFontScale(params.s - 1);

  // Set up remix button.
  remixButton.click($.proxy(function() {
    this.switchMode('edit');
  }, this));
  
  // Set up share button.
  this.shareButton.click($.proxy(function() {
    this.getShortLink($.proxy(function(url) {
      this.switchMode();
    }, this));
  }, this));
}
