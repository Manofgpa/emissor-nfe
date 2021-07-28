

const addProduct = (id) => {
    var x = document.getElementById(id)
    var node = x.rows[0].cloneNode(true)
    x.appendChild(node)
}

const removeProduct = (id) => document.getElementById(id).deleteRow(1)

// update sub total price inputs values
const updateSubTotal = () => {

    const totalProd = document.getElementsByName('produtos_total')
    const quantity = document.getElementsByName('produtos_quantidade')
    const price = document.getElementsByName('produtos_preco')
    totalProd.forEach((value, i) => {
        totalProd[i].value = (Number(quantity[i].value) * Number(price[i].value)).toFixed(2)
    })
}

const updateTotal = () => {
    const totalProd = document.getElementsByName('produtos_total')
    const totalNf = document.getElementById('produtos_total_nota')
    totalNf.value = 0
    totalProd.forEach((value, i) => {
        totalNf.value = (Number(totalNf.value) + Number(totalProd[i].value)).toFixed(2)
    })
}