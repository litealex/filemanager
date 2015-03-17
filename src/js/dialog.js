(function () {
    'use strict';
    angular.module('fm')
        .directive('fmDialog', ['$compile', '$parse', '$http', 'fmConfig', fmDialog]);

    function fmDialog($compile, $parse, $http, fmConfig) {
        var $body = angular.element(document.body),
            getOffset = function (domElement) {
                var top = 0, left = 0;
                while (domElement) {
                    if (!isNaN(domElement.offsetTop)) {
                        top += domElement.offsetTop;
                    }
                    if (!isNaN(domElement.offsetLeft)) {
                        left += domElement.offsetLeft;
                    }
                    domElement = domElement.offsetParent;
                }

                return {
                    top: top,
                    left: left
                };
            };

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    var $dialog = angular.element('<div style="display: none;" class="fm-dialog"></div>'),
                        offset = getOffset(element[0]),
                        dialogScope = scope.$new();

                    angular.extend(dialogScope, {
                        close: function () {
                            $dialog.remove();
                            //dialogScope.$destroy();
                            dialogScope = null;
                            $dialog = null;
                        }
                    });

                    if (attrs.fmDialogData) {
                        dialogScope.data = $parse(attrs.fmDialogData)(scope);
                    }


                    $http
                        .get(fmConfig.getTemplateUrl(attrs.fmDialog), {cache: true})
                        .success(function (html) {
                            $dialog.html(html);
                            $body.append($dialog);
                            $compile($dialog)(dialogScope);
                            $dialog[0].style.cssText = 'left:' + offset.left + 'px;top:' + offset.top + 'px;';
                        });

                });
            }
        }
    }
}());