const express = require('express')

module.exports = (routeV1) => {
    routeV1.route('/home')
        .get(
            (req, res, next) => {
                res.render('pages/home')
            }
        )
}
