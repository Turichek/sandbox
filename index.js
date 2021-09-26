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
    this.html = `
    <ul id="lists" class="m-0 p-2">
      <li id="addlist" class="p-1">
        <div>
          <input id="listname" type="text" />
          <button id="addlistbutton">Add</button>
        </div>
      </li>
    </ul>`;
  }

  Select = (e) => {
    for (let i = 0; i < this.lists.length; i++) {
      console.log(this.selectedList);
      console.log(e.target);
      console.log(e.target.id);

      if (e.target.id == i) {
        this.lists[i].isSelect = true;
        this.selectedList = i;
      } else this.lists[i].isSelect = false;
      console.log(this.lists);
    }
  };

  AddNewList = (e) => {
    const lastElem = document.querySelector("#addlist");
    const parentElem = lastElem.parentNode;
    const name = document.querySelector("#listname").value;

    if (name !== "") {
      const list = new List(idList++, name);
      this.lists.push(list);
      const elem = document.createElement("li");
      elem.id = list.id;
      elem.textContent = list.name;
      elem.addEventListener("click", this.Select);

      parentElem.insertBefore(elem, lastElem);

      if (this.lists.length === 1) {
        this.lists[0].isSelect = true;
        this.selectedList = 0;
      }

      console.log(this.lists);
    }
  };
}

let idList = 0;
let lists = new Lists();

function getElems() {}

/*let lists = [new List("1"), new List("2"), new List("3")];
for (let i = 0; i < lists.length; i++) {
  console.log(lists[i].name);
}*/

document.querySelector("#for_list").innerHTML = lists.html;
document
  .querySelector("#addlistbutton")
  .addEventListener("click", lists.AddNewList);
