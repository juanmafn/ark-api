const utils = [];

utils.dateToString = (date) => {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    
    return year + '-' + month + '-' + day;
}

utils.dateToString2 = (date) => {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    
    return year + '/' + month + '/' + day;
}

utils.getNumeroDiasMes = (ano, mes) => {
    if( (mes == 1) || (mes == 3) || (mes == 5) || (mes == 7) || (mes == 8) || (mes == 10) || (mes == 12) ) 
        return 31;
    else if( (mes == 4) || (mes == 6) || (mes == 9) || (mes == 11) ) 
        return 30;
    else if( mes == 2 )
    {
        if( (ano % 4 == 0) && (ano % 100 != 0) || (ano % 400 == 0) )
            return 29;
        else
            return 28;
    }
}

module.exports = utils;