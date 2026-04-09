/**
 * InfoBox - Google Maps Custom Overlay Library
 * Clean, unobfuscated implementation compatible with Google Maps JavaScript API v3
 * Based on the standard InfoBox library (MIT licensed)
 * Replaces the previous eval()-packed version.
 */

/**
 * @constructor
 * @param {Object} [options] - Configuration options
 */
function InfoBox(options) {
  options = options || {};
  google.maps.OverlayView.apply(this, arguments);

  this.content_               = options.content          || "";
  this.disableAutoPan_        = options.disableAutoPan   || false;
  this.maxWidth_              = options.maxWidth         || 0;
  this.pixelOffset_           = options.pixelOffset      || new google.maps.Size(0, 0);
  this.position_              = options.position         || new google.maps.LatLng(0, 0);
  this.zIndex_                = options.zIndex           !== undefined ? options.zIndex : null;
  this.boxClass_              = options.boxClass         || "infoBox";
  this.boxStyle_              = options.boxStyle         || {};
  this.closeBoxMargin_        = options.closeBoxMargin   || "2px";
  this.closeBoxURL_           = options.closeBoxURL      || "http://www.google.com/intl/en_us/mapfiles/close.gif";
  if (options.closeBoxURL === "") { this.closeBoxURL_ = ""; }
  this.infoBoxClearance_      = options.infoBoxClearance || new google.maps.Size(1, 1);
  this.pane_                  = options.pane             || "floatPane";
  this.enableEventPropagation_ = options.enableEventPropagation || false;
  this.alignBottom_           = options.alignBottom      || false;

  if (typeof options.visible === "undefined") {
    this.isHidden_ = (typeof options.isHidden !== "undefined") ? options.isHidden : false;
  } else {
    this.isHidden_ = !options.visible;
  }

  this.div_             = null;
  this.closeListener_   = null;
  this.moveListener_    = null;
  this.contextListener_ = null;
  this.eventListeners_  = null;
  this.fixedWidthSet_   = null;
}

InfoBox.prototype = new google.maps.OverlayView();

/**
 * Creates the DIV element for the InfoBox.
 * @private
 */
InfoBox.prototype.createInfoBoxDiv_ = function () {
  var i, events, bw;
  var me = this;

  var stopMouseEvent = function (e) {
    e.cancelBubble = true;
    if (e.stopPropagation) { e.stopPropagation(); }
  };

  var ignoreHandler = function (e) {
    e.returnValue = false;
    if (e.preventDefault) { e.preventDefault(); }
    if (!me.enableEventPropagation_) { stopMouseEvent(e); }
  };

  if (!this.div_) {
    this.div_ = document.createElement("div");
    this.setBoxStyle_();

    if (typeof this.content_.nodeType === "undefined") {
      this.div_.innerHTML = this.getCloseBoxImg_() + this.content_;
    } else {
      this.div_.innerHTML = this.getCloseBoxImg_();
      this.div_.appendChild(this.content_);
    }

    this.getPanes()[this.pane_].appendChild(this.div_);
    this.addClickHandler_();

    if (this.div_.style.width) {
      this.fixedWidthSet_ = true;
    } else {
      if (this.maxWidth_ !== 0 && this.div_.offsetWidth > this.maxWidth_) {
        this.div_.style.width    = this.maxWidth_;
        this.div_.style.overflow = "auto";
        this.fixedWidthSet_      = true;
      } else {
        bw = this.getBoxWidths_();
        this.div_.style.width = (this.div_.offsetWidth - bw.left - bw.right) + "px";
        this.fixedWidthSet_   = false;
      }
    }

    this.panBox_(this.disableAutoPan_);

    if (!this.enableEventPropagation_) {
      this.eventListeners_ = [];
      events = ["mousedown", "mouseover", "mouseout", "mouseup",
                "click", "dblclick", "touchstart", "touchend",
                "touchmove", "contextmenu"];
      for (i = 0; i < events.length; i++) {
        this.eventListeners_.push(
          google.maps.event.addDomListener(this.div_, events[i], stopMouseEvent)
        );
      }
      this.eventListeners_.push(
        google.maps.event.addDomListener(this.div_, "mouseover", function () {
          this.style.cursor = "default";
        })
      );
    }

    this.contextListener_ = google.maps.event.addDomListener(
      this.div_, "contextmenu", ignoreHandler
    );
    google.maps.event.trigger(this, "domready");
  }
};

/**
 * Builds the close-box img markup string.
 * @private
 * @returns {string}
 */
InfoBox.prototype.getCloseBoxImg_ = function () {
  var img = "";
  if (this.closeBoxURL_ !== "") {
    img  = "<img";
    img += " src='" + this.closeBoxURL_ + "'";
    img += " align=right";
    img += " style='position:relative;cursor:pointer;margin:" + this.closeBoxMargin_ + ";'";
    img += ">";
  }
  return img;
};

/**
 * Attaches the close-box click handler.
 * @private
 */
InfoBox.prototype.addClickHandler_ = function () {
  if (this.closeBoxURL_ !== "") {
    var closeBox = this.div_.firstChild;
    this.closeListener_ = google.maps.event.addDomListener(
      closeBox, "click", this.getCloseClickHandler_()
    );
  } else {
    this.closeListener_ = null;
  }
};

/**
 * Returns the close-click event handler function.
 * @private
 * @returns {Function}
 */
InfoBox.prototype.getCloseClickHandler_ = function () {
  var me = this;
  return function (e) {
    e.cancelBubble = true;
    if (e.stopPropagation) { e.stopPropagation(); }
    google.maps.event.trigger(me, "closeclick");
    me.close();
  };
};

/**
 * Pans the map to keep the InfoBox within the viewport.
 * @private
 * @param {boolean} disablePan
 */
InfoBox.prototype.panBox_ = function (disablePan) {
  var map, pixelOffset;
  var xOffset = 0, yOffset = 0;

  if (!disablePan) {
    map = this.getMap();
    if (map instanceof google.maps.Map) {
      if (!map.getBounds().contains(this.position_)) {
        map.setCenter(this.position_);
      }
      var mapDiv    = map.getDiv();
      var mapWidth  = mapDiv.offsetWidth;
      var mapHeight = mapDiv.offsetHeight;
      var iwOffsetX = this.pixelOffset_.width;
      var iwOffsetY = this.pixelOffset_.height;
      var iwWidth   = this.div_.offsetWidth;
      var iwHeight  = this.div_.offsetHeight;
      var padX      = this.infoBoxClearance_.width;
      var padY      = this.infoBoxClearance_.height;

      pixelOffset = this.getProjection().fromLatLngToContainerPixel(this.position_);

      if (pixelOffset.x < (-iwOffsetX + padX)) {
        xOffset = pixelOffset.x + iwOffsetX - padX;
      } else if ((pixelOffset.x + iwWidth + iwOffsetX + padX) > mapWidth) {
        xOffset = pixelOffset.x + iwWidth + iwOffsetX + padX - mapWidth;
      }

      if (this.alignBottom_) {
        if (pixelOffset.y < (-iwOffsetY + padY + iwHeight)) {
          yOffset = pixelOffset.y + iwOffsetY - padY - iwHeight;
        } else if ((pixelOffset.y + iwOffsetY + padY) > mapHeight) {
          yOffset = pixelOffset.y + iwOffsetY + padY - mapHeight;
        }
      } else {
        if (pixelOffset.y < (-iwOffsetY + padY)) {
          yOffset = pixelOffset.y + iwOffsetY - padY;
        } else if ((pixelOffset.y + iwHeight + iwOffsetY + padY) > mapHeight) {
          yOffset = pixelOffset.y + iwHeight + iwOffsetY + padY - mapHeight;
        }
      }

      if (!(xOffset === 0 && yOffset === 0)) {
        map.panBy(xOffset, yOffset);
      }
    }
  }
};

/**
 * Applies the boxStyle_ options to the InfoBox div element.
 * @private
 */
InfoBox.prototype.setBoxStyle_ = function () {
  var i, boxStyle;
  if (this.div_) {
    this.div_.className     = this.boxClass_;
    this.div_.style.cssText = "";
    boxStyle = this.boxStyle_;
    for (i in boxStyle) {
      if (boxStyle.hasOwnProperty(i)) {
        this.div_.style[i] = boxStyle[i];
      }
    }
    this.div_.style.WebkitTransform = "translateZ(0)";
    if (typeof this.div_.style.opacity !== "undefined" && this.div_.style.opacity !== "") {
      var opacityVal = this.div_.style.opacity * 100;
      this.div_.style.MsFilter = "\"progid:DXImageTransform.Microsoft.Alpha(Opacity=" + opacityVal + ")\"";
      this.div_.style.filter   = "alpha(opacity=" + opacityVal + ")";
    }
    this.div_.style.position   = "absolute";
    this.div_.style.visibility = "hidden";
    if (this.zIndex_ !== null) {
      this.div_.style.zIndex = this.zIndex_;
    }
  }
};

