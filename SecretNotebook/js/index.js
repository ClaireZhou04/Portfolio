window.onload = function () {
  const tab_item = document.querySelectorAll(".tab_list a");
  const items = document.querySelectorAll(".item");
  items[0].style.display = "block";

  for (let i = 0; i < tab_item.length; i++) {
    tab_item[i].addEventListener("click", () => {
      for (let j = 0; j < items.length; j++) {
        items[j].style.display = "none";
      }
      items[i].style.display = "block";
    });
  }
};
