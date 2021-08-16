import state from "./utils/state.js";
import ConfirmModal from "./custom_elements/ConfirmModal.js";
import {
	hide_or_add_show_children_btn,
	addCommentHandler,
	loadingComments,
} from "./utils/functools.js";

/****************  Add Comment  ****************
 ******************************************************/
const commentForm = document.querySelector("form.add_parent_comment");
addCommentHandler(commentForm);

// Loading server comments
loadingComments(state);

hide_or_add_show_children_btn();
