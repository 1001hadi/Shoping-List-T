const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

function displayItems() {
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));
  resetUI();
}

function onAddItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  if (!newItem || newItem.length < 3) {
    alert("Please add an item");
    return;
  }

  addItemToDom(newItem);
  addItemToStorage(newItem);
  resetUI();

  itemInput.value = "";
}

function addItemToDom(item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);
  itemList.appendChild(li);
}

function createButton(classes) {
  const btn = document.createElement("button");
  btn.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  btn.appendChild(icon);
  return btn;
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  }
}

// removing item
function removeItem(item) {
  if (confirm("Are you sure?")) {
    item.remove();

    removItemFromStorage(item.textContent);

    resetUI();
  }
}

function removItemFromStorage(item) {
  let itemsFromStorage = getItemFromStorage();
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// clear all
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  localStorage.removeItem("items");
  resetUI();
}

// filter
function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLocaleLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// clear ui
function resetUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

function init() {
  itemForm.addEventListener("submit", onAddItem);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);
  resetUI();
}
init();
