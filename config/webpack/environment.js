const { environment } = require('@rails/webpacker')
const typescript =  require('./loaders/typescript')

environment.loaders.set('style', {
test: /\.(scss|sass|css)$/,
    use: [{
        loader: "to-string-loader"
    }, {
        loader: "css-loader"
    }, {
        loader: "resolve-url-loader"
    }, {
        loader: "sass-loader"
    }]
})

environment.loaders.append('typescript', typescript)
module.exports = environment
