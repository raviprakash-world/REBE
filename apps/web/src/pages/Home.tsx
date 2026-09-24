import { Hero } from '@/components/home/Hero';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { NewArrivals } from '@/components/home/NewArrivals';
import { ShopByNeed } from '@/components/home/ShopByNeed';
import { BestSellers } from '@/components/home/BestSellers';
import { Planters } from '@/components/home/Planters';
import { WhyTane } from '@/components/home/WhyTane';
import { ServicesSegment } from '@/components/home/ServicesSegment';
import { BlogPreview } from '@/components/home/BlogPreview';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryTiles />
      <NewArrivals />
      <ShopByNeed />
      <BestSellers />
      <Planters />
      <WhyTane />
      <ServicesSegment />
      <BlogPreview />
    </>
  );
}
