class Elem {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.sublist = null;
  }
}

class List {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.elems = [];
  }

  upElem = (e) => {
    console.log(e.target.parentNode.previousSibling);
  };

  downElem = (e) => {
    console.log(e.target.parentNode.nextSibling);
    e.target.parentNode.insertBefore(e.target, e.target.parentNode.firstChild);
  };

  removeElem = (e) => {
    for (let i = 0; i < this.elems.length; i++) {
      if (
        this.elems[i].name ==
        e.target.parentNode.innerText.replace("UpDownRemove", "")
      ) {
        this.elems.splice(i, i);
        break;
      }
    }
    e.target.parentNode.remove();
    console.log(this.elems);
  };

  addElem = (e) => {
    const name = document.querySelector("#elemname" + this.name).value;
    const elem = new Elem(idElem++, name);
    this.elems.push(elem);

    addLiElem(elem, document.querySelector("#addto" + this.name), [
      this.upElem,
      this.downElem,
      this.removeElem
    ]);
    console.log("addElem " + document.querySelector("#for_elems").firstChild);
  };

  viewElems() {
    console.log(this.name + " viewElems");
    deleteViewElems();
    addHtmlForUl(
      "list" + this.name,
      "addto" + this.name,
      "elemname" + this.name,
      "addbutton" + this.name,
      this.addElem,
      document.querySelector("#for_elems")
    );
    for (let i = 0; i < this.elems.length; i++) {
      console.log(1);
      addLiElem(this.elems[i], document.querySelector("#addto" + this.name), [
        this.upElem,
        this.downElem,
        this.removeElem
      ]);
    }
  }
}

class Lists {
  constructor() {
    this.selectedListId = -1;
    this.lists = [];
  }

  Select = (e) => {
    console.log("selList" + this.selectedListId);
    for (let i = 0; i < this.lists.length; i++) {
      if (e.target.id == this.lists[i].name) {
        this.selectedListId = i;
      }
    }
    this.lists[this.selectedListId].viewElems();

    console.log(this.lists);
  };

  addNewList = (e) => {
    const name = document.querySelector("#listname").value;

    if (name !== "") {
      const list = new List(idList++, name);
      this.lists.push(list);

      addLiList(list, document.querySelector("#addtolist"));
      deleteViewElems();
      addHtmlForUl(
        "list" + list.name,
        "addto" + list.name,
        "elemname" + list.name,
        "addbutton" + list.name,
        list.addElem,
        document.querySelector("#for_elems")
      );

      this.selectedListId = list.id;
    }
  };
}

function deleteViewElems() {
  console.log("deleteViewElems");
  console.log(document.querySelector("#for_elems").firstChild);

  if (document.querySelector("#for_elems").firstChild) {
    document.querySelector("#for_elems").firstChild.remove();
  }
}

function addHtmlForUl(ul_id, li_id, input_id, button_id, func, parentElem) {
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  const div = document.createElement("div");
  const input = document.createElement("input");
  const button = document.createElement("button");

  ul.id = ul_id;
  ul.classList.add("m-0", "p-2");
  ul.name = ul_id.replace("list", "");

  li.id = li_id;
  li.classList.add("p-1");

  input.id = input_id;
  input.type = "text";

  button.id = button_id;
  button.onclick = func;
  button.textContent = "Add";

  div.appendChild(input);
  div.appendChild(button);
  li.appendChild(div);
  ul.appendChild(li);
  parentElem.appendChild(ul);

  /*return (
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
  );*/
}

function addLiList(item, lastElem) {
  const parentElem = lastElem.parentNode;
  const elem = document.createElement("li");
  elem.id = item.name;
  elem.textContent = item.name;
  elem.onclick = lists.Select;
  parentElem.insertBefore(elem, lastElem);
}

function addLiElem(item, lastElem, func) {
  const parentElem = lastElem.parentNode;
  const elem = document.createElement("li");

  elem.id = parentElem.id + item.name;
  elem.textContent = item.name;

  const up = document.createElement("button");
  up.id = parentElem.id + item.name + "up";
  up.textContent = "Up";
  up.onclick = func[0];

  const down = document.createElement("button");
  down.id = parentElem.id + item.name + "down";
  down.textContent = "Down";
  down.onclick = func[1];

  const remove = document.createElement("button");
  remove.id = parentElem.id + item.name + "remove";
  remove.textContent = "Remove";
  remove.onclick = func[2];

  elem.appendChild(up);
  elem.appendChild(down);
  elem.appendChild(remove);
  parentElem.insertBefore(elem, lastElem);
}

let idList = 0;
let idElem = 0;
let lists = new Lists();

/*let lists = [new List("1"), new List("2"), new List("3")];
for (let i = 0; i < lists.length; i++) {
  console.log(lists[i].name);
}*/

addHtmlForUl(
  "lists",
  "addtolist",
  "listname",
  "addbutton",
  lists.addNewList,
  document.querySelector("#for_list")
);

//document.querySelector("#addbutton").onclick = ;
