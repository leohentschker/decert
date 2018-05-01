const initialState = {
  web3Instance: null,
  contract: null,
}

const web3Reducer = (state = initialState, action) => {
  if (action.type === 'WEB3_INITIALIZED')
  {
    const web3Instance = action.payload.web3Instance
    return Object.assign({}, state, {
      web3Instance: web3Instance,
      crowdsale: action.payload.crowdsale,
      contract: action.payload.contract,
      address: web3Instance.eth.coinbase,
      token: action.payload.token,
    })
  }

  return state
}

export default web3Reducer