/**
 * Returns the computed border widths of the InfoBox div.
 * @private
 * @returns {{top: number, bottom: number, left: number, right: number}}
 */
InfoBox.prototype.getBoxWidths_ = function () {
  var computedStyle;
  var bw  = { top: 0, bottom: 0, left: 0, right: 0 };
  var box = this.div_;

  if (document.defaultView && document.defaultView.getComputedStyle) {
    computedStyle = box.ownerDocument.defaultView.getComputedStyle(box, "");
    if (computedStyle) {
      bw.top    = parseInt(computedStyle.borderTopWidth,    10) || 0;
      bw.bottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;
      bw.left   = parseInt(computedStyle.borderLeftWidth,   10) || 0;
      bw.right  = parseInt(computedStyle.borderRightWidth,  10) || 0;
    }
  } else if (document.documentElement.currentStyle) {
    if (box.currentStyle) {
      bw.top    = parseInt(box.currentStyle.borderTopWidth,    10) || 0;
      bw.bottom = parseInt(box.currentStyle.borderBottomWidth, 10) || 0;
      bw.left   = parseInt(box.currentStyle.borderLeftWidth,   10) || 0;
      bw.right  = parseInt(box.currentStyle.borderRightWidth,  10) || 0;
    }
  }
  return bw;
};

