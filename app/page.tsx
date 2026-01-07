import { HeroSection } from '@/components/HeroSection';
import { EnvelopeSection } from '@/components/EnvelopeSection';

import { OurStory } from '@/components/OurStory';
import { BasicDetails } from '@/components/BasicDetails';
import { TravelSection } from '@/components/TravelSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return <>
    <HeroSection />
    <EnvelopeSection />
    <OurStory />
    <BasicDetails />
    <TravelSection />
    <Footer />
  </>;
}
