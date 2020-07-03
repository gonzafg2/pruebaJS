const base_url = 'http://localhost:3000';

let form = document.getElementById('new_user')
form.addEventListener('submit', function(event) {
   event.preventDefault()
   console.log("click");
   const email = document.querySelector('#new-mail').value;
   const password = document.querySelector('#new-pass').value;
   const name = document.querySelector('#new-name').value;
   const lastname = document.querySelector('#new-lastname').value;

    const data = {
        email,
        password,
        name,
        lastname
    };
    newUser(data);
})

const newUser = async (data) => {
    try {
        const resp = await axios.post(`${base_url}/users/`, data);
        if(resp.data) {
            //data exist
            if(resp.data.length !== 0 ) { //vanilla JS
                window.location.href = '/';
                
            }
        }
    } catch (e) {
        console.error(e);
    }
}
// Desafío 1 ->
const getUsers = async () => {
}

getUsers();