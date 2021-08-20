import joi from 'joi'


const schema = joi.object({
    data_nf: joi.any().allow(''),
    tipo_operacao: joi.string().required()
        .messages({
            'any.required': 'O campo "Natureza de Operação" é obrigatório'
        }),
    tipo_cliente: joi.string(),
    cliente_nome_completo: joi.string()
        .min(3)
        .max(100)
        .required()
        .pattern(new RegExp(/^[a-zA-Z\s]*$/))
        .messages({
            'string.pattern.base': 'O campo "Nome" deve conter apenas letras e espaço.',
            'string.empty': 'O campo "Nome" não pode estar vazio.',
            'string.min': 'O campo "Nome" deve conter no mínimo {#limit} caracteres.',
            'any.required': 'O campo "Nome" é obrigatório.'
        }),
    cliente_cpf: joi.string()
        .required()
        .min(14)
        .max(18)
        .messages({
            'string.pattern.base': 'O campo "CPF / CNPJ" deve conter apenas números e espaço.',
            'string.empty': 'O campo "CPF / CNPJ" é obrigatório.',
            'string.required': 'O campo "CPF / CNPJ" é obrigatório.',
            'string.base': 'O campo "CPF / CNPJ" deve conter apenas números.'
        }),
    cliente_ie: joi.any().allow(''),
    consumidor_final: joi.number().allow('')
        .max(1)
        .min(1)
        .messages({
            'number.base': 'O campo "Consumidor Final" é obrigatório.',
            'number.min': 'O campo "Consumidor Final" é obrigatório.'
        }),
    cliente_cep: joi.string()
        .required()
        .length(9)
        .pattern(new RegExp(/^[0-9.-]*$/))
        .messages({
            'string.pattern.base': 'O campo "CEP" deve conter apenas números.',
            'string.length': 'O campo "CEP" deve conter 8 números.',
            'string.empty': 'O campo "CEP" é obrigatório.'
        }),
    cliente_endereco: joi.string().
        required()
        .messages({
            'string.base': 'O campo "Endereço" é obrigatório.',
            'string.empty': 'O campo "Endereço" é obrigatório.'
        }),
    cliente_numero: joi.number()
        .max(99999999)
        .required()
        .messages({
            'number.base': 'O campo "Número" é obrigatório.',
            'number.empty': 'O campo "Número" é obrigatório.',
            'number.max': 'O campo "Número" está incorreto.'
        }),
    cliente_complemento: joi.any().allow(''),
    cliente_bairro: joi.string()
        .max(30)
        .required()
        .messages({
            'string.base': 'O campo "Bairro" é obrigatório.',
            'string.empty': 'O campo "Bairro" é obrigatório.'
        }),
    cliente_cidade: joi.string()
        .max(30)
        .required()
        .messages({
            'string.base': 'O campo "Cidade" é obrigatório.',
            'string.empty': 'O campo "Cidade" é obrigatório.'
        }),
    cliente_uf: joi.string()
        .alphanum()
        .min(2)
        .max(2)
        .required()
        .messages({
            'string.base': 'O campo "UF" é obrigatório.',
            'string.empty': 'O campo "UF" é obrigatório.',
            'any.required': 'O campo "UF" é obrigatório.'
        }),
    cliente_email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br', 'edu'] } })
        .messages({
            'string.email': 'O campo "E-mail" inválido.',
            'string.empty': 'O campo "E-mail" é obrigatório'
        }),
    cliente_telefone: joi.string()
        .required()
        .messages({
            'string.base': 'O campo "Telefone" deve conter apenas números.',
            'string.required': 'O campo "Telefone" é obrigatório.'
        }),
    produtos_nome: joi.array()
        .items(joi.string().required())
        .messages({
            'string.base': 'O campo "Produto Nome" deve conter apenas letras.',
            'string.empty': 'O campo "Produto Nome" não pode estar vazio.',
            'array.includesRequiredUnknowns': 'O campo "Produto Nome" é obrigatório.'
        }),
    produtos_unidade: joi.array()
        .items(joi.string().allow('')),
    produtos_quantidade: joi.array()
        .items(joi.number().required())
        .messages({
            'number.base': 'O campo "Produto Quantidade" deve conter apenas números.',
            'number.empty': 'O campo "Produto Quantidade" não pode estar vazio.',
            'array.includesRequiredUnknowns': 'O campo "Produto Quantidade" é obrigatório.'
        }),
    produtos_preco: joi.array()
        .items(joi.number().required())
        .messages({
            'number.base': 'O campo "Produto Preço" deve conter apenas números.',
            'number.empty': 'O campo "Produto Preço" não pode estar vazio.',
            'array.includesRequiredUnknowns': 'O campo "Produto Preço" é obrigatório.'

        }),
    pagamento: joi.string(),
    valor_pagamento: joi.any().allow(''),
    modalidade_frete: joi.any().allow(''),
    forma_envio: joi.any().allow(''),
    total_frete: joi.any().allow(''),
    valor_seguro: joi.any().allow(''),
    peso_bruto: joi.any().allow(''),
    peso_liquido: joi.any().allow(''),
    placa_veiculo: joi.any().allow(''),
    especie: joi.any().allow(''),
    numeracao: joi.any().allow(''),
    lacres: joi.any().allow(''),
    numNf: joi.number(),
    forma_pagamento: joi.string().required()
        .messages({
            'string.base': 'O campo "Forma de Pagamento" é obrigatório.',
            'string.empty': 'O campo "Forma de Pagamento" é obrigatório.',
            'any.required': 'O campo "Forma de Pagamento" é obrigatório.'
        }),
    totalNFQuantity: joi.number(),
    totalNFPrice: joi.number(),
    currentHour: joi.string(),
    currentDate: joi.string(),
    protocoloAutorizacao: joi.string(),
    produtos: joi.array(),
    invoiceDueDates: joi.array(),
    invoiceInstallment: joi.string()
})


export default schema