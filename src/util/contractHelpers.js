export const getCertificate = async (web3, contract, issuer, serialID) => {
  const certData = await contract.getMeme(issuer, serialID)
  return {
    owner: certData[0],
    issuer: issuer,
    validityStart: certData[2],
    validityEnd: certData[3],
    serialID: certData[4],
    validVotes: certData[5],
    invalidVotes: certData[6],
  }
}
