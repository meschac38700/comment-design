import { initState } from "./utils/state.js";
import ConfirmModal from "./custom_elements/ConfirmModal.js";
import {
	hide_or_add_show_answers,
	addCommentHandler,
	loadingComments,
} from "./utils/functools.js";

/****************  Add Comment  ****************
 ******************************************************/
const commentForm = document.querySelector("form.add_parent_comment");
addCommentHandler(commentForm);

// Loading server comments
initState()
	.then((data) => {
		loadingComments(data);
	})
	.catch((err) => {
		console.log(err);
	});
