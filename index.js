const itemsHolder = document.querySelector(".items");
const loader = document.querySelector(".loader");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const paginationItemsHolder = document.querySelector(".p_items");

const quotes = [];
const pagination = {
  page: 1,
  totalPages: 1,
};

function gRandomColor() {
  return Math.trunc(Math.random() * 256);
}
function generateColor() {
  return `rgba(${gRandomColor()},${gRandomColor()},${gRandomColor()})`;
}

async function fetchData(page = 1, limit = 10) {
  try {
    const resp = await fetch(
      `https://quotable.io/quotes?limit=${limit}&page=${page}`,
      {
        method: "GET",
      }
    );
    const data = await resp.json();
    //console.log(data);
    pagination.page = data.page;
    pagination.totalPages = data.totalPages;

    const transformedData = data.results.map((item) => {
      return {
        _id: item._id,
        author: item.author,
        content: item.content,
        tags: item.tags,
        colors: [generateColor(), generateColor(), generateColor()],
      };
    });
    quotes.push(...transformedData);
    displayQuotes();
  } catch (error) {
    console.log("Error Occurred");
    alert(
      "An error occurred while fetching the quotes. Please try again later"
    );
  }
}

function displayQuotes() {
  const elements = quotes.map((quote) => {
    const li = document.createElement("li");
    li.classList.add("item");

    li.style.background = `linear-gradient(to bottom right, ${quote.colors.join(
      ","
    )})`;
    const headerDiv = document.createElement("div");
    headerDiv.classList.add("item_header");

    const tagsHolder = document.createElement("p");
    tagsHolder.classList.add("item_tags");
    tagsHolder.innerHTML = quote.tags.join(", ");

    headerDiv.appendChild(tagsHolder);

    const itemBody = document.createElement("div");
    itemBody.classList.add("item_body");

    const itemContent = document.createElement("div");
    itemContent.classList.add("item_content");

    const contentHolder = document.createElement("h3");
    contentHolder.innerHTML = quote.content;

    itemContent.appendChild(contentHolder);
    itemBody.appendChild(itemContent);

    const authorHolder = document.createElement("p");
    authorHolder.innerHTML = quote.author;

    itemBody.appendChild(authorHolder);

    li.append(headerDiv, itemBody);
    return li;
  });

  itemsHolder.innerHTML = "";
  itemsHolder.append(...elements);
  displayPagination();
  loader.classList.remove("show");
}

function displayPagination() {
  console.log(pagination);
  const { page, totalPages } = pagination;
  let toRight = 3;
  let toLeft = 3;
  if (page === 1) {
    toRight += toLeft;
    toLeft = 0;
  } else if (page === totalPages) {
    toLeft += toRight;
    toRight = 0;
  }
  const leftItems = [];
  for (let i = toLeft; i >= 1; i--) {
    leftItems.push(generateItem(page - i));
  }
  const rightItems = [];
  for (let i = 1; i <= toRight; i++) {
    rightItems.push(generateItem(page + i));
  }
  const activeElement = generateItem(page, true);
  activeElement.classList.add("active");
  const completeItems = [...leftItems, activeElement, ...rightItems];
  paginationItemsHolder.innerHTML = "";
  paginationItemsHolder.append(...completeItems);
}

function generateItem(num, current = false) {
  const el = document.createElement("li");
  const btn = document.createElement("button");
  if (!current) {
    el.addEventListener("click", () => {
      fetchData(num);
      loader.classList.add("show");
    });
  }

  btn.innerHTML = num;
  el.appendChild(btn);
  return el;
}

prevBtn.onclick = () => {
  fetchPage("prev");
};
nextBtn.onclick = () => {
  fetchPage();
};

function fetchPage(type) {
  loader.classList.add("show");
  fetchData(type == "prev" ? pagination.page - 1 : pagination.page + 1);
}

window.addEventListener("DOMContentLoaded", () => {
  fetchData();
});
