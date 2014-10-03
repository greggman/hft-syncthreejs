/*
 * Copyright 2014, Gregg Tavares.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Gregg Tavares. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF2 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

"use strict";

requirejs([], function() {
  var launch = function(opt) {
    opt = opt || {};

    var numWindows = 3;

    // use a width so there's at least 1 window left of space.
    var width  = window.screen.availWidth / (numWindows + 1) | 0;
    var height = window.screen.availHeight / 3 * 2 | 0;

    var settings = {
      shared: {
        fullWidth:  width * numWindows,
        fullHeight: height,
        useWindowPosition: opt.useWindowPosition,
      },
    };

    var options = {
      resizeable: 1,
      scrollbars: 1,
      menubar: 1,
      toolbar: 1,
      location: 1,
      width: width,
      height: height,
    };

    if (opt.useWindowPosition) {
      settings.shared.fullWidth = window.screen.availWidth;
      settings.shared.fullHeight = window.screen.availHeight;
    }

    var middle = numWindows / 2 | 0;
    var windows = [];
    for (var ii = 0; ii < numWindows; ++ii) {
      options.left = 10 + window.screen.availLeft + ii * width;
      options.top  = 10 + window.screen.availTop;

      if (!opt.useWindowPosition) {
        settings.x = ii * width;
        settings.y = 0;
      }

      settings.server = ii == middle ? true : undefined;

      windows.push({
        url: "syncThreeJS.html?settings=" + JSON.stringify(settings).replace(/"/g, ""),
        title: "view " + ii,
        windowOptions: JSON.stringify(options).replace(/[{}"]/g, "").replace(/\:/g,"="),
      })
    }

    var first = windows.splice(middle, 1);
    windows.unshift(first[0]);

    windows.forEach(function(w) {
      window.open(w.url, w.title, w.windowOptions);
    });

  };

  var $ = function(id) {
    return document.getElementById(id);
  };

  $("button1").addEventListener('click', function() { launch(); }, false);
  $("button2").addEventListener('click', function() { launch({useWindowPosition: true}); }, false);

});


