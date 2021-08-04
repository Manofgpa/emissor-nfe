// Waits for the DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {

    const tbody = document.getElementById('ptbody')

    // Add product
    document.getElementById('addproduct').addEventListener('click', () => {
        // tbody = document.getElementById('ptbody')
        var node = tbody.rows[0].cloneNode(true)
        tbody.appendChild(node)
    })

    // Remove last product
    document.getElementById('removeproduct').addEventListener('click', () => tbody.deleteRow(1))

    // Update total price
    document.querySelector('#update_total').addEventListener('click', () => {
        const totalProd = document.getElementsByName('produtos_subtotal')
        const totalNf = document.getElementById('produtos_total_nota')
        totalNf.value = 0
        totalProd.forEach((value, i) => {
            totalNf.value = (Number(totalNf.value) + Number(totalProd[i].value)).toFixed(2)
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