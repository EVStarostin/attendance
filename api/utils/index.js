function cleanDoc() {
    var obj = this.toObject();
    
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    
    return obj;
}

module.exports = { cleanDoc };