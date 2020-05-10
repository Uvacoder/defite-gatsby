const menu = require('./src/@defite/gatsby-theme-defite/langs/menuDict');
const langs = Object.keys(menu);

module.exports = {
    plugins: [
        {
            resolve: '@defite/gatsby-theme-defite',
            options: {
                contentPath: '/content/',
                siteMetadata: {
                    title: 'Nikita Makhov',
                    author: 'Nikita Makhov',
                    description: 'Frontend developer blog',
                    siteUrl: 'https://defite.ru',
                },
                manifestOptions: {
                    name: 'Nikita Makhov',
                    short_name: 'Defite.ru',
                    start_url: '/',
                    background_color: '#ffffff',
                    theme_color: '#663399',
                    display: 'minimal-ui',
                    icon: 'assets/gatsby-icon.png'
                },
                langs
            }
        }
    ]
}
