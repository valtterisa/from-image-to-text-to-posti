import UploadForm from './components/UploadForm'
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { Benefits } from './components/Benefits';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md space-y-4">
        <UploadForm />
      </div>
      <Hero />
      <SocialProof />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </main >
  )
}

