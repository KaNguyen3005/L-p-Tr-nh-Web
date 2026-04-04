const posts = [
    { title: "Bài viết 1", slug: "bai-viet-1" },
    { title: "Bài viết 2", slug: "bai-viet-2" },
];

export default function BlogPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Danh sách bài viết</h1>

            <ul className="space-y-2">
                {posts.map((p) => (
                    <li key={p.slug}>
                        <a href={`/blog/${p.slug}`} className="text-blue-500">
                            {p.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}