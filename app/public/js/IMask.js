
document.addEventListener('DOMContentLoaded', () => {
    var element = document.getElementById('cliente_cpf')
    var CPFMask = IMask(element, {
        mask: [
            {
                mask: '000.000.000-00',
                lazy: false
            },
            {
                mask: '00.000.000/0000-00',
                lazy: false
            }
        ]
    })

    element = document.getElementById('cliente_cep')
    var CEPMask = IMask(element, { mask: '00000-000' })

    element = document.getElementById('cliente_telefone')
    var telephoneMask = IMask(element, { mask: '+55 (00) 00000-0000' })

    element = document.getElementById('placa_veiculo')
    var telephoneMask = IMask(element, { mask: 'aaa-0000', })


})