(function () {
    'use strict';
    angular.module('fm')
        .value('fmConfig', {
            templatesPrefix: '',
            actionsUrl: '',
            getTemplateUrl: function (template) {
                return this.templatesPrefix + template + '.html';
            },
            init: function (staticPrefix, actionsUrl) {
                this.actionsUrl = actionsUrl;
                this.templatesPrefix = staticPrefix + '/templates/';
                this.extensionPrefix512 = staticPrefix + '/img/512px/';
                this.extensionPrefix32 = staticPrefix + '/img/32px/';
            },
            imgExtensions: ['jpg', 'gif', 'png', 'jpeg', 'bmp', 'svg'],
            extensionPrefix512: '',
            extensionPrefix32: '',
            viewType: 'list'
        });
}());