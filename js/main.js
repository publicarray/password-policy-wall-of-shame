---
---
$.ajax({
    dataType: "json",
    url: '{{site.baseurl}}/search.json',
    success: processJson()
}).fail(function showAjaxErrorMessage(jqXHR) {
        var status = jqXHR.status + ' (' + jqXHR.statusText + ')';
        console.error('Unable to retrieve or parse \"'+this.url+'\" as '+this.dataType+'. [Search is disabled]', status);
        $('.ui.search').removeClass('loading');
        $('.ui.search .icon').removeClass('link');
        $('.ui.search .input').addClass('disabled');
    });

function processJson() {
    return function (data) {
        var searchBar = $('.ui.search');
        searchBar.search({
            source: data,
            searchFields: [
                'title',
            ],
        });
        searchBar.removeClass('loading');
    }
}
