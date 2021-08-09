import joi from 'joi'


// Joi validation
export default (data) => {

    const schema = joi.object({
        data_nf: joi.date(),
        tipo_operacao: joi.string(),
        tipo_cliente: joi.string(),
        cliente_nome_completo: joi.string().min(3).max(40).required(),
        cliente_cpf: joi.number().required(),
        cliente_ie: joi.string(),
        consumidor_final: joi.number().max(1).min(1),
        cliente_cep: joi.number().required(),
        cliente_endereco: joi.string().required(),
        cliente_numero: joi.number().max(10).required(),
        cliente_complemento: joi.string().max(30),
        cliente_bairro: joi.string().max(30).required(),
        cliente_cidade: joi.string().max(30).required(),
        cliente_uf: joi.string().alphanum().min(2).max(2).required(),
        cliente_email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br', 'edu'] } }),
        cliente_telefone: joi.number().required(),
        produtos_nome: joi.array().items(joi.string().required()),
        produtos_unidade: joi.array().items(joi.string().required()),
        produtos_quantidade: joi.array().items(joi.number().required()),
        produtos_preco: joi.array().items(joi.number().required()),
        pagamento: joi.string(),
        valor_pagamento: joi.number(),
        modalidade_frete: joi.string(),
        forma_envio: joi.string(),
        total_frete: joi.string(),
        valor_seguro: joi.number(),
        peso_bruto: joi.number(),
        peso_liquido: joi.number(),
        placa_veiculo: joi.string(),
        marca: joi.string(),
        numeracao: joi.number(),
        lacres: joi.string(),
        numNf: joi.number(),
        forma_pagamento: joi.string(),
        totalNFQuantity: joi.number(),
        totalNFPrice: joi.number(),
        formattedHour: joi.string(),
        formattedDate: joi.string()
    })

    return schema.validate(data, { abortEarly: false })
}

