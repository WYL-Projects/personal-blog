function FormatStatus(status,message,data) {
    return JSON.stringify({status, message, data})
}
module.exports.FormatStatus = FormatStatus;