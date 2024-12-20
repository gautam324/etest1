

import { auth } from "express-oauth2-jwt-bearer"

const jwtCheck = auth({                                         // Conecta auth0 del frontend con el backend
  audience: "http://localhost:8000",                            // scope de aplicacón (backend)  
  issuerBaseURL: "https://dev-txipfgukw38o0bag.us.auth0.com",   // sistema de autenticación
  tokenSigningAlg: "RS256"                                      // Alogaritmo de encriptación    
})                                                              // Si el token que llega al endpoint se valida por auth0 jwtCheck lo deja pasar  

export default jwtCheck