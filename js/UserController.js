(function(){

    // Create and prepare the 'users' module (with its controllers and dataservices)

    angular.module('users', [ 'ngMaterial' ])
        .controller('UserController', [
            'userService', '$mdSidenav', '$mdBottomSheet', '$log',
            UserController
        ])
        .service('userService', ['$q', UserService]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function UserController( userService, $mdSidenav, $mdBottomSheet, $log ) {
        var self = this;

        self.selected     = null;
        self.users        = [ ];
        self.selectUser   = selectUser;
        self.makeContact  = makeContact;
        self.toggleList   = toggleUsersList;

        // Load all registered users

        userService
            .loadAllUsers()
            .then( function( users ) {
                self.users    = [].concat(users);
                self.selected = users[0];
            });

        // *********************************
        // Internal methods
        // *********************************

        /**
         * Hide or Show the 'left' sideNav area
         */
        function toggleUsersList() {
            $mdSidenav('left').toggle();
        }

        /**
         * Select the current avatars
         * @param menuId
         */
        function selectUser ( user ) {
            self.selected =  user;
        }

        /**
         * Show the bottom sheet
         */
        function makeContact(selectedUser) {
            var appRoot = 'https://rawgit.com/angular/material-start/es5-tutorial/app/';

            $mdBottomSheet.show({
                controllerAs     : "vm",
                controller       : ContactSheetController,
                templateUrl      : 'bottomsheet.html',
                parent           : angular.element(document.getElementById('content'))
            });

            /**
             * Bottom Sheet controller for the Avatar Actions
             */
            function ContactSheetController( $mdBottomSheet ) {
                var rootURL = "https://rawgit.com/angular/material-start/es5-tutorial/app/assets/svg/";
                this.user = selectedUser;
                this.items = [
                    { name: 'Phone'       , icon: 'phone'       , icon_url: rootURL + 'phone.svg'},
                    { name: 'Twitter'     , icon: 'twitter'     , icon_url: rootURL + 'twitter.svg'},
                    { name: 'Google+'     , icon: 'google_plus' , icon_url: rootURL + 'google_plus.svg'},
                    { name: 'Hangout'     , icon: 'hangouts'    , icon_url: rootURL + 'hangouts.svg'}
                ];
                this.contactUser = function(action) {
                    // The actually contact process has not been implemented...
                    // so just hide the bottomSheet

                    $mdBottomSheet.hide(action);
                };
            }
        }

    }
})();

/**
 * Created by Ikzer on 25/02/2016.
 */
