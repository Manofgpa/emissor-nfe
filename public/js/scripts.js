

const addProduct = (id) => {
    var x = document.getElementById(id)  
    var node = x.rows[0].cloneNode(true)
    x.appendChild(node)
}

const removeProduct = (id) => document.getElementById(id).deleteRow(1)

const updateTotal = () => {

}