// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'v9d447l35e'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  domain: 'dev-wep1rmwatpbzqa0p.us.auth0.com',            // Auth0 domain
  clientId: 'Zq9xvnHH67Ip1VXX2aFcHr9DQtZuQ7QX',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
