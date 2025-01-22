// app/Prueba/page.tsx
import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import NewsList from "@/components/NewsList";

async function PruebaPage() {
  await connectDB();

  // Obtener todas las noticias de la base de datos
  const newsArticles = await News.find({});

  // Filtrar solo los artículos que tengan un TikTok
  const tiktokClipsData = newsArticles
    .filter((article) => article.tiktok)
    .map((article) => ({
      _id: article._id,
      tiktok: article.tiktok,
    }));

  // Retornar la página con el componente NewsList
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Prueba - Filtro de Noticias</h1>
      <p className="text-gray-600 mb-6">
        Bienvenido a NiceTrip
      </p>

      {/* Aquí mostramos el componente NewsList pasando las noticias y los clips de TikTok */}
      <NewsList newsArticles={newsArticles} tiktokClipsData={tiktokClipsData} />
      
    </div>
  );
}

export default PruebaPage;
