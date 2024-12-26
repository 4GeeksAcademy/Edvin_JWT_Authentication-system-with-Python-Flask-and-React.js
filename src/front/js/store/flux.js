const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {

			register: async (formData) =>{
				try{

					const resp = await fetch('https://glorious-system-pjg6pjp4pqqx2r5p4-3001.app.github.dev/api/register', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(formData)
					})
					if (!resp.ok) throw new Error('Something went wrong')
						const data = await resp.json()
						localStorage.setItem('token', data.token)
						setStore({token: data.token, auth: true})
						console.log(data)
						return true
				}catch(error){
						console.log(error)
						return false
				}
			},
			login: async (formData) =>{
				try{

					const resp = await fetch('https://glorious-system-pjg6pjp4pqqx2r5p4-3001.app.github.dev/api/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(formData)
					})
					if (!resp.ok) throw new Error('Something went wrong')
						const data = await resp.json()
						localStorage.setItem('token', data.token)
						console.log(data)
						return true
				}catch(error){
						console.log(error)
						return false
				}
			},

			checkUser: async () => {
				try {
					const resp = await fetch('https://glorious-system-pjg6pjp4pqqx2r5p4-3001.app.github.dev/api/protected', {
						headers: {
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						}
					})
					if (!resp.ok) throw new Error('Something went wrong')
					if (resp.status !== 200) throw new Error('Something went wrong')

					const data = await resp.json()
					console.log(data)
					setStore({token:data.token, auth: true, user: data.user})
					return true
				} catch (error) {
					console.log(error)
						return false
				}
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
