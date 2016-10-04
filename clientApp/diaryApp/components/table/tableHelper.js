(function() {
    'use strict';
    angular
        .module('app.table')
        .factory('tableHelper', function() {
            var Helper = function (queryOptions) {
                // Список заголовков (название, отображение, ...)
                this.titles = [];
                // Список всех строк таблицы
                this.list = [];
                // Список отображаемых (прошедших фильтр) строк (массив строк)
                this.displayed = [];
                // Фильтр для отсечения лишних строк/заголовков
                this.filter = {
                    textQuery: '',
                    options: {}
                };
            }

            // Добавление заголовков
            Helper.prototype.addTitle = function(name, options) {
                this.titles.push({ name: name, options: options });
            }

            // Добавление строки
            Helper.prototype.addItemRow = function(row) {
                this.list.push(row);
                var displayedRow = [];
                for (var i = 0; i < this.titles.length; i++) {
                    //displayedRow.push(row[this.titles[i].options.label] || '-');
                   
                    var currentValue = {};
                    currentValue.value = row[this.titles[i].options.label];
                    currentValue.options = this.titles[i].options;
                    currentValue.options.titleName = this.titles[i].name;
                    displayedRow.push(currentValue || '');
                }
                this.displayed.push(displayedRow);
            }

            // Получение заголоков
            Helper.prototype.getTitles = function() {
                return this.titles.map(function(title) {
                    return title.name;
                });
            }

            // Получение строк
            Helper.prototype.getRows = function() {
                return this.displayed;
            }

            // Очистить список строк
            Helper.prototype.clearList = function() {
                this.list = [];
                this.displayed = [];
            }

            // Очистить список заголовков
            Helper.prototype.clearHeaders = function() {
                this.titles = [];
            }

            return {
                getInstance: function(queryOptions) {
                    return new Helper(queryOptions);
                }
            }
        });
})();