// app/Prueba/page.tsx
import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import NewsList from "@/components/NewsList";

async function PruebaPage() {
  await connectDB();

  // Obtener todas las noticias de la base de datos
  const newsArticles = await News.find({});

  // Retornar la página con el componente NewsList
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Prueba - Filtro de Noticias</h1>
      <p className="text-gray-600 mb-6">
        Bienvenido a la página de prueba donde puedes ver las noticias filtradas.
      </p>

      {/* Aquí mostramos el componente NewsList pasando las noticias */}
      <NewsList newsArticles={newsArticles} />
    </div>
  );
}

export default PruebaPage;
