class List {
  constructor(name) {
    this.name = name;
    this.elems = [];
  }
}

let lists = [];
const list = document.querySelector("#list");

/*let lists = [new List("1"), new List("2"), new List("3")];
for (let i = 0; i < lists.length; i++) {
  console.log(lists[i].name);
}

let first = new List("4");
let second = new List("5");
let third = new List("6");*/

document.querySelector("#app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a class="btn btn-danger" href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;
