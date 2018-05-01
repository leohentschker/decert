export const getPreviewLink = (domain) => {
  var finalDomain = domain
  if (domain.indexOf("http") !== 0) {
    finalDomain = `https://${domain}`
  }

  console.log("THE DOMAIN")
  return finalDomain
}