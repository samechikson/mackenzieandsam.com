import { HeroSection } from '@/components/HeroSection';
import { EnvelopeSection } from '@/components/EnvelopeSection';

import { OurStory } from '@/components/OurStory';
import { BasicDetails } from '@/components/BasicDetails';
import { TravelSection } from '@/components/TravelSection';

export default function Home() {
  return <>
    <HeroSection />
    <EnvelopeSection />
    <OurStory />
    <BasicDetails />
    <TravelSection />
  </>;
}
