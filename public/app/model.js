var footer = `
<footer>
<p>
  © 2021 Keurig Green Mountain, Inc. - All Rights ReservedTerms of
  UsePrivacy PolicyModern Slavery Act
</p>
</footer>
`;

var MODEL = (function () {
  function _getPageContent(pageName, callback) {
    let pageInfo = `./pages/${pageName}/${pageName}.html`;
    $.get(pageInfo, (data) => {
      console.log(data);
      $("#app").html(data + footer);
      if (callback) {
        callback();
      }
    });
  }

  return {
    getPageContent: _getPageContent,
  };
})();

$("#app").click(function () {
  $(".pageLinks").css("left", -200);
});

$("a").click(function () {
  $(".pageLinks").css("left", -200);
});

$(".search").click(function () {
  $(".pageLinks").css("left", -200);
});
