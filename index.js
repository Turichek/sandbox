class List {
  constructor(id, name) {
    this.id = id;
    this.isSelect = false;
    this.name = name;
    this.elems = [];
  }
}

class Elem {
  constructor(name) {
    this.name = name;
    this.sublist = null;
  }
}

class Lists {
  constructor() {
    this.selectedList = -1;
    this.lists = [];
  }

  Select = (e) => {
    for (let i = 0; i < this.lists.length; i++) {
      /*console.log(this.selectedList);
      console.log(e.target);
      console.log(e.target.id);*/

      if (e.target.id == i) {
        this.lists[i].isSelect = true;
        this.selectedList = i;
      } else this.lists[i].isSelect = false;

      //console.log(this.lists);
    }
  };

  AddNewList = (e) => {
    const name = document.querySelector("#listname").value;

    if (name !== "") {
      const list = new List(idList++, name);
      this.lists.push(list);

      addLi(list, document.querySelector("#addlist"), 1);

      if (this.lists.length === 1) {
        this.lists[0].isSelect = true;
        this.selectedList = 0;
      }

      console.log(this.lists);
    }
  };
}

function addHtmlForUl(ul_name, li_name, input_name, button_name) {
  return (
    `<ul id="` +
    ul_name +
    `" class="m-0 p-2">
    <li id="` +
    li_name +
    `" class="p-1">
      <div>
        <input id="` +
    input_name +
    `" type="text" />
        <button id="` +
    button_name +
    `">Add</button>
      </div>
    </li>
  </ul>`
  );
}

function addLi(list, lastElem, toWhat) {
  const parentElem = lastElem.parentNode;
  const elem = document.createElement("li");

  switch (toWhat) {
    case 1:
      elem.id = list.id;
      elem.textContent = list.name;
      elem.addEventListener("click", lists.Select);
      parentElem.insertBefore(elem, lastElem);
      break;

    case 2:
      elem.id = list.id;
      elem.addEventListener("click", lists.Select);

      parentElem.insertBefore(elem, lastElem);
      break;

    default:
      break;
  }
}

let idList = 0;
let lists = new Lists();

function getElems() {}

/*let lists = [new List("1"), new List("2"), new List("3")];
for (let i = 0; i < lists.length; i++) {
  console.log(lists[i].name);
}*/

document.querySelector("#for_list").innerHTML = addHtmlForUl(
  "lists",
  "addlist",
  "listname",
  "addlistbutton"
);
document
  .querySelector("#addlistbutton")
  .addEventListener("click", lists.AddNewList);
