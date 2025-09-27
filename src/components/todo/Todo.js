import getTemplate from "./template";
import DB from "../../DB";

export default class Todo {
  constructor(data) {
    this.id = data.id;
    this.content = data.content;
    this.completed = data.completed;
    this.createdAt = data.createdAt;
    this.domElt = null;
  }
  render() {
    const template = document.createElement("template");
    template.innerHTML = getTemplate(this);
    this.domElt = template.content.firstElementChild;
    this.initEvents();
    return this.domElt;
  }

  async toggleCompleted() {
    // Modifier dans le tableau
    this.completed = !this.completed;

    // Changer dans le DOM
    this.domElt.classList.toggle("completed");
    window.TodoList.renderItemsLeftCount();

    // Changer dans la DB
    return await DB.updateOne(this);
  }

  async update(data) {
    // Je modifie dans le tableau
    this.content = data;

    // Dans le DOM
    this.domElt.querySelector("label").innerText = this.content;
    this.domElt.classList.remove("editing");

    // Dans la DB
    return await DB.updateOne(this);
  }

  initEvents() {
    this.domElt.querySelector(".toggle").addEventListener("change", (e) => {
      this.toggleCompleted();
    });

    this.domElt.querySelector(".destroy").addEventListener("click", (e) => {
      window.TodoList.deleteOneById(this.id);
    });

    this.domElt.querySelector("label").addEventListener("dblclick", (e) => {
      this.domElt.classList.add("editing");
    });

    this.domElt.querySelector(".edit").addEventListener("change", (e) => {
      this.update(e.target.value);
    });
  }
}
