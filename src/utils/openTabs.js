
 // quoting  from  https://www.w3schools.com/howto/howto_js_tabs.asp
const openTab = (evt, tabName) => {

  // Get all elements with class="tabcontent" and hide them
  const tabContent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  // Get all elements with class="tab-links" and remove the class "active"
  const tabLinks = document.getElementsByClassName("tab-links");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  if (tabName == `isToday`) {
    document.getElementById(tabName).style.display = "flex";
  }
  else {
    document.getElementById(tabName).style.display = "block";
  }
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();