function makeid(length) {
  var result = '';
  var characters = '0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default (quantity) => {

  let productsIDs = []
  for (let i = 0; i < quantity; i++) {

    productsIDs = [...productsIDs, makeid(5)]
  }
  return productsIDs
}