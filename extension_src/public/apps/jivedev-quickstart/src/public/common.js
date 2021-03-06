function getAddonURL() {
    if (typeof gala === "object"){
        return jive.tile.getAppURL();
    }

    var matches = window.location.href.match(/.*?[?&]url=([^&]+)%2F.*$/);
    if (matches.length == 2) {
        return decodeURIComponent(matches[1]);
    } else {
        showError('Could not parse addon URL from window location', window.location.href);
        return '';
    }
}

function getJiveURL() {
    if (typeof gala === "object"){
        return jive.tile.getJiveURL();
    }

    var href = getAddonURL();
    var JiveUrl = href.substring(0, href.indexOf('/resources/add-ons'));
    return JiveUrl;
}

function showError(error, extra) {
    extra = extra || '';
    osapi.jive.core.container.sendNotification(
        {
            "severity" : "error",
            "message": (i18n(error) || error) + extra
        }
    );
}

function showNotification(notice, extra) {
    extra = extra || '';
    osapi.jive.core.container.sendNotification(
        {
            "severity" : "info",
            "message": (i18n(notice) || notice) + extra
        }
    );
}

function extensionID() {
    return '8bbf11b7-45ff-5b3b-5cd4-ba108bfa8398';
}

function i18n(msg) {
    var prefs = new gadgets.Prefs();
    return prefs.getMsg(msg);
}

function randomString(len, chars) {
    var a = [];
    chars = chars || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var count = chars.length;
    for (var i = 0; i < len; i++) {
        a.push(chars.charAt(Math.floor(Math.random() * count)));
    }
    return a.join("");
}