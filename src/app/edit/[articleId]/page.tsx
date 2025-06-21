"use server";
import getArticleByIdCache from "@/cache/article/getArticleByIdCache";
import EditArticle from "@/components/Article/edit";

export default async function EditArticlePage({
    params
}: { params: Promise<{ articleId: string }> }) {

    const { articleId } = await params;
    const article = await getArticleByIdCache(articleId);

    return <div>
        <EditArticle article={article} />
        {/* 在這裡可以添加編輯文章的表單或其他內容 */}
    </div>
}