export default [
	{
		children: [],
		parent: {
			author__first_name: "Frederic",
			author__username: "doefr",
			nbr_vote: 0,
			author__last_name: "Doe",
			added: "2020-07-15T00:00:00Z",
			id: 7,
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ratione omnis alias magnam? Consectetur, dignissimos!",
		},
	},
	{
		children: [
			{
				author__first_name: "Aymen",
				author__username: "doeay",
				nbr_vote: 0,
				author__last_name: "Doe",
				added: "2020-07-15T14:23:04Z",
				id: 4,
				content:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ratione omnis alias magnam?",
			},
			{
				author__first_name: "Jeremy",
				author__username: "doeje",
				nbr_vote: 0,
				author__last_name: "Doe",
				added: "2020-07-16T00:00:00Z",
				id: 3,
				content:
					"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ratione omnis alias magnam?",
			},
			{
				author__first_name: "Thierry",
				author__username: "doeth",
				nbr_vote: 1,
				author__last_name: "Doe",
				added: "2020-07-16T00:00:00Z",
				id: 8,
				content: "Last comment on the first parent comment",
			},
		],
		parent: {
			author__first_name: "Eliam",
			author__username: "doeel",
			nbr_vote: 3,
			author__last_name: "Doe",
			added: "2020-07-15T14:20:46Z",
			id: 1,
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ratione omnis alias magnam? Consectetur, dignissimos! Officia debitis iste libero omnis porro facilis architecto! Officia corrupti cum vitae laborum minus exerci",
		},
	},
];
