function route() {
  let pageID = window.location.hash;
  let ID = pageID.replace("#/", "");
  if (ID == "") {
    MODEL.getPageContent("home");
  } else {
    MODEL.getPageContent(ID);
  }
}

function initListeners() {
  $(window).on("hashchange", route);
  route();
}

$(document).ready(function () {
  initListeners();
  try {
    let app = firebase.app();
    //initFirebase();
  } catch {
    console.log(e);
    console.log(errorMessage);
  }
});
