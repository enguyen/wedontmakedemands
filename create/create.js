/*
 * Copyright 2011 Eric Nguyen
 * See http://wedontmakedemands.org/ for more details
 */

// Globals. Whatever, don't judge me.
var messageInput, messageOutput,
    linkInput, linkPreview, qrcode, qrcodeLink,
    shareButton, shortLinkInput;
 
// Protect against XSS attacks by whitelisting any user-provided
// data before it is added anywhere to the DOM.
function sanitize(string) {
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
function updateMessage() {
  var message = sanitize(messageInput.val());
  message = message.replace('\n', ' <br/> ');
  var tokens = message.split(/\s/);
  tokens = $.map(tokens, function(token) {
    return token == token.toUpperCase() ?
        '<span>' + token + '</span>' : token;
  });
  messageOutput[0].innerHTML = tokens.join(' ');
  updateUrl();
}

function updateFontScale(percentChange) {
  function scaleStyle(originalProperty) {
    var oldScale = messageOutput.data('fontScale');
    var newScale = oldScale + (percentChange / 100);
    messageOutput.data('fontScale', newScale);
    var originalValue = messageOutput.data(originalProperty);
    return (originalValue * newScale) + 'px';
  }
  messageOutput.css('font-size', scaleStyle('originalFontSize'));
  messageOutput.css('line-height', scaleStyle('originalLineHeight'));
  updateUrl();
}

// Sanitize and output Wikipedia link. Throttle this to 
// keep it from hitting the Charts API too often.
function updateLink() {        
  var linkValue = sanitize(linkInput.val());
  qrcode[0].src = 'https://chart.googleapis.com/chart?' +
      'cht=qr&chs=120x120&choe=UTF-8&chld=M|0&chl=' +
      'http://en.qrwp.org/' + linkValue;
  qrcodeLink[0].href = 'http://en.qrwp.org/' + linkValue;
  qrcodeLink[0].title = 'Wikipedia article: "' + linkValue + '"'
  linkPreview[0].src = qrcodeLink[0].href;
  updateUrl();
}

function makeThrottled(inputFunction, delay) {
  var timedExecution;
  function throttled() {
    clearTimeout(timedExecution);
    timedExecution = setTimeout(inputFunction, delay);
  }
  return throttled;
}

function updateUrl() {
  var params = {
    m: messageInput.val(),
    l: linkInput.val(),
    s: Math.round(100 * messageOutput.data('fontScale')) / 100
  };
  var hashString = '';
  for (var paramName in params) {
    var value = params[paramName];
    if (value) hashString += (paramName + '=' + encodeURI(value) + '&');
  }
  window.location.hash = hashString;
}

function create_main() {
  // Set globals.
  messageInput = $('#editor .message-input');
  messageOutput = $('#poster .message');
  linkInput = $('#editor .link-input');
  linkPreview = $('#editor .link-preview');
  qrcode = $('#poster .qrcode');
  qrcodeLink = $('#poster .qrcode-link');
  shareButton = $('#editor .share-button');
  shortLinkInput = $('#editor .short-link-input');
  
  // Extract initial settings from URL. Sanitize.
  var paramStrings = window.location.hash.slice(1).split('&');
  var params = {};
  for (var i = 0; i < paramStrings.length; i += 1) {
    var hash = paramStrings[i].split('=');
    params[hash[0]] = sanitize(decodeURI(hash[1]));
  }
  
  // Push initial settings into editor.
  messageInput.val(params.m);
  linkInput.val(params.l);
  
  // Set up events and initialize poster.
  // Message.
  messageInput.keyup(makeThrottled(updateMessage, 250));
  updateMessage();
  
  // Link.
  linkInput.keyup(makeThrottled(updateLink, 2000));
  params.l && updateLink();
  
  // Font size and line height.
  messageOutput.data('fontScale', parseFloat(params.s) || 1);
  messageOutput.data('originalFontSize', 
      parseInt(messageOutput.css('font-size').slice(0,-2)));
  messageOutput.data('originalLineHeight', 
      parseInt(messageOutput.css('line-height').slice(0,-2)));
  $('#editor .larger-button').click(function() {
    updateFontScale(1)
  });
  $('#editor .smaller-button').click(function() {
    updateFontScale(-1)
  });
  params.s && updateFontScale(params.s - 1);
  
  // Set up share button.
  shareButton.click(function() {
    gapi.client.load('urlshortener', 'v1', function() {
      var request = gapi.client.urlshortener.url.insert({
        resource: { 
          key: 'AIzaSyDQ8kbLY0NXOFDlqE80D_8W4zN1JTnF2Z0',
          longUrl: window.location.href
        }
      });
      var resp = request.execute(function(resp) {
        if (!resp.error) {
          shortLinkInput.show();
          shortLinkInput.val(resp.id);
          shortLinkInput.select();
          $('.addthis_toolbox').show();
        }
      });
    });
  });
}