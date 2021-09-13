import AlertMessage from "./AlertMessage.js";
import { ACTION_COMMENT } from "../utils/const.js";
import { hide_or_add_show_answers } from "../utils/functools.js";

export default class ConfirmModal extends HTMLElement {
	constructor(message = null, delete_text = null, cancel_text = null) {
		super();

		message = message ? message : this.getAttribute("message");
		delete_text = delete_text ? delete_text : this.getAttribute("delete_text");
		cancel_text = cancel_text ? cancel_text : this.getAttribute("cancel_text");

		let modal = `
        <div class="confirm_delete">
            <div class="confirm_delete_container">
                <div class="content">
                    ${message}
                </div>
                <div class="actions">
                </div>
            </div>
        </div>
        `;
		let delete_btn = document.createElement("BUTTON");
		delete_btn.setAttribute("class", "delete");
		delete_btn.innerHTML = delete_text ? delete_text : "Delete";

		delete_btn.addEventListener("click", (e) => {
			e.preventDefault();
			document
				.querySelector("#custom_element_confirm_modal .confirm_delete")
				.classList.remove("show");
			// Delete comment
			let parent = ACTION_COMMENT.comment_to_delete.parentElement;
			parent.removeChild(ACTION_COMMENT.comment_to_delete);
			ACTION_COMMENT.comment_to_delete = null;
			document.body.appendChild(new AlertMessage("Commentaire a été supprimé"));
			// remove show children btn if no child in the node
			if (
				parent.classList.contains("comments_children_container") &&
				parent.childElementCount === 0
			) {
				hide_or_add_show_answers(parent.parentElement);
			}
		});
		let cancel_btn = document.createElement("BUTTON");
		cancel_btn.setAttribute("class", "cancel");
		cancel_btn.innerHTML = cancel_text ? cancel_text : "Cancel";
		cancel_btn.addEventListener("click", (e) => {
			e.preventDefault();
			document
				.querySelector("#custom_element_confirm_modal .confirm_delete")
				.classList.remove("show");
		});
		this.innerHTML = modal;
		this.querySelector(".actions").appendChild(delete_btn);
		this.querySelector(".actions").appendChild(cancel_btn);
	}
}
customElements.define("confirm-modal", ConfirmModal);
