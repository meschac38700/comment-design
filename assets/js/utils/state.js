import { loadingComments } from "./functools.js";

const default_state = {
	success: true,
	previous: null,
	next: null,
	comments: [
		{
			id: 1,
			added: "2020-07-15T00:00:00Z",
			edited: "2021-09-11T18:20:56.879132+00:00",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ratione omnis alias magnam? Consectetur, dignissimos!",
			top_parent_id: null,
			user_id: 1,
			parent_id: null,
			votes: 10,
			nb_children: 0,
			owner_fullname: "Frederic doefr",
		},
		{
			id: 2,
			added: "2020-07-15T14:23:04Z",
			edited: "2020-07-11T18:20:56.879132+00:00",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ratione omnis alias magnam?",
			top_parent_id: null,
			user_id: 1,
			parent_id: null,
			votes: 10,
			nb_children: 0,
			owner_fullname: "Aymen doeay",
		},
		{
			id: 1,
			added: "2020-07-16T00:00:00Z",
			edited: "2020-07-11T18:20:56.879132+00:00",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ratione omnis alias magnam?",
			top_parent_id: null,
			user_id: 1,
			parent_id: null,
			votes: 10,
			nb_children: 0,
			owner_fullname: "Jeremy doeje",
		},
		{
			id: 1,
			added: "2020-07-16T00:00:00Z",
			edited: "2020-07-11T18:20:56.879132+00:00",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ratione omnis alias magnam?",
			top_parent_id: null,
			user_id: 1,
			parent_id: null,
			votes: 10,
			nb_children: 0,
			owner_fullname: "Thierry doeth",
			votes: 1,
			author__last_name: "Doe",
			added: "2020-07-16T00:00:00Z",
			id: 8,
			content: "Last comment on the first parent comment",
		},
	],
};

export let LOCAL_DATA = {
	next: null,
	previous: null,
	comments: [],
	success: false,
};

/**
 *	make request to load fake data
 * @returns {Promise}
 */
function requestLoadFakeData(url) {
	return fetch(url ?? "http://127.0.0.1:8000/data").then((response) =>
		response.json()
	);
}
/**
 *	make request to get fake data
 * @returns {Promise}
 */
function requestGetFakeData(url) {
	console.log("--->", url);
	return fetch(
		url ?? "http://127.0.0.1:8000/api/v1/comments?parent=true&sort=added:desc"
	).then((response) => response.json());
}

/**
 * Initialize state data
 * @returns {Promise}
 */
export const initState = (url = null) => {
	return requestGetFakeData(url)
		.then((data) => {
			if (!data.success) {
				return requestLoadFakeData(url).then((res) => {
					if (res.success) {
						return requestGetFakeData(url).then((data) => {
							LOCAL_DATA = data;
							return data;
						});
					} else {
						LOCAL_DATA = default_state;
						return default_state;
					}
				});
			} else {
				LOCAL_DATA = data;
				return data;
			}
		})
		.catch((err) => {
			LOCAL_DATA = default_state;
			return default_state;
		});
};

/**
 * loading more comment handler
 * @param {ClickEvent} e
 */
export const loadMoreComment = () => {
	let once = true;
	console.log("OK");
	window.onscroll = function (ev) {
		console.log("OK");

		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			// you're at the bottom of the page
			console.log("OK ok", once, LOCAL_DATA.next);

			if (LOCAL_DATA.next !== null && once) {
				initState(`http://127.0.0.1:8000${LOCAL_DATA.next}`)
					.then((data) => {
						loadingComments(data);
					})
					.catch((err) => {
						console.log(err);
					});
				once = false;
			}
		} else once = true;
	};
};