/** Removes the InfoBox div from the map. */
InfoBox.prototype.onRemove = function () {
  if (this.div_) {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
};

/** Draws and positions the InfoBox on the map. */
InfoBox.prototype.draw = function () {
  this.createInfoBoxDiv_();
  var pixelOffset = this.getProjection().fromLatLngToDivPixel(this.position_);
  this.div_.style.left = (pixelOffset.x + this.pixelOffset_.width) + "px";
  if (this.alignBottom_) {
    this.div_.style.bottom = -(pixelOffset.y + this.pixelOffset_.height) + "px";
  } else {
    this.div_.style.top = (pixelOffset.y + this.pixelOffset_.height) + "px";
  }
  this.div_.style.visibility = this.isHidden_ ? "hidden" : "visible";
};

/**
 * Sets multiple InfoBox options at once and redraws if shown.
 * @param {Object} options
 */
InfoBox.prototype.setOptions = function (options) {
  if (typeof options.boxClass            !== "undefined") { this.boxClass_  = options.boxClass;  this.setBoxStyle_(); }
  if (typeof options.boxStyle            !== "undefined") { this.boxStyle_  = options.boxStyle;  this.setBoxStyle_(); }
  if (typeof options.content             !== "undefined") { this.setContent(options.content); }
  if (typeof options.disableAutoPan      !== "undefined") { this.disableAutoPan_      = options.disableAutoPan; }
  if (typeof options.maxWidth            !== "undefined") { this.maxWidth_            = options.maxWidth; }
  if (typeof options.pixelOffset         !== "undefined") { this.pixelOffset_         = options.pixelOffset; }
  if (typeof options.alignBottom         !== "undefined") { this.alignBottom_         = options.alignBottom; }
  if (typeof options.position            !== "undefined") { this.setPosition(options.position); }
  if (typeof options.zIndex              !== "undefined") { this.setZIndex(options.zIndex); }
  if (typeof options.closeBoxMargin      !== "undefined") { this.closeBoxMargin_      = options.closeBoxMargin; }
  if (typeof options.closeBoxURL         !== "undefined") { this.closeBoxURL_         = options.closeBoxURL; }
  if (typeof options.infoBoxClearance    !== "undefined") { this.infoBoxClearance_    = options.infoBoxClearance; }
  if (typeof options.isHidden            !== "undefined") { this.isHidden_            = options.isHidden; }
  if (typeof options.visible             !== "undefined") { this.isHidden_            = !options.visible; }
  if (typeof options.enableEventPropagation !== "undefined") { this.enableEventPropagation_ = options.enableEventPropagation; }
  if (this.div_) { this.draw(); }
};

/**
 * Sets the content of the InfoBox.
 * @param {string|Node} content
 */
InfoBox.prototype.setContent = function (content) {
  this.content_ = content;
  if (this.div_) {
    if (this.closeListener_) {
      google.maps.event.removeListener(this.closeListener_);
      this.closeListener_ = null;
    }
    if (!this.fixedWidthSet_) { this.div_.style.width = ""; }

    if (typeof content.nodeType === "undefined") {
      this.div_.innerHTML = this.getCloseBoxImg_() + content;
    } else {
      this.div_.innerHTML = this.getCloseBoxImg_();
      this.div_.appendChild(content);
    }
    if (!this.fixedWidthSet_) {
      this.div_.style.width = this.div_.offsetWidth + "px";
      if (typeof content.nodeType === "undefined") {
        this.div_.innerHTML = this.getCloseBoxImg_() + content;
      } else {
        this.div_.innerHTML = this.getCloseBoxImg_();
        this.div_.appendChild(content);
      }
    }
    this.addClickHandler_();
  }
  google.maps.event.trigger(this, "content_changed");
};

/**
 * Sets the geographic location of the InfoBox.
 * @param {google.maps.LatLng} latlng
 */
InfoBox.prototype.setPosition = function (latlng) {
  this.position_ = latlng;
  if (this.div_) { this.draw(); }
  google.maps.event.trigger(this, "position_changed");
};

/**
 * Sets the zIndex of the InfoBox.
 * @param {number} index
 */
InfoBox.prototype.setZIndex = function (index) {
  this.zIndex_ = index;
  if (this.div_) { this.div_.style.zIndex = index; }
  google.maps.event.trigger(this, "zindex_changed");
};

/**
 * Shows or hides the InfoBox.
 * @param {boolean} isVisible
 */
InfoBox.prototype.setVisible = function (isVisible) {
  this.isHidden_ = !isVisible;
  if (this.div_) {
    this.div_.style.visibility = this.isHidden_ ? "hidden" : "visible";
  }
};

/** @returns {string|Node} The content of the InfoBox. */
InfoBox.prototype.getContent  = function () { return this.content_;  };
/** @returns {google.maps.LatLng} The position of the InfoBox. */
InfoBox.prototype.getPosition = function () { return this.position_; };
/** @returns {number|null} The zIndex of the InfoBox. */
InfoBox.prototype.getZIndex   = function () { return this.zIndex_;   };

/**
 * Returns a flag indicating whether the InfoBox is visible and placed on an active map.
 * @returns {boolean}
 */
InfoBox.prototype.getVisible = function () {
  if ((typeof this.getMap() === "undefined") || (this.getMap() === null)) {
    return false;
  }
  return !this.isHidden_;
};

/** Shows the InfoBox. */
InfoBox.prototype.show = function () {
  this.isHidden_ = false;
  if (this.div_) { this.div_.style.visibility = "visible"; }
};

/** Hides the InfoBox. */
InfoBox.prototype.hide = function () {
  this.isHidden_ = true;
  if (this.div_) { this.div_.style.visibility = "hidden"; }
};

/**
 * Opens the InfoBox on the given map, optionally anchored to a marker.
 * @param {google.maps.Map|google.maps.StreetViewPanorama} map
 * @param {google.maps.MVCObject} [anchor]
 */
InfoBox.prototype.open = function (map, anchor) {
  var me = this;
  if (anchor) {
    this.position_    = anchor.getPosition();
    this.moveListener_ = google.maps.event.addListener(
      anchor, "position_changed", function () {
        me.setPosition(this.getPosition());
      }
    );
  }
  this.setMap(map);
  if (this.div_) { this.panBox_(); }
};

/**
 * Removes the InfoBox from the map and cleans up all event listeners.
 */
InfoBox.prototype.close = function () {
  var i;
  if (this.closeListener_) {
    google.maps.event.removeListener(this.closeListener_);
    this.closeListener_ = null;
  }
  if (this.eventListeners_) {
    for (i = 0; i < this.eventListeners_.length; i++) {
      google.maps.event.removeListener(this.eventListeners_[i]);
    }
    this.eventListeners_ = null;
  }
  if (this.moveListener_) {
    google.maps.event.removeListener(this.moveListener_);
    this.moveListener_ = null;
  }
  if (this.contextListener_) {
    google.maps.event.removeListener(this.contextListener_);
    this.contextListener_ = null;
  }
  this.setMap(null);
};
