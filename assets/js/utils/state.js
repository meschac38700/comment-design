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

export const state = () => {
	return fetch(
		"http://127.0.0.1:8000/api/v1/comments?parent=true&sort=added:desc"
	)
		.then((response) => {
			console.log(response);
			if (!response.ok) {
				LOCAL_DATA.comments = { ...default_state };
				return default_state;
			}
			return response.json().then((data) => {
				LOCAL_DATA = data;
				return data;
			});
		})
		.catch((err) => {
			LOCAL_DATA.comments = { ...default_state };
			return default_state;
		});
};
