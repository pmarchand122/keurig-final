var MODEL = (function () {
  function _getPageContent(pageName, callback) {
    let pageInfo = `./pages/${pageName}/${pageName}.html`;
    $.get(pageInfo, (data) => {
      console.log(data);
      $("#app").html(data);
      if (callback) {
        callback();
      }
    });
  }

  return {
    getPageContent: _getPageContent,
  };
})();
