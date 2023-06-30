const menuBtn = document.querySelector(".n2_menu_btn");
const navigation = document.querySelector(".n2_navigation");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navigation.classList.toggle("active");
});
const btns = document.querySelectorAll(".n2_nav_btn");
const slides = document.querySelectorAll(".n2_video");
const contents = document.querySelectorAll(".n2_content");
let x, i, j, l, ll, selElmnt, a, b, c;

const initSelect = () => {
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt?.length;

    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);

    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {

      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {

        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {

      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
}

function closeAllSelect(elmnt) {

  let x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}


document.addEventListener("click", closeAllSelect);

const buttonSearch = document.getElementById("button-search")

const initSelectLocation = () => {
  const select = document.createElement("select")
  select.id = "location-select"
  const defaultOption = document.createElement("option")
  defaultOption.value = ""
  defaultOption.innerText = "Nơi khởi hành"
  select.appendChild(defaultOption)

  const customSelect = document.getElementById("location-start")

  fetch(`https://api-c4e.onrender.com/travel/location`).then(result => {
    const finalResult = result.json().then(data => {
      for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option")
        option.value = data[i].slug
        option.innerText = data[i].location
        select.appendChild(option)
      }
      customSelect.appendChild(select)
      initSelect()
    })
  })
}


const fetchDataAndAppendToPage = () => {
  const container = document.getElementById("n2_container")
  container.innerHTML = ""

  const locationStart = document.getElementById("location-select")?.value || ""
  const price = document.getElementById("select-price").value || ""
  const result = fetch(`https://api-c4e.onrender.com/travel?price=${price}&location=${locationStart}`).then((data) => {
    const returnData = data.json().then(finalResult => {
      console.log(finalResult)
      for (let i = 0; i < finalResult.length; i++){
        const div = ` <div class="n2_container_items"> <a href="./tour.html"> <img  class="n2_img" src="${finalResult[i].image}">
        <h2>${finalResult[i].name}...</h2>
        <p>Khởi hành tại ${finalResult[i].location}</p> <h5><img src="./image/money.png" class="n2_star">
         Chi phí: ${finalResult[i].price}đ </h5> </a></div>`

         container.innerHTML += div
      }
    })
  })
}

initSelectLocation()
fetchDataAndAppendToPage()

buttonSearch.onclick = fetchDataAndAppendToPage

