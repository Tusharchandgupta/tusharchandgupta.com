import React from 'react';
import { Hero } from '../components/home/Hero';
import { ResourceCards } from '../components/home/ResourceCards';
import { AboutMeCard } from '../components/home/AboutMeCard';
import { LatestArticles } from '../components/home/LatestArticles';
import { FeaturedTools } from '../components/home/FeaturedTools';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { PlatformStrip } from '../components/home/PlatformStrip';
import { NewsletterSection } from '../components/home/NewsletterSection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Section B: Hero */}
      <Hero />

      {/* Section C: Resource Category Cards */}
      <ResourceCards />

      {/* Section D: About Me Profile Card */}
      <AboutMeCard />

      {/* Section E: Latest Articles */}
      <LatestArticles />

      {/* Section F: Featured Engineering Tools */}
      <FeaturedTools />

      {/* Section G: Featured Projects */}
      <FeaturedProjects />

      {/* Section H: Platform Overview Strip */}
      <PlatformStrip />

      {/* Section I: Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
};

