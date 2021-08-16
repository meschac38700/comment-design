import state from "./utils/state.js";
import ConfirmModal from "./custom_elements/ConfirmModal.js";
import Comment from "./custom_elements/Comment.js";
import {
	hide_or_add_show_children_btn,
	addCommentHandler,
	loadingComment,
} from "./utils/functools.js";

/****************  Add Comment  ****************
 ******************************************************/
let commentForm = document.querySelector("form.add_parent_comment");
addCommentHandler(commentForm);

// Loading server comments
loadingComment(state);

hide_or_add_show_children_btn();
