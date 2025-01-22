"use client";
import Carousel from "@/components/Carousel";
import TikTokEmbed from "@/components/TikTokEmbed";

interface TikTokClip {
  _id: string;
  tiktok: string; // URL del TikTok
}

const TikTokCarousel: React.FC<{ tiktokClips: TikTokClip[] }> = ({ tiktokClips }) => {
  return (
    <div className="pt-8">
      {/* Carrusel de TikToks */}
      <Carousel>
        {tiktokClips.map((clip) => (
          <div key={clip._id} className="p-4">
            <TikTokEmbed url={clip.tiktok} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TikTokCarousel;
