module.exports = function(app) {
    // app.use('/account', require('../routes/account.route'));
    // app.use('/categories', require('../routes/category.route'));
    // app.use('/admin/categories', require('../routes/admin/category.route'));
    app.use('/branch', require('../routes/cn.route'));
    app.use('/product', require('../routes/product.route'));
    app.use('/thongke', require('../routes/thongke.route'));
};