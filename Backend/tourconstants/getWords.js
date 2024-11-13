module.exports = {
    unCased: function (s) {
        return s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
            .split(' ').filter(w => w !== '')
    },
    upperCase: function (s) {
        return s.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
            .split(' ').filter(w => w !== '')
    },
    lowerCase: function (s) {
        return s.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
            .split(' ').filter(w => w !== '')
    }
}