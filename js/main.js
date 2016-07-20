---
---
// $.getJSON("{{site.baseurl}}/search.json", processJson());
$.ajax({
    dataType: "json",
    url: '{{site.baseurl}}/search.json',
    success: processJson()
}).done(function(jqXHR) {
    console.log("second success", jqXHR.status);
  })
  .fail(function(jqXHR) {
    console.log("error", jqXHR.status);
  })
  .always(function(jqXHR) {
    console.log("complete", jqXHR.status);
  });

function processJson() {
    return function (data) {
        console.log(data);
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
