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
    const id_thisElem = this.findElem(e.target.parentNode.firstChild.innerText);
    const id_prevElem = this.findElem(
      e.target.parentNode.previousSibling.firstChild.innerText
    );

    const temp = this.elems[id_thisElem];
    this.elems[id_thisElem] = this.elems[id_prevElem];
    this.elems[id_prevElem] = temp;

    this.viewElems();
  };

  downElem = (e) => {
    const id_thisElem = this.findElem(e.target.parentNode.firstChild.innerText);
    const id_nextElem = this.findElem(
      e.target.parentNode.nextSibling.firstChild.innerText
    );

    const temp = this.elems[id_thisElem];
    this.elems[id_thisElem] = this.elems[id_nextElem];
    this.elems[id_nextElem] = temp;

    this.viewElems();
  };

  removeElem = (e) => {
    this.elems.splice(
      this.findElem(e.target.parentNode.firstChild.innerText),
      1
    );
    e.target.parentNode.remove();
  };

  findElem(elem) {
    for (let i = 0; i < this.elems.length; i++) {
      if (this.elems[i].name == elem) {
        return i;
      }
    }
  }

  addSublist = (e) => {
    const new_sublist = new List(idSublist, "sublist" + idSublist++);
    const id_elem = this.findElem(e.target.parentNode.firstChild.innerText);

    this.elems[id_elem].sublist = new_sublist;

    console.log(e.target.parentNode.parentNode.id);
    addHtmlForUl(
      "list" + new_sublist.name,
      "addto" + new_sublist.name,
      "elemname" + new_sublist.name,
      "addbutton" + new_sublist.name,
      new_sublist.addElem,
      document.querySelector("#" + e.target.parentNode.id)
    );
    console.log(1);
  };

  deleteSublist = (e) => {
    const new_sublist = new List(idSublist, e.target.textContent + idSublist++);
    const id_elem = this.findElem(e.target.parentNode.firstChild.innerText);
  };

  addElem = (e) => {
    console.log("addElem ");
    const name = document.querySelector("#elemname" + this.name).value;
    const elem = new Elem(idElem++, name);
    this.elems.push(elem);

    addLiElem(elem, document.querySelector("#addto" + this.name), [
      this.upElem,
      this.downElem,
      this.removeElem,
      this.addSublist,
      this.deleteSublist
    ]);
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
        this.removeElem,
        this.addSublist,
        this.deleteSublist
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

  const span = document.createElement("span");
  span.textContent = item.name;

  const up = addButtonToLi(parentElem.id + item.name + "up", "Up", func[0]);
  const down = addButtonToLi(
    parentElem.id + item.name + "down",
    "Down",
    func[1]
  );
  const remove = addButtonToLi(
    parentElem.id + item.name + "remove",
    "Remove",
    func[2]
  );
  const addsublist = addButtonToLi(
    parentElem.id + item.name + "addsublist",
    "AddSublist",
    func[3]
  );
  const deletesublist = addButtonToLi(
    parentElem.id + item.name + "deletesublist",
    "DeleteSublist",
    func[4]
  );

  elem.appendChild(span);
  elem.appendChild(up);
  elem.appendChild(down);
  elem.appendChild(remove);
  elem.appendChild(addsublist);
  elem.appendChild(deletesublist);
  parentElem.insertBefore(elem, lastElem);
}

function addButtonToLi(id, text, func) {
  const button = document.createElement("button");
  button.id = id;
  button.textContent = text;
  button.onclick = func;
  return button;
}

let idList = 0;
let idElem = 0;
let idSublist = 0;
let lists = new Lists();

addHtmlForUl(
  "lists",
  "addtolist",
  "listname",
  "addbutton",
  lists.addNewList,
  document.querySelector("#for_list")
);
