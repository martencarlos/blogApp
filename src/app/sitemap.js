
//SEO improvements
// blog.webframe.one/sitemap.xml
export default async function sitemap() {
    
    // indexing dynamic routes
    const posts = await fetch(process.env.SERVER+'/api/posts')
    const postsData = await posts.json(); //as array
    const postsPaths = postsData.map((post) => ({
        url: `https://${process.env.SERVER}/blog/${post.id}`,
        lastModified: new Date().toISOString(),
    })
    )

    // indexing static routes
    const routes = ['', '/blog', '/about', '/contact', '/legal',].map((route) => ({
        url: `https://${process.env.SERVER}${route}`,
        lastModified: new Date().toISOString(),
    })
    )
    return [...routes, ...postsPaths]
}