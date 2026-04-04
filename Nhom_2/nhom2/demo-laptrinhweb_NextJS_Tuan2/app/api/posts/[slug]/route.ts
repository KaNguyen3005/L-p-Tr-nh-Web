import { NextRequest, NextResponse } from 'next/server';

const posts = [
  {
    id: 1,
    slug: "bai-viet-1",
    title: "Bài viết 1",
    content: "Nội dung chi tiết của bài viết 1...",
    date: "2024-01-15",
    author: "Tác giả 1"
  },
  {
    id: 2,
    slug: "bai-viet-2",
    title: "Bài viết 2",
    content: "Nội dung chi tiết của bài viết 2...",
    date: "2024-01-16",
    author: "Tác giả 2"
  },
  {
    id: 3,
    slug: "bai-viet-3",
    title: "Hướng dẫn TypeScript",
    content: "TypeScript là một superset...",
    date: "2024-01-17",
    author: "Tác giả 3"
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const post = posts.find((p) => p.slug === slug);

    if (!post) {
      return NextResponse.json(
        { error: "Bài viết không tìm thấy" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi server" },
      { status: 500 }
    );
  }
}