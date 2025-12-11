'use client';

import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { EnvelopeSection } from '../components/EnvelopeSection';
import { DetailsSection } from '../components/DetailsSection';

export const Home: React.FC = () => {
    return (
        <>
            <HeroSection />
            <EnvelopeSection />
            <DetailsSection />
        </>
    );
};
