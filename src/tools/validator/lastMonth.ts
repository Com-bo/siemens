//获取当前月上月的年月
export const lastMonth = () =>{
    var date = new Date();
    var months = (date.getMonth() + 1);
    var m = '0' +  (months-1);
    var y = date.getFullYear();
    if (months == 1 ) {
        y--;
        m = '12';
    } 
    return y + m.substr(m.length - 2, 2);
}