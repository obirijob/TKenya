module.exports = function emailConfirm(em){
    let emq = em.split("").filter(x => x == "@")
    if (emq.length > 1 || emq.length < 1) return false
    let ems = em.split('@').filter(x => x !== "")
    if (ems.length < 2) return false
    let emv = ems[1].split('.').filter(x => x !== "")
    if (emv.length < 2) return false
    return true
}