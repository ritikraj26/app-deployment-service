const MAX_LEN = 5;

export function generate() {
    let ans="";
    const subset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i=0; i<MAX_LEN; i++){
        ans+=subset.charAt(Math.floor(Math.random()*subset.length));
    }
    return ans;
}