import createProductID from './createProductID.js'


export default (data) => {

    // Transform products to array if not yet.
    if (!Array.isArray(data.produtos_quantidade)) {
        data.produtos_nome = [data.produtos_nome]
        data.produtos_unidade = [data.produtos_unidade]
        data.produtos_quantidade = [data.produtos_quantidade]
        data.produtos_preco = [data.produtos_preco]
    }

    // Creates array of products    
    let produtos = []
    const productsIDs = createProductID(data.produtos_nome.length)

    data.produtos_nome.forEach((item, i) => {
        produtos[i] = {
            id: productsIDs[i],
            name: data.produtos_nome[i],
            quantidade: data.produtos_quantidade[i],
            preco: data.produtos_preco[i],
            unidade: data.produtos_unidade[i]
        }
    })

    return data = {
        ...data,
        produtos
    }
}