'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Workflow, Zap, Play, BarChart3, MessageSquare, Database, TrendingUp } from 'lucide-react';
import { LiquidMetal, liquidMetalPresets } from '@paper-design/shaders-react';
import HeroVideoBackground from '@/components/HeroVideoBackground';
import FeatureCard from '@/components/FeatureCard';
import ProcessStep from '@/components/ProcessStep';
import CTAButton from '@/components/CTAButton';
import { TextEffect } from '@/components/ui/text-effect';

export default function Home() {
  return (
    {/* HERO SECTION - LIQUID METAL BACKGROUND */ }
    < div className = "relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden" >
      {/* Background Animation */ }
      < div className = "absolute inset-0 -z-10" >
        <LiquidMetal
          {...liquidMetalPresets[2]}
          className="w-full h-full"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        />
  {/* Overlay to ensure text readability */ }
  <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
        </div >

    {/* Original Content */ }
    < div className = "relative z-10 text-center max-w-6xl mx-auto mt-20 px-6" >
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ margin: "-100px" }} // Trigger slightly before center
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white mb-8 leading-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]"
          >
            AI Au<span className="glass-text drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]" data-text="tom">tom</span>ation <br />
            That <span className="glass-text drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]" data-text="Wor">Wor</span>ks
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-3xl text-white/80 mb-12 max-w-3xl mx-auto font-light drop-shadow-lg"
          >
            Transform manual work into intelligent workflows with GreyNovo
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <CTAButton variant="primary" onClick={() => window.open('https://cal.com/jewel-pius-eromon-ralwq2/discovery-call', '_blank')}>
              Get Started
            </CTAButton>
          </motion.div>
        </div >
      </div >

    {/* Features Section */ }
    < section id = "features" className = "relative py-32 px-6 bg-black" aria - label="Key Features" >
      <div className="max-w-7xl mx-auto">
        <TextEffect
          per="char"
          preset="fade"
          className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-20 block"
        >
          Build, Automate, Scale
        </TextEffect>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Sparkles}
            title="Custom AI Workflows"
            description="Design intelligent automation tailored to your unique business processes and goals."
            delay={0.1}
          />
          <FeatureCard
            icon={Workflow}
            title="No-Code Integration"
            description="Connect your favorite tools without writing a single line of code. Pure visual workflows."
            delay={0.2}
          />
          <FeatureCard
            icon={Zap}
            title="Enterprise-Grade Reliability"
            description="Built for scale with 99.9% uptime, advanced monitoring, and enterprise security."
            delay={0.3}
          />
        </div>
      </div>
      </section >

    {/* How It Works Section */ }
    < section className = "relative py-32 px-6 bg-black" >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-7xl font-bold tracking-tight text-white text-center mb-20"
        >
          Simple. Powerful. Automated.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          <ProcessStep
            number={1}
            icon={Database}
            title="Connect Your Tools"
            description="Integrate with 1000+ apps and services. Your data flows seamlessly."
            delay={0.1}
            showConnector={true}
          />
          <ProcessStep
            number={2}
            icon={Workflow}
            title="Design Workflows"
            description="Build intelligent automation with our visual editor. No coding required."
            delay={0.3}
            showConnector={true}
          />
          <ProcessStep
            number={3}
            icon={Zap}
            title="Let AI Execute"
            description="Watch your workflows run 24/7. Save hours every day automatically."
            delay={0.5}
            showConnector={false}
          />
        </div>
      </div>
      </section >

    {/* Product Demo Section */ }
    < section className = "relative py-32 px-6 bg-black" >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            See It In Action
          </h2>
          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            Watch how automation transforms your business. Real-time insights, intelligent routing, and seamless execution.
          </p>
          <ul className="space-y-4 text-white/80">
            {['Real-time automation monitoring', 'AI-powered decision making', 'Seamless tool integration', 'Advanced analytics dashboard'].map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          onViewportEnter={() => {
            const video = document.getElementById('demo-video') as HTMLVideoElement;
            if (video) video.play();
          }}
          onViewportLeave={() => {
            const video = document.getElementById('demo-video') as HTMLVideoElement;
            if (video) video.pause();
          }}
          transition={{ duration: 0.7 }}
          className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-purple-500/20"
        >
          <video
            id="demo-video"
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
          >
            <source src="/workflow-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
      </section >

    {/* Use Cases Section */ }
    < section className = "relative py-32 px-6 bg-black" >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-7xl font-bold tracking-tight text-white text-center mb-20"
        >
          Built For Every Industry
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: TrendingUp, title: 'Sales Automation', desc: 'Streamline your sales pipeline' },
            { icon: MessageSquare, title: 'Customer Support', desc: 'AI-powered assistance 24/7' },
            { icon: Database, title: 'Data Processing', desc: 'Transform data automatically' },
            { icon: BarChart3, title: 'Marketing Workflows', desc: 'Automate campaign management' },
          ].map((useCase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <useCase.icon className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
              <p className="text-white/60">{useCase.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      </section >

    {/* Final CTA Section */ }
    < section className = "relative py-32 px-6 bg-gradient-to-b from-black via-purple-950/20 to-black" >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-7xl md:text-9xl font-bold tracking-tight text-white mb-6"
        >
          Start Automating Today
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl text-white/70 mb-12"
        >
          Join thousands automating their work
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <CTAButton
            variant="primary"
            className="text-lg px-16"
            onClick={() => window.open('https://cal.com/jewel-pius-eromon-ralwq2/discovery-call', '_blank')}
          >
            Book a Demo
          </CTAButton>
        </motion.div>
      </div>
      </section >


    </main >
  );
}
