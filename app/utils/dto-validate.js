import joi from 'joi'


// Joi validation
export default (data) => {

    const schema = joi.object({
        data_nf: joi.date()
            .messages({
                'date.base': 'O campo "Data" deve ser preenchido.'
            }),
        tipo_operacao: joi.string(),
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
        cliente_cpf: joi.number()
            .required()
            .integer()
            .min(11111111111)
            .max(99999999999)
            .messages({
                'number.empty': 'O campo "CPF" é obrigatório.',
                'number.required': 'O campo "CPF" é obrigatório.',
                'number.base': 'O campo "CPF" deve conter apenas números.',
                'number.min': 'O campo "CPF" deve conter 11 digitos.',
                'number.max': 'O campo "CPF" deve conter 11 digitos.'
            }),
        cliente_ie: joi.string(),
        consumidor_final: joi.number()
            .max(1)
            .min(1)
            .messages({
                'number.base': 'O campo "Consumidor Final" é obrigatório.',
                'number.min': 'O campo "Consumidor Final" é obrigatório.'
            }),
        cliente_cep: joi.string()
            .required()
            .length(8)
            .pattern(new RegExp(/^[0-9]*$/))
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
        cliente_complemento: joi.string()
            .max(30),
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
                'any.required': 'O campo UF é obrigatório.'
            }),
        cliente_email: joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br', 'edu'] } })
            .messages({
                'string.email': 'O campo "E-mail" inválido.',
                'string.empty': 'O campo "E-mail" é obrigatório'
            }),
        cliente_telefone: joi.number()
            .required()
            .messages({
                'number.base': 'O campo "Telefone" deve conter apenas números.',
                'number.required': 'O campo "Telefone" é obrigatório.'
            }),
        produtos_nome: joi.array()
            .items(joi.string().required())
            .messages({
                'string.base': 'O campo "Produto Nome" é obrigatório.',
                'string.empty': 'O campo "Produto Nome" é obrigatório.'
            }),
        produtos_unidade: joi.array()
            .items(joi.string()),
        produtos_quantidade: joi.array()
            .items(joi.number().required())
            .messages({
                'number.base': 'O campo "Produto Quantidade" é obrigatório.',
                'number.empty': 'O campo "Produto Quantidade" é obrigatório.',
            }),
        produtos_preco: joi.array()
            .items(joi.number().required())
            .messages({
                'number.base': 'O campo "Produto Preço" é obrigatório.',
                'number.empty': 'O campo "Produto Preço" é obrigatório.',
            }),
        pagamento: joi.string(),
        valor_pagamento: joi.number(),
        modalidade_frete: joi.string(),
        forma_envio: joi.string(),
        total_frete: joi.string(),
        valor_seguro: joi.number(),
        peso_bruto: joi.number(),
        peso_liquido: joi.number(),
        placa_veiculo: joi.string(),
        especie: joi.string(),
        numeracao: joi.number(),
        lacres: joi.string(),
        numNf: joi.number(),
        forma_pagamento: joi.string(),
        totalNFQuantity: joi.number(),
        totalNFPrice: joi.number(),
        currentHour: joi.string(),
        currentDate: joi.string(),
        protocoloAutorizacao: joi.string(),
        produtos: joi.array()
    })

    return schema.validate(data, { abortEarly: false })

}