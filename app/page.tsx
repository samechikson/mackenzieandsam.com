import { HeroSection } from '@/components/HeroSection';
import { EnvelopeSection } from '@/components/EnvelopeSection';

import { OurStory } from '@/components/OurStory';
import { BasicDetails } from '@/components/BasicDetails';
import { TravelSection } from '@/components/TravelSection';
import { Footer } from '@/components/Footer';
import { NavigationMenu } from '@/components/NavigationMenu';

export default function Home() {
  return <>
    <NavigationMenu />
    <HeroSection />
    <EnvelopeSection />
    <OurStory />
    <BasicDetails />
    <TravelSection />
    <Footer />
  </>;
}
