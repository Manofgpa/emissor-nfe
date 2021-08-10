

document.addEventListener('DOMContentLoaded', () => {
    const usersUrl = "https://api.github.com/users/"
    const repos = "/repos?per_page=100"
    const repositorios = document.getElementById('rep')

    const resetData = () => {
        repositorios.textContent = ""
        document.getElementById("foto").setAttribute("src", "")
        document.getElementsByClassName('rep')[0].style.display = "none"
        document.getElementById('name').style.display = "none"
        document.getElementById('dados').style.display = "none"
    }

    document.getElementById('user').addEventListener('change', () => {

        repositorios.textContent = ""
        fetch(usersUrl + user.value)
            .then((res) => res.json())
            .then((data) => {
                if (data.message == 'Not Found') {
                    const user = document.getElementById('user').value
                    user !== '' ? document.getElementById('span').textContent = `Usuário "${user}" não existe, favor informar usuário correto.` : document.getElementById('span').textContent = "Favor informar usuário."
                     
                    resetData()
                    
                }
                else {
                    document.getElementById('span').textContent = ''
                    document.getElementById("foto").setAttribute("src", data.avatar_url)
                    document.getElementById('dados').style.display = "block"
                    document.getElementsByClassName('rep')[0].style.display = "flex"
                    document.getElementById('name').textContent = data.name
                    document.getElementById('name').style.display = "flex"
                    document.getElementById('repdata').textContent = data.public_repos
                }
            })
            .catch((err) => console.log(err))

        fetch(usersUrl + user.value + repos)
            .then((res) => res.json())
            .then((data) => {
                data.forEach((rep) => {
                    const li = document.createElement('li')
                    li.textContent = rep.name
                    repositorios.append(li)
                })
            })
    })
})