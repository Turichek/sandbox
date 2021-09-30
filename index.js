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
    try {
      const id_prevElem = this.findElem(
        this.nameElem(e.target.parentNode.previousSibling)
      );
      this.moveElem(id_prevElem, e);
    } catch (e) {
      alert("Этот элемент нельзя поднять выше по списку");
    }
  };

  downElem = (e) => {
    const id_nextElem = this.findElem(
      this.nameElem(e.target.parentNode.nextSibling)
    );
    this.moveElem(id_nextElem, e);
  };

  removeElem = (e) => {
    this.elems.splice(this.findElem(this.nameElem(e.target.parentNode)), 1);
    viewElems(
      document.querySelector("#" + e.target.parentNode.parentNode.id),
      this
    );
  };

  addSublist = (e) => {
    const new_sublist = new List(
      idSublist++,
      e.target.parentNode.id + "sublist"
    );
    const id_elem = this.findElem(this.nameElem(e.target.parentNode));

    if (this.elems[id_elem].sublist == null) {
      this.elems[id_elem].sublist = new_sublist;
      viewElems(
        document.querySelector("#" + e.target.parentNode.parentNode.id),
        this
      );
    } else alert("У этого элемента уже есть дочерний список");
  };
  
  deleteSublist = (e) => {
    const id_elem = this.findElem(this.nameElem(e.target.parentNode));

    if (this.elems[id_elem].sublist != null) {
      this.elems[id_elem].sublist = null;
      viewElems(
        document.querySelector("#" + e.target.parentNode.parentNode.id),
        this
      );
    } else alert("У этого элемента нет дочернего списка");
  };

  addElem = (e) => {
    const name = document.querySelector("#elemname" + this.name).value;
    const elem = new Elem(idElem++, name);
    this.elems.push(elem);

    viewElems(
      document.querySelector("#" + e.target.parentNode.parentNode.id),
      this
    );
  };

  moveElem(id_Elem, e) {
    if (id_Elem == undefined || id_Elem == null) {
      alert("Этот элемент нельзя опустить ниже по списку");
    } else {
      const id_thisElem = this.findElem(this.nameElem(e.target.parentNode));
      const temp = this.elems[id_thisElem];
      this.elems[id_thisElem] = this.elems[id_Elem];
      this.elems[id_Elem] = temp;

      viewElems(
        document.querySelector("#" + e.target.parentNode.parentNode.id),
        this
      );
    }
  }

  nameElem(e) {
    const str = e.firstChild.innerText + e.firstChild.nextSibling.innerText;
    return str;
  }

  findElem(elem) {
    for (let i = 0; i < this.elems.length; i++) {
      if (this.elems[i].name + this.elems[i].id == elem) {
        return i;
      }
    }
  }
}

class Lists {
  constructor() {
    this.selectedListId = -1;
    this.lists = [];
  }

  Select = (e) => {
    for (let i = 0; i < this.lists.length; i++) {
      if (e.target.id == this.lists[i].name) {
        this.selectedListId = i;
      }
    }
    viewElems(
      document.querySelector("#for_elems"),
      this.lists[this.selectedListId]
    );
  };

  addNewList = (e) => {
    const name = document.querySelector("#listname").value;

    if (name !== "") {
      const list = new List(idList++, name);
      this.lists.push(list);

      addLiList(list, document.querySelector("#addtolist"));
      this.selectedListId = list.id;
      viewElems(document.querySelector("#for_elems"), list);
    }
  };
}

function viewElems(elem, list) {
  deleteViewElems(elem);
  if (
    document.querySelector("#" + elem.id) == null &&
    elem.id == "list" + list.name.replace("sublist", "")
  ) {
    elem = document.querySelector("#for_elems");
  } else if (
    document.querySelector("#" + elem.id) == null &&
    elem.id == "list" + list.name
  ) {
    elem = document.querySelector(
      "#" + list.name.replace(new RegExp("sublist" + "$"), "")
    );
  }

  addHtmlForUl(
    "list" + list.name,
    "addto" + list.name,
    "elemname" + list.name,
    "addbutton" + list.name,
    list.addElem,
    elem
  );

  for (let i = 0; i < list.elems.length; i++) {
    const hideButton = [];

    if (list.elems[i] == list.elems[0]) {
      hideButton.push("upElem");
    }
    if (list.elems[i] == list.elems[list.elems.length - 1]) {
      hideButton.push("downElem");
    }
    if (list.elems[i].sublist != null) {
      hideButton.push("addSublist");
    } else {
      hideButton.push("deleteSublist");
    }

    addLiElem(
      list.elems[i],
      document.querySelector("#addto" + list.name),
      [
        list.upElem,
        list.downElem,
        list.removeElem,
        list.addSublist,
        list.deleteSublist
      ],
      hideButton
    );
    if (list.elems[i].sublist != null) {
      const liForSublist = document.querySelector(
        "#" +
          list.elems[i].sublist.name.replace(new RegExp("sublist" + "$"), "")
      );
      viewElems(liForSublist, list.elems[i].sublist);
    }
  }
}

function deleteViewElems(elem) {
  if (elem.lastChild != null) {
    if (elem.lastChild.tagName == "BUTTON") {
    } else if (elem.lastChild.tagName == "LI") {
      elem.remove();
    } else if (elem.firstChild) {
      elem.firstChild.remove();
    }
  } else if (elem.firstChild) {
    elem.firstChild.remove();
  }
}

function addHtmlForUl(ul_id, li_id, input_id, button_id, func, parentElem) {
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  const input = document.createElement("input");
  const button = addButtonToLi(button_id, "Add Element", func, "btn-warning");

  ul.id = ul_id;
  ul.classList.add("m-0", "p-2", "b1");

  li.id = li_id;
  li.classList.add("p-2", "d-flex");

  input.id = input_id;
  input.type = "text";
  input.classList.add("form-control", "w-250px");

  li.appendChild(input);
  li.appendChild(button);
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

function addLiElem(item, lastElem, func, hide) {
  const parentElem = lastElem.parentNode;
  const elem = document.createElement("li");
  const span = document.createElement("span");
  const span_hide = document.createElement("span");
  const up = addButtonToLi(
    parentElem.id + item.name + item.id + "up",
    "Up",
    func[0],
    "btn-warning"
  );
  const down = addButtonToLi(
    parentElem.id + item.name + item.id + "down",
    "Down",
    func[1],
    "btn-warning"
  );
  const remove = addButtonToLi(
    parentElem.id + item.name + item.id + "remove",
    "Remove",
    func[2],
    "btn-danger"
  );
  const addsublist = addButtonToLi(
    parentElem.id + item.name + item.id + "addsublist",
    "Add Sublist",
    func[3],
    "btn-primary"
  );
  const deletesublist = addButtonToLi(
    parentElem.id + item.name + item.id + "deletesublist",
    "Delete Sublist",
    func[4],
    "btn-danger"
  );
  const buttons = [up, down, remove, addsublist, deletesublist];

  elem.id =
    parentElem.id + item.name.replace(new RegExp(" ", "g"), "") + item.id;

  span.textContent = item.name;

  span_hide.classList.add("dNone");
  span_hide.textContent = item.id;

  for (let i = 0; i < hide.length; i++) {
    for (let j = 0; j < buttons.length; j++) {
      if (hide[i] == buttons[j].onclick.name) {
        buttons[j].classList.add("dNone");
      }
    }
  }

  elem.appendChild(span);
  elem.appendChild(span_hide);
  elem.appendChild(up);
  elem.appendChild(down);
  elem.appendChild(remove);
  elem.appendChild(addsublist);
  elem.appendChild(deletesublist);
  parentElem.insertBefore(elem, lastElem);
}

function addButtonToLi(id, text, func, clas) {
  const button = document.createElement("button");

  button.id = id;
  button.textContent = text;
  button.classList.add("btn", clas, "b1", "mx-1");
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
