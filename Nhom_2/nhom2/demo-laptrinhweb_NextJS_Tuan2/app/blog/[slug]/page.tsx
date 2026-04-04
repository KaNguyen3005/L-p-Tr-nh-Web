'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Post {
    id: number;
    slug: string;
    title: string;
    content: string;
    date: string;
    author: string;
}

export default function PostPage() {
    const params = useParams();
    const router = useRouter();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPost() {
            try {
                console.log('📍 params.slug:', params.slug);
                
                const apiUrl = `/api/posts/${params.slug}`;
                console.log('🔗 Fetching from:', apiUrl);

                const res = await fetch(apiUrl);
                console.log('📡 Response status:', res.status);
                console.log('📡 Response ok:', res.ok);

                const data = await res.json();
                console.log('📊 Response data:', data);

                if (!res.ok) {
                    console.error('❌ API Error:', data.error);
                    setError(data.error || `Lỗi ${res.status}`);
                } else {
                    console.log('✅ Dữ liệu nhận được:', data);
                    setPost(data);
                    setError(null);
                }
            } catch (err: any) {
                console.error('🔴 Catch Error:', err);
                console.error('💥 Error message:', err.message);
                setError(`Lỗi kết nối: ${err.message}`);
            } finally {
                setLoading(false);
            }
        }

        if (params.slug) {
            console.log('🚀 useEffect triggered with slug:', params.slug);
            fetchPost();
        }
    }, [params.slug]);

    // Loading state
    if (loading) {
        return (
            <div className="p-6 text-center">
                <div className="inline-block">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
                <p className="mt-4 text-gray-600">Đang tải...</p>
                <p className="text-xs text-gray-400 mt-2">Kiểm tra F12 Console để xem chi tiết</p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="p-6 max-w-2xl mx-auto">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p className="font-bold">❌ {error}</p>
                    <p className="text-sm mt-2">
                        Hãy kiểm tra:
                    </p>
                    <ul className="text-sm mt-2 list-disc list-inside">
                        <li>API route có tại: <code className="bg-red-200 px-2">app/api/posts/[slug]/route.ts</code></li>
                        <li>Đã restart development server?</li>
                        <li>Kiểm tra console (F12) để xem chi tiết lỗi</li>
                    </ul>
                </div>
                <button
                    onClick={() => router.push('/blog')}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    ← Quay lại danh sách bài viết
                </button>
            </div>
        );
    }

    // Not found state
    if (!post) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-600">Bài viết không tìm thấy</p>
                <button
                    onClick={() => router.push('/blog')}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    ← Quay lại danh sách
                </button>
            </div>
        );
    }

    // Success state
    return (
        <div className="p-6 max-w-2xl mx-auto">
            <button
                onClick={() => router.back()}
                className="mb-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
                ← Quay lại
            </button>

            <article>
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

                <div className="flex gap-6 text-gray-500 mb-6 text-sm border-b pb-4">
                    <span>📅 {new Date(post.date).toLocaleDateString('vi-VN')}</span>
                    <span>✍️ {post.author}</span>
                </div>

                <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-line">
                    {post.content}
                </div>
            </article>
        </div>
    );
}