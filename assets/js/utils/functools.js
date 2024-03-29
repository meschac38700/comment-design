import Comment from "../custom_elements/Comment.js";

export const loadingComments = (state) => {
	state.comments.forEach((comment_data) => {
		let parent_container = document.querySelector(".container .content");
		let date_added = new Date(comment_data.added);
		let parent_c = new Comment(
			`${comment_data.owner_fullname}`,
			comment_data.content,
			comment_data.votes,
			date_added,
			`comment_${date_added.getTime().toString()}`,
			true
		);
		parent_container.appendChild(parent_c);
		hide_or_add_show_answers(parent_c, comment_data.nb_children);
	});
};

/**
 * add click event handler
 * @param {HTMLElement} el
 */
export const addVoteHandler = (el) => {
	el.addEventListener("click", (e) => {
		e.preventDefault();
		e.stopPropagation();
		el.classList.toggle("voted");
		let nbrVote = 0;
		try {
			nbrVote = Number.parseInt(
				el.querySelector(".comment_vote_btn")?.textContent.trim()
			);
		} catch (error) {}
		el.querySelector(".comment_vote_btn").textContent = el.classList.contains(
			"voted"
		)
			? nbrVote + 1
			: nbrVote - 1;
	});
};

/**
 * handler to add comment
 */
export const addCommentHandler = (commentForm) => {
	commentForm.addEventListener("submit", (e) => {
		e.preventDefault();
		// TODO Only for dev env
		let date_added = new Date();

		let el = commentForm.querySelector(".new_parent_comment");
		if (el.value.trim() != "") {
			let c = new Comment(
				"John DOE",
				el.value,
				0,
				date_added,
				`comment_${date_added}`,
				true
			);
			document
				.querySelector(".container .content form.add_parent_comment")
				.after(c);
			el.value = "";
			// TODO INSERT INTO DATABASE THE CURRENT COMMENT CHILD
		}
	});
};

/****************  Get parentNode  ****************
 ******************************************************/
export function get_node(el, class_name = null, not = null) {
	class_name = class_name ? class_name : "comment_container";
	let selector =
		not !== null ? `.${class_name}:not(.${not})` : `.${class_name}`;
	let childElement = el.querySelector(selector);
	if (el.classList.contains(class_name) && !el.classList.contains(not))
		return el;
	else if (childElement) return childElement;
	return get_node(el.parentElement, class_name, not);
}

/****************  Manage hide/show child comment text  ****************
 ******************************************************/
export function hide_show_child_comment_text(el, nbr_children) {
	let node = get_node(el, "comment_element", "comment_child");
	let target_node = get_node(el, "comment_show_children_btn");
	if (node.classList.contains("show"))
		target_node.innerText = `Hide ${nbr_children} answers`;
	else target_node.innerText = `Show ${nbr_children} answers`;
}

/****************  Add child Comment  ****************
 ******************************************************/
export function add_child_comment(el) {
	// TODO Only for dev env
	let date_added = new Date();

	if (el.value.trim() !== "") {
		//let parent_el = this.get_node(el).querySelector(".comments_children_container");
		let parent_el = get_node(el, "comments_children_container");
		let c = new Comment(
			"John DOE",
			el.value,
			0,
			date_added,
			`comment_${date_added}`
		);
		parent_el.prepend(c);
		hide_or_add_show_answers(parent_el.parentElement);
		// TODO INSERT INTO DATABASE THE CURRENT COMMENT CHILD
	}
}

export function createFooterBtnAction(
	classes,
	icon_classes,
	title,
	svg,
	span_classes,
	span_text,
	comment_id = null
) {
	let el = document.createElement("DIV");
	el.setAttribute("class", classes);
	if (comment_id) el.setAttribute("data-comment", comment_id);
	let el_icon = document.createElement("DIV");
	el_icon.setAttribute("class", icon_classes);
	el_icon.setAttribute("title", title);
	if (Array.isArray(svg)) el_icon.innerHTML = svg.join(" ");
	else el_icon.innerHTML = svg;
	let el_span = document.createElement("SPAN");
	el_span.setAttribute("class", span_classes);
	el_span.innerHTML = span_text;
	el.appendChild(el_icon);
	el.appendChild(el_span);
	return el;
}
/**
 *	Manage button "show answers" or "hide answers"
 * @param {HTMLElement} parent_comment comment
 * @param {Number} nbr_children number children
 */
export function hide_or_add_show_answers(parent_comment, nbr_children = 0) {
	const already_has_btn = !!parent_comment.querySelector(
		".actions .comment_show_children_action"
	);
	console.log(nbr_children);
	if (nbr_children > 0) {
		let svg_icon_show = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="eye" class="show svg-inline--fa fa-eye fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"></path></svg>`;
		let svg_icon_hide = `<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="eye-slash" class="hide svg-inline--fa fa-eye-slash fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M634 471L36 3.51A16 16 0 0 0 13.51 6l-10 12.49A16 16 0 0 0 6 41l598 467.49a16 16 0 0 0 22.49-2.49l10-12.49A16 16 0 0 0 634 471zM296.79 146.47l134.79 105.38C429.36 191.91 380.48 144 320 144a112.26 112.26 0 0 0-23.21 2.47zm46.42 219.07L208.42 260.16C210.65 320.09 259.53 368 320 368a113 113 0 0 0 23.21-2.46zM320 112c98.65 0 189.09 55 237.93 144a285.53 285.53 0 0 1-44 60.2l37.74 29.5a333.7 333.7 0 0 0 52.9-75.11 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64c-36.7 0-71.71 7-104.63 18.81l46.41 36.29c18.94-4.3 38.34-7.1 58.22-7.1zm0 288c-98.65 0-189.08-55-237.93-144a285.47 285.47 0 0 1 44.05-60.19l-37.74-29.5a333.6 333.6 0 0 0-52.89 75.1 32.35 32.35 0 0 0 0 29.19C89.72 376.41 197.08 448 320 448c36.7 0 71.71-7.05 104.63-18.81l-46.41-36.28C359.28 397.2 339.89 400 320 400z"></path></svg>`;
		let children_action = createFooterBtnAction(
			"comment_actions comment_show_children_action",
			"icon comment_show_children_icon",
			"Comment show children icon",
			[svg_icon_show, svg_icon_hide],
			"comment_show_children_btn",
			`Show ${nbr_children} answer(s)`
		);
		children_action.addEventListener("click", function () {
			get_node(
				this.parentElement,
				"comment_element",
				"comment_child"
			).classList.toggle("show");
			hide_show_child_comment_text(this, nbr_children);
		});

		if (!already_has_btn) {
			parent_comment
				.querySelector(".comment_content_footer .actions")
				.insertBefore(
					children_action,
					parent_comment.querySelector(
						".comment_content_footer .actions .comment_delete_action"
					)
				);
		}
		return;
	} else {
		// remove btn if nbr_children less or equals to 0
		if (already_has_btn)
			parent_comment
				.querySelector(
					".comment_content_footer .actions .comment_show_children_action"
				)
				.remove();
		return;
	}
}
