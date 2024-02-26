const head = document.createElement("div");
head.setAttribute("id", "page-header");
document.body.append(head);
const header = `<h1 id = "title"> PAGINATION </h1>
                <p id = "description" >Note : Here you can see the dynamic and responsive table with information </p>
`;
head.innerHTML = header;
const container = document.createElement("div");
container.setAttribute("class", "table-responsive");
document.body.append(container);

const tableContent = document.createElement("div");
tableContent.setAttribute("class", "table-container");
container.append(tableContent);
const table = document.createElement("table");
table.setAttribute("class", "table  table-bordered");
table.setAttribute("id", "table");
container.append(table);

const tableHead = document.createElement("thead");
table.append(tableHead);

const arr = ["ID", "NAME", "EMAIL"];

for (const val of arr) {
  const tableHeader = document.createElement("th");
  tableHeader.innerHTML = val;
  tableHead.append(tableHeader);
}
let tableBody = document.createElement("tbody");
tableBody.setAttribute("id", "table-data");
table.append(tableBody);

const pageNavFooter = document.createElement("div");
pageNavFooter.setAttribute("class", "footer");
document.body.append(pageNavFooter);

const pageNavigation = document.createElement("div");
pageNavigation.setAttribute("id", "buttons");
pageNavigation.setAttribute("class", "d-flex justify-content-center");
pageNavFooter.append(pageNavigation);

function createTableRow(id, name, email) {
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  td1.innerHTML = id;
  td2.innerHTML = name;
  td3.innerHTML = email;
  tr.append(td1);
  tr.append(td2);
  tr.append(td3);
  tableBody.append(tr);
}

let URL =
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json";
let request = new XMLHttpRequest();
request.open("GET", URL);
request.send();
request.onload = function () {
  let tableContent = JSON.parse(this.response);
  // console.log(tableContent);
  let state = {
    queryset: tableContent,
    page: 1,
    rows: 10,
    window: 10,
  };

  buildTable();
  function pagination(queryset, page, rows) {
    let trimStart = (page - 1) * rows;
    let trimEnd = trimStart + rows;
    let trimedData = queryset.slice(trimStart, trimEnd);
    let pages = Math.ceil(tableContent.length / rows);
    return {
      queryset: trimedData,
      pages: pages,
    };
  }

  function pageButtons(pages) {
    let ss = document.getElementById("buttons");
    ss.innerHTML = "";
    let maxLeft = state.page - Math.floor(state.window / 2);
    let maxRight = state.page + Math.floor(state.window / 2);
    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = state.window;
    }
    if (maxRight > pages) {
      maxLeft = pages - (state.window - 1);
      maxRight = pages;
      if (maxLeft < 1) {
        maxLeft = 1;
      }
    }
    for (let page = maxLeft; page <= maxRight; page++) {
      ss.innerHTML += `<button value="${page}" class="page">${page}</button>`;
    }
    if (state.page !== 1) {
      ss.innerHTML =
        `<button value=${1} class="page">&#171; First</button>` + ss.innerHTML;
    }
    if (state.page != pages) {
      ss.innerHTML += `<button value = ${pages} class="page">Last &#187;</button>`;
    }
    let dd = document.getElementById("buttons");
    dd.addEventListener("click", function (e) {
      document.getElementById("table-data").innerHTML = "";
      state.page = Number(e.target.value);
      buildTable();
      handleActivePageNumber();
    });
  }
  function buildTable() {
    let data = pagination(state.queryset, state.page, state.rows);
    let array = data.queryset;
    for (let i = 0; i < array.length; i++) {
      createTableRow(array[i].id, array[i].name, array[i].email);
    }
    pageButtons(data.pages);
  }
  const handleActivePageNumber = () => {
    document.querySelectorAll(".page").forEach((button) => {
      button.classList.remove("active");
      const pageIndex = Number(button.getAttribute("value"));
      if (pageIndex == currentPage) {
        button.classList.add("active");
      }
    });
  };
};
