Date.prototype.format = function(){
    let yyyy = this.getFullYear().toString();
    let mm = (this.getMonth() + 1).toString();
    let dd = this.getDate().toString();
    let hh = this.getHours().toString();
    let min = this.getMinutes().toString();
    return yyyy + '/' + (mm[1] ? mm : '0'+mm[0]) + '/' + (dd[1] ? dd : '0'+dd[0]) + ' ' + (hh[1] ? hh : '0'+hh[0]) + ':' + (min[1] ? min : '0'+min[0]);
}
const S4 = () => { return (((1+Math.random())*0x10000)|0).toString(16).substring(1); };
const guid = () => { return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase()};