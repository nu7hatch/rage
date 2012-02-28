window.Rage = (function(window, document) {
    Rage = {};
    navigator = window.navigator;
    navName = '';
    navVersion = '';
    
    /**
     * The list of required navigator versions.
     */
    Rage.requiredNavigators = {};

    /**
     * The list of required features.
     */
    Rage.requiredFeatures = [];

    /**
     * Parses user agent string to discover what browser and version
     * user is using to visit the website.
     */
    recognizeNavigator = function() {
        var navPtr = /(Safari|Firefox|Opera)\/([\d\.]+)/;
        var nav = navigator.appVersion.match(navPtr);
        if (nav.length == 0) {
            navPtr = /(MSIE) ([\d\.]+)/;
            nav = navigator.appVersion.match(navPtr);
        }
        navName = nav[1];
        navVersion = nav[2];
    };

    /**
     * Returns whether specified version is valid agains specified
     * requirements.
     */
    matchVersion = function(version) {
        var current = navVersion.split(".");
        var required = version.split(".");
        for (var i = 0; i < required.length; i++) {
            var r = parseInt(required[i]);
            var c = parseInt(current[i]);
            if (r < c) {
                break;
            } else if (r > c) {
                return false;
            }
        }
        return true;
    };

    /**
     * Returns whether user's browser type and version are valid to
     * visit the website.
     */
    matchNavigator = function(name, version) {
        if (navName != name) {
            return false;
        }
        return matchVersion(version);
    };

    /**
     * Validates user's browser against all the requirements specified
     * for the navigator type and version.
     */
    validateNavigator = function() {
        if (Rage.requiredNavigators.length == 0) {
            return true;
        }
        for (var name in Rage.requiredNavigators) {
            var version = Rage.requiredNavigators[navName];
            if (matchNavigator(name, version)) {
                return true;
            }
        }
        return false;
    };

    /**
     * Checks whether user's browser supports specified feature.
     */
    hasFeature = function(feature) {
        return !!Modernizr[feature];
    };

    /**
     * Validates user's browser against all the requirements specified
     * for the navigator features.
     */
    validateFeatures = function() {
        var missingFeatures = [];
        if (Rage.requiredFeatures.length > 0) {
            for (var i = 0; i < Rage.requiredFeatures.length; i++) {
                var feature = Rage.requiredFeatures[i];
                if (!hasFeature(feature)) {
                    missingFeatures.push(feature);
                }
            }
        }
        return missingFeatures;
    };

    /**
     * Public: Validates all the things!
     */
    Rage.validate = function() {
        recognizeNavigator();
        if (!validateNavigator()) {
            document.write('invalid navigator');
            return;
        }
        var missingFeatures = validateFeatures();
        if (missingFeatures.length > 0) {
            document.write('missing features: ' + missingFeatures.toString());
        }
    };
    
    return Rage;
})(this, this.document);