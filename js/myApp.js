var app=angular.module('myApp',['LocalStorageModule','xeditable']);
app.run(function(editableOptions) {
		editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
