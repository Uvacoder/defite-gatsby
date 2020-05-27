module.exports = {
    plugins: [
        {
            resolve: '@defite/gatsby-theme-defite',
            options: {
                contentPath: '/content/',
                siteMetadata: {
                    siteUrl: 'https://defite.ru',
                    ru: {
						title: 'Никита Махов',
						author: 'Никита Махов',
						description: 'Блог фронтенд-разработчика',
					},
					en: {
						title: 'Nikita Makhov',
						author: 'Nikita Makhov',
						description: 'Frontend developer blog',
					},
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
                langs: ['ru', 'en']
            }
        }
    ]
}
