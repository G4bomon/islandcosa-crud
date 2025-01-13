import { Badge } from "@/components/ui/badge";
import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import TikTokEmbed from "@/components/TikTokEmbed";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Deletebutton } from "@/components/Deletebutton";


interface Props {
  params: { _id: string };
}

async function Fullarticle({ params }: Props) {
  await connectDB();

  const article = await News.findOne({ _id: params._id });

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div key={article._id} className="border p-4 rounded-lg">
      <h2 className="text-xl font-bold">{article.title}</h2>
      <p className="text-sm text-gray-500">{article.content}</p>
      <Badge>{article.category}</Badge>
      <img src={article.image} alt="" />
      <iframe width="560" height="315" src={article.youtube} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      {article.tiktok && <TikTokEmbed url={article.tiktok} />}
      <p className="text-sm text-gray-500">Author: {article.author}</p>
      <Link href={`/view/${article._id}/edit?title=${article.title}&content=${article.content}&category=${article.category}&image=${article.image}&youtube=${article.youtube}&tiktok=${article.tiktok}`}>
        <Button>Editar</Button>
      </Link>
      <Deletebutton articleId={article._id.toString()}  />
    </div>
  );
}

export default Fullarticle;
