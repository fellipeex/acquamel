import os from 'os' 
const ifaces = os.networkInterfaces();
let ipAddress;

export function getIP(){
    Object.keys(ifaces).forEach((ifname) => {
    let alias = 0;

        ifaces[ifname].forEach((iface) => {
            if ('IPv4' !== iface.family || iface.internal !== false) {
            // Pula todos os endereços internos e IPv6
            return;
            }
            if (alias >= 1) {
            // Este endereço IP tem vários alias, use apenas o primeiro
            //console.log(`${ifname}:${alias} ${iface.address}`);
            } else {
            // Este endereço IP tem apenas um alias
            //console.log(`${ifname} ${iface.address}`);
            }
            alias++;
            ipAddress = iface.address;
        });
    });

    return ipAddress
}