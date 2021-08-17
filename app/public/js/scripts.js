// Waits for the DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {

    const tbody = document.getElementById('ptbody'),
        productInput = document.getElementsByClassName('product_input')

    // Add product
    document.getElementById('addproduct').addEventListener('click', () => {
        // tbody = document.getElementById('ptbody')
        const node = tbody.rows[0].cloneNode(true)
        tbody.appendChild(node)
    })

    // Remove last product
    document.getElementById('removeproduct').addEventListener('click', () => tbody.deleteRow(1))

    // Clear all values
    document.getElementById('clear_values').addEventListener('click', () => Array.from(productInput).forEach((input) => input.value = ''))

    // Update total price
    document.querySelector('#update_total').addEventListener('click', () => {
        const totalProd = document.getElementsByName('produtos_subtotal')
        const totalNf = document.getElementById('produtos_total_nota')
        totalNf.value = 0
        totalProd.forEach((value, i) => {
            totalNf.value = (Number(totalNf.value) + Number(totalProd[i].value)).toFixed(2)
        })
    })

    // Via CEP autocomplete

    document.getElementById('cliente_cep').addEventListener('change', () => {

        const userCep = document.getElementById('cliente_cep').value.replace('-', ''),
            viaCepUrl = 'https://viacep.com.br/ws/',
            returnFormat = '/json/',
            userInfoArray = [
                document.getElementById('cliente_endereco'),
                document.getElementById('cliente_complemento'),
                document.getElementById('cliente_cidade'),
                document.getElementById('cliente_bairro'),
                document.getElementById('cliente_uf')
            ]

        fetch(viaCepUrl + userCep + returnFormat)
            .then((res) => res.json())
            .then((data) => {

                if (data.erro === true) {

                    alert('O CEP informado não é válido.')
                    userInfoArray.forEach(element => {
                        element.value = ''
                    })
                }
                else {

                    document.getElementById('cliente_endereco').value = data.logradouro
                    document.getElementById('cliente_complemento').value = data.complemento
                    document.getElementById('cliente_cidade').value = data.localidade
                    document.getElementById('cliente_bairro').value = data.bairro
                    document.getElementById('cliente_uf').value = data.uf
                }
            })
    })
})

// Update subtotal products
const updateSubTotal = () => {
    const totalProd = document.getElementsByName('produtos_subtotal')
    const quantity = document.getElementsByName('produtos_quantidade')
    const price = document.getElementsByName('produtos_preco')
    totalProd.forEach((value, i) => {
        totalProd[i].value = (Number(quantity[i].value) * Number(price[i].value)).toFixed(2)
    })
}