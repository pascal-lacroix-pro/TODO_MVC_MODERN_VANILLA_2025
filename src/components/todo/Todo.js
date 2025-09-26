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
  render(el) {
    const template = document.createElement("template");
    template.innerHTML = getTemplate(this);
    this.domElt = template.content.firstElementChild;
    this.initEvents();
    el.append(this.domElt);
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

  initEvents() {
    this.domElt.querySelector(".toggle").addEventListener("change", (e) => {
      this.toggleCompleted();
    });
  }
}
