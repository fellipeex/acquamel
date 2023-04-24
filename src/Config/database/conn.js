import MeuBD from "./MeuBD.js";

const CONN = new MeuBD()
// Chama o heartbeat a cada 30 segundos
setInterval(() => {
    CONN.heartbeat();
  }, 30000);

export default CONN