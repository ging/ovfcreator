/*jslint nomen: true*/
/*global _*/
var Utils = Utils || {};

Utils.compare = function(str1, test) {
    var str2 = Utils.getFile("/static/tests/" + test);

    assert.equal(str1, str2);
};

Utils.template = function (tmpl_name, tmpl_data) {
    if ( !Utils.template.tmpl_cache ) { 
        Utils.template.tmpl_cache = {};
    }

    if ( ! Utils.template.tmpl_cache[tmpl_name] ) {
        var tmpl_dir = '/static/templates';
        var tmpl_url = tmpl_dir + '/' + tmpl_name;

        var tmpl_string = Utils.getFile(tmpl_url);
        

        Utils.template.tmpl_cache[tmpl_name] = _.template(tmpl_string);
    }

    return Utils.template.tmpl_cache[tmpl_name](tmpl_data);
};

Utils.getFile = function (tmpl_url) {
    var tmpl_string;
    $.ajax({
            url: tmpl_url,
            method: 'GET',
            async: false,
            success: function(data) {
                tmpl_string = data;
            }
        });
    return tmpl_string;
};