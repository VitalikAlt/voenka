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

                // this.addTitle = addTitle;
                // this.addItemRow = addItemRow;
                // this.getTitles = getTitles;
                // this.getRows = getRows;


            }

            Helper.prototype.addTitle = function(name, options) {
                this.titles.push({ name: name, options: options });
            }

            Helper.prototype.addItemRow = function(row) {
                this.list.push(row);
                var displayedRow = [];
                for (var i = 0; i < this.titles.length; i++) {
                    displayedRow.push(row[this.titles[i].options.label] || '-');
                    // this.displayed.push(row[this.titles[i].options.label]);
                }
                this.displayed.push(displayedRow);
            }

            Helper.prototype.getTitles = function() {
                return this.titles.map(function(title) {
                    return title.name;
                });
            }

            Helper.prototype.getRows = function() {
                return this.displayed;
            }

            return {
                getInstance: function(queryOptions) {
                    return new Helper(queryOptions);
                }
            }
        });
})();