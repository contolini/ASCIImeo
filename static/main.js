/*
 *
 * http://github.com/contolini/asciitube
 *
 * Copyright (c) 2014 Chris Contolini
 * Licensed under the MIT license.
 */

'use strict';

var debounce = require('debounce');
var url = require('url');

var video = document.getElementById('video'),
    vimeoUrl = document.getElementById('url'),
    request = new XMLHttpRequest(),
    lastId;

vimeoUrl.addEventListener('keyup', debounce(getVideo, 200));

function getVideo( vid ) {
  var vid = vid || vimeoUrl.value,
      id = !/^https?:\/\//i.test( vid ) ? 'http://' + vid : vid;
  id = url.parse(id).pathname;
  id = id.match(/\/(\d+)\/?/)[1];
  if ( id == lastId ) {
    return;
  }
  lastId = id;
  request.open('GET', 'http://vimeo-video.cloudno.de/video/' + id, true);
  request.onload = function() {
    if (this.status >= 200 && this.status < 400){
      video.src = JSON.parse(this.response).data.videoUrl;
      startTheParty();
    } else {
      console.error('Error getting video file location.');
    }
  };
  request.send();
}

function startTheParty() {
  var asciiVideo = new Jscii({
    container: document.getElementById('ascii-video'),
    el: document.getElementById('video')
  });
  asciiVideo.play();
}

getVideo('http://vimeo.com/69158874');