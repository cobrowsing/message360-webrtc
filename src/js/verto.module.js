var app = angular.module("vertoApp", [
    "ngStorage",
    "ui.bootstrap",
    "ngAnimate",
    "ui.router",
    "vertoControllers",
    'pascalprecht.translate',
    'timer',
    "cgPrompt",
    'ngToast',
    'ngAudio',
    'ngCookies',
    'angularMoment'
]);

app.config(function ($stateProvider, $urlRouterProvider, $translateProvider) {
    $stateProvider
        .state("loading", {
            url: '/',
            templateUrl: 'src/views/partials/load_screen.html',
            controller: "loadScreenController",
            title: "Loading..."
        })
        .state("login", {
            url: "/login",
            templateUrl: "src/views/partials/login.html",
            controller: "loginController",
            title: "Welcome!"
        })
        .state("dashboard", {
            url: "/dashboard",
            templateUrl: "src/views/partials/dashboard.html",
            title: "Dashboard"
        });
    $urlRouterProvider.otherwise("/");
    $translateProvider
        .preferredLanguage('en')
        .determinePreferredLanguage()
        .fallbackLanguage('en')
        .useSanitizeValueStrategy(null);
});

app.config(["ngToastProvider", function (ngToastProvider) {
    ngToastProvider.configure({
        additionalClasses: "animated zoomInRight",
    });
}]);

/**
 * Customer filter to display formatted phone number
 * Returns a modified string
 */
app.filter("phoneFilter", function () {

    return function (tel) {
        if (!tel) {
            return '';
        }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});
app.run(function ($rootScope) {
    //TODO: Set the URL's for the helper library scripts.
    $rootScope.tokenUrl = '';
    $rootScope.fundUrl = '';
    $rootScope.numberUrl = '';
    window.onbeforeunload = function (e) {
        window.location.ref = "/";
    };
});