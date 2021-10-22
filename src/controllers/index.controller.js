const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
    res.render('index')
};

indexCtrl.renderDui = (req, res) => {
    res.render('dui')
};

module.exports = indexCtrl;

