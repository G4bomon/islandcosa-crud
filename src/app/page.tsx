import { Badge } from "@/components/ui/badge";
import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import Link from "next/link";

async function HomePage() {
  await connectDB(); 

  
  const newsArticles = await News.find({});

  return (
    <div className="grid grid-cols-3 gap-4 pt-8">
      {newsArticles.map((article) => (
        <Link href={`/view/${article._id}/full`} key={article._id}>
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold">{article.title}</h2>
            <p className="text-sm text-gray-500">Author: {article.author}</p>
            <Badge>{article.category}</Badge>
            <img src={article.image} alt={article.title} />
          </div>
        </Link>
      ))}
    </div>
  );

  
  
}

export default HomePage;