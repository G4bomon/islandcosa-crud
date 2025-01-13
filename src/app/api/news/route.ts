import { connectDB } from "@/libs/mongodb";
import News from "@/models/news";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectDB();
    const { title, content, category, image, youtube, tiktok } = await request.json();
    
    const titleFound = await News.findOne({ title });

    if (titleFound)
      return NextResponse.json(
        {
          message: "el articulo ya existe",
        },
        {
          status: 409,
        }
      );

    if (content.length  < 10)
      return NextResponse.json(
        { message: "El contenido debe tener al menos 50 caracteres de largo" },
        { status: 400 }
      );
    
    if (!category)
      return NextResponse.json(
        {message: "La categoria no puede estar vacia"},
        {status: 400}
      );
     
    if (!image)
      return NextResponse.json(
        {message: "El articulo debe tener al menos una imagen"},
        {status: 400}
      );


    const news = new News({
      title,
      content,
      category,
      image,
      youtube,
      tiktok,
      author: "Gabriel",
    });


    const savednew = await news.save();
    console.log (savednew);

    return NextResponse.json(
      savednew
    );
    
   } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.error();
  }
}