/*
	jamie.js
	Main site script
  Jamie Lievesley Website
	Jamie Lievesley (jamie@jamiegl.co.uk)
	20 February 2017 21:45
*/

import Stickyfill from "stickyfilljs";

var HEADER_IMAGE_HEIGHT = 228;
var MOBILE_NAV_ITEM_HEIGHT = 48;
var NAV_SCROLL_SECTION_ZONE = 100;
var NAV_SCROLL_BOTTOM_ZONE = 30;

/**
 * Handles parallax scrolling of the header background image.
 * Triggered on scroll.
 */
function positionHeaderImage() {
  var $header = $("header");
  var height = $header.outerHeight();
  var centred = (height - HEADER_IMAGE_HEIGHT) / 2.0;
  var scrollOffset = $(window).scrollTop();
  var top = (0 + scrollOffset) / 2.0;
  $header.css("background-position", "center " + top + "px");
}

/**
 * Sets the currently highlighted nav tab/menu-item
 * for the current section that is within the viewport.
 * Triggered on scroll.
 */
function updateNavBar() {
  var scrollOffset = $(window).scrollTop();
  // Remove current selections
  $("nav li").removeClass("selected");

  // Catch header still in view
  var height = $("header").outerHeight();
  var $summary = $("#summary");
  if (scrollOffset <= height) {
    // Select "Menu" menu-item (on mobile, or none on desktop)
    selectNavItem($("#tab-menu"));
    return;
  }

  // If scrolled to (near) very bottom, use bottom nav item
  if (
    scrollOffset + $(window).height() >
    $(document).height() - NAV_SCROLL_BOTTOM_ZONE
  ) {
    selectNavItem($("nav li:last-of-type"));
    return;
  }

  // Find furthest section that has been scrolled beyond the top
  var scrolledNavLink = null;
  $("nav li:not(#tab-header) a").each(function () {
    var section = $(this).attr("href");
    var sectionOffset = $(section).offset().top;
    if (scrollOffset < sectionOffset - NAV_SCROLL_SECTION_ZONE) {
      return false; // Break out of each
    }
    scrolledNavLink = this;
  });
  // Now select that item
  if (scrolledNavLink !== null) {
    selectNavItem($(scrolledNavLink).parents("li"));
  } else {
    // Below header, but above sections
    // Select Header/Logo menu-item (on mobile, or none on desktop)
    selectNavItem($("#tab-header"));
  }
}
function selectNavItem($navItem) {
  $navItem.addClass("selected");
  var navItemOffset = $navItem.index() * MOBILE_NAV_ITEM_HEIGHT;
  $("nav ul").css({ "margin-top": -1 * navItemOffset + "px" });
}

/**
 * Triggered onload from article container with right-floated image that
 * needs a minimum height set dynamically based upon the nested image's height
 * (which will vary by image), as right-floated content has no blocking height.
 * @param aContainer The container element of the right-floated image.
 */
function fitImgRight(aContainer) {
  var $container = $(aContainer);
  // Measure required height
  var imgHeight = $container.find("img.right").height();
  //imgHeight += 60; // Top+bottom padding of 30px each
  var prefix = "";
  var suffix = "px";
  if ($container.children().first().is("h2")) {
    // Has heading above image
    imgHeight += 15; // Margin below heading
    prefix = "calc(";
    suffix += " + 1.5em)"; // Text size of heading
  }
  // Set minimum height for container
  $container.css({ "min-height": prefix + imgHeight + suffix });
}

/**
 * Generically submits a form to a server-script with loading and error handling.
 * @param aFormId The element ID of the form to submit.
 */
function submitForm(aFormId) {
  var $form = $("#" + aFormId);
  var $container = $form.parents(".container-form");
  var $spinner = $("#container-form-loading-" + aFormId);
  var $success = $("#container-form-success-" + aFormId);
  var $fail = $("#container-form-fail-" + aFormId);

  // Allow :invalids to be shown
  $form.addClass(".form-show-errors");

  // Hide form and show loading spinner
  $form.css({ visibility: "hidden" });
  $spinner.removeClass("hidden");

  // Remove previous error messages
  $form.find(".form-error-msg").remove();
  $form.find("*").removeClass("form-error-mark");

  // Asynchronously submit the form
  $.ajax({
    type: $form.attr("method"),
    url: $form.attr("action"),
    data: $form.serialize(),
    cache: false,
    dataType: "xml",
  })
    .done(function (aData) {
      // Parse loaded content
      var $xml = $(aData);
      var success = $xml.find("success").html() == "true";
      if (success) {
        // Show success message
        //$container.addClass("hidden");
        $success.removeClass("hidden");
      } else {
        // Show returned error message
        var valid = $xml.find("valid").html() == "true";
        var errorMsg = $xml.find("error_msg").html();
        // Create error message element
        var $errorMsgEl = $("<span></span>")
          .addClass("form-error-msg")
          .html(errorMsg);
        if (!valid) {
          var errorItem = $xml.find("error_item").html();
          // Append error message with form item
          var $errorItemEl = $form.find('*[name="' + errorItem + '"]');
          // Catch error item doesn't exist
          if ($errorItemEl.length) {
            var id = $errorItemEl.attr("id");
            var $label = $('label[for="' + id + '"]');
            // Strip off label text from start of error message (removes text duplication)
            var labelText = $label.html().trim().toLowerCase();
            if (errorMsg.toLowerCase().startsWith(labelText)) {
              errorMsg = errorMsg.slice(labelText.length);
              $errorMsgEl.html(errorMsg);
            }
            // Now actually append
            $label.append($errorMsgEl);
            // Mark item as having error
            $errorItemEl.addClass("form-error-mark");
          } else {
            // Append error message above submit button
            $form.find(".container-submit").before($errorMsgEl);
          }
        } else {
          // Append error message above submit button
          $form.find(".container-submit").before($errorMsgEl);
        }
        // Show form again
        $form.css({ visibility: "" });
      }
    })
    .fail(function (xhr, status, error) {
      // Debug
      console.log(error);
      console.log(status);
      try {
        var jsonResponseText = $.parseJSON(xhr.responseText);
        console.log(jsonResponseText.Message);
      } catch (err) {
        console.log(xhr.responseText);
      }
      // Show fail message
      //$container.addClass("hidden");
      $fail.removeClass("hidden");
    })
    .always(function () {
      // Hide loading spinner
      $spinner.addClass("hidden");
    });
} // END FUNCTION submitForm

$(function () {
  // Header parallax scrolling
  $(window).scroll(positionHeaderImage);
  positionHeaderImage();

  // Nav menu position:sticky polyfill
  Stickyfill.add($("nav"));

  // Floated right image blocking height
  $("#container-main")
    .find('*[data-fitimgright="true"]')
    .each(function () {
      fitImgRight(this);
    });

  // Clicking the header removes the hash and scrolls to the top
  $("#container-header-brand > *, #tab-header")
    .css({ cursor: "pointer" })
    .on("click", function () {
      history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
      $("html, body").animate({ scrollTop: 0 });
      return false;
    });

  // Clicking a nav item unexpands the nav and scrolls smoothly to relevant section
  $("nav a").on("click", function () {
    $("#nav-control-cb").prop("checked", false);

    if ($(this).attr("id") !== "tab-header") {
      // Header already handled above
      var section = $(this).attr("href");
      var scroll = $(section).offset().top - 25;
      history.pushState("", document.title, section);
      $("html, body").animate({ scrollTop: scroll + "px" });
      return false;
    }
  });

  // Scrolling the page automatically highlights the current nav tab
  $(window).scroll(updateNavBar);
  updateNavBar();

  // Jamie image expand
  var $img = $("#about img");
  $("#expandable-about-controlcb").on("change", function () {
    var expanded = $(this).is(":checked");
    $img.toggleClass("expanded", expanded);
    // Page resize could alter selected nav item
    setTimeout(updateNavBar, 251);
  });

  // Optional fields hide optional bg when non-empty
  $(".form-mark-optionals")
    .find("input:not([required])")
    .on("keyup keypress change focus blur", function () {
      $(this).toggleClass("form-hideoptional", !!$(this).val());
    });

  // Click anywhere on project
  $(".container-grid a *").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).parents("a").get(0).click();
    return false;
  });

  // Konami code or shrek+enter loads JamieGl Memes
  if (window.addEventListener) {
    var kkeys = [],
      konami = "38,38,40,40,37,39,37,39,66,65";
    var shrek = "83,72,82,69,75,13";
    window.addEventListener(
      "keydown",
      function (e) {
        kkeys.push(e.keyCode);
        if (
          kkeys.toString().indexOf(konami) >= 0 ||
          kkeys.toString().indexOf(shrek) >= 0
        ) {
          kkeys = [];
          window.location.href = "http://memes.jamiegl.com";
        }
      },
      true
    );
  }
});
