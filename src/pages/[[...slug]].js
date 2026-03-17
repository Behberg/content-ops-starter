'use client';

import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { allContent } from '../utils/local-content';
import { getComponent } from '../components/components-registry';
import { resolveStaticProps } from '../utils/static-props-resolvers';
import { resolveStaticPaths } from '../utils/static-paths-resolvers';
import { seoGenerateTitle, seoGenerateMetaTags, seoGenerateMetaDescription } from '../utils/seo-utils';
import { ArrowRight, Briefcase, CheckCircle, Users, Mail, MapPin } from 'lucide-react';

const useInView = (ref, options = {}) => {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);
  return isInView;
};

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = 50;
    const largeParticleCount = 5;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.2,
        isLarge: false,
      });
    }

    for (let i = 0; i < largeParticleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 40 + 30,
        opacity: Math.random() * 0.15 + 0.05,
        isLarge: true,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#3b82f6';

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        if (p.isLarge) {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
          gradient.addColorStop(1, 'rgba(99, 102, 241, 0.05)');
          ctx.fillStyle = gradient;
        }
        
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ display: 'block' }} />;
};

const HomePage = () => {
  const servicesRef = useRef(null);
  const expertiseRef = useRef(null);
  const servicesInView = useInView(servicesRef);
  const expertiseInView = useInView(expertiseRef);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Head>
        <title>Behman & Bergman - Executive Search & Recruitment</title>
        <meta name="description" content="Your partner in staffing & recruiting. Executive search agency connecting top talent with innovative companies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-background text-foreground">
        <nav className="fixed top-0 w-full z-50 glass border-b border-border">
          <div className="container flex items-center justify-between h-16">
            <div className="text-xl font-bold gradient-text">B&B</div>
            <div className="hidden md:flex gap-8">
              <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition">
                Services
              </a>
              <a href="#expertise" className="text-sm text-muted-foreground hover:text-foreground transition">
                Expertise
              </a>
              <a href="#team" className="text-sm text-muted-foreground hover:text-foreground transition">
                Team
              </a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition">
                Contact
              </a>
            </div>
          </div>
        </nav>

        <section className="relative pt-32 pb-20 overflow-hidden">
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663447629664/eCAdB9wHVnckPGuC7GU43J/hero-background-cVuWE545WaY79tVHrSHDgo.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <ParticleBackground />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background -z-10" />

          <div className="container relative z-10">
            <div className="max-w-2xl">
              <div className="inline-block mb-6 px-4 py-2 rounded-full glass border border-primary/20">
                <span className="text-xs font-semibold text-blue-300 brightness-150 font-bold">Behman & Bergman</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" data-cms-edit="hero_title">
                Your partner in <span className="gradient-text">staffing & recruiting</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-xl" data-cms-edit="hero_description">
                Executive search agency worth your time. We connect top talent with innovative companies.
              </p>

              <div className="flex gap-4">
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-6 py-3 rounded-lg font-semibold flex items-center transition">
                  Get started
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="border border-primary/20 hover:bg-primary/10 px-6 py-3 rounded-lg font-semibold transition">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <ParticleBackground />
          </div>
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663447629664/eCAdB9wHVnckPGuC7GU43J/services-section-bg-VDZmEdNAvoLM2Kn2dyNbQm.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.3,
            }}
          />

          <div className="container relative z-10">
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-4" data-cms-edit="services_title">About Our Services</h2>
              <p className="text-xl text-muted-foreground" data-cms-edit="services_subtitle">Hiring - made easy.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8" ref={servicesRef}>
              {[
                {
                  icon: Briefcase,
                  title: 'Success-based search',
                  description:
                    'The classic way to work with a recruitment agency. No up front payments. You only pay when we find the right candidate.',
                },
                {
                  icon: CheckCircle,
                  title: 'Recruitment subscription',
                  description:
                    'A lot of roles to fill or looking for a long-term partner? Subscribe to our services for guaranteed support and lower costs.',
                },
                {
                  icon: Users,
                  title: 'Contractors',
                  description:
                    'Fixed-term software development consultants tailored to your project needs. Access top-tier talent on flexible engagements.',
                },
              ].map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div
                    key={idx}
                    className="group glass p-8 rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                    style={{
                      opacity: servicesInView ? 1 : 0,
                      transform: servicesInView ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.6s ease-out ${idx * 0.1}s`,
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition">
                        <Icon className="w-6 h-6 text-blue-300" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3" data-cms-edit={`service_${idx}_title`}>{service.title}</h3>
                    <p className="text-muted-foreground" data-cms-edit={`service_${idx}_description`}>{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="expertise" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <ParticleBackground />
          </div>
          <div className="container">
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-4" data-cms-edit="expertise_title">Our field of expertise</h2>
              <p className="text-xl text-muted-foreground" data-cms-edit="expertise_subtitle">
                Although we try to help with all our client recruitment needs, these are the ones we outshine our competition in.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8" ref={expertiseRef}>
              {[
                {
                  name: 'Software Development',
                  icon: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663447629664/eCAdB9wHVnckPGuC7GU43J/icon-software-dev-lines-kSEhdaZiNj6WcnEymXYxyk.webp',
                },
                {
                  name: 'Risk & Compliance',
                  icon: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663447629664/eCAdB9wHVnckPGuC7GU43J/icon-risk-compliance-lines-VpUjFSXFra66czCjK2saPa.webp',
                },
                {
                  name: 'Product Management',
                  icon: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663447629664/eCAdB9wHVnckPGuC7GU43J/icon-product-management-lines-NebtkeUPmqn3ZTbD7Dp3Kq.webp',
                },
              ].map((expertise, idx) => (
                <div
                  key={idx}
                  className="group glass p-8 rounded-xl border border-primary/10 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                  style={{
                    opacity: expertiseInView ? 1 : 0,
                    transform: expertiseInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s ease-out ${idx * 0.1}s`,
                  }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition">
                      <img
                        src={expertise.icon}
                        alt={expertise.name}
                        className="w-6 h-6"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold">{expertise.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <ParticleBackground />
          </div>
          <div
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663447629664/eCAdB9wHVnckPGuC7GU43J/team-section-bg-LAWcVL7deoS4koapHPwBY5.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.2,
            }}
          />

          <div className="container relative z-10">
            <div className="mb-16">
              <h2 className="text-4xl font-bold mb-4" data-cms-edit="team_title">Meet the team</h2>
              <p className="text-xl text-muted-foreground" data-cms-edit="team_subtitle">Experienced professionals dedicated to your success.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: 'Krists Afanasjevs',
                  role: 'Co-founder',
                  description: 'Krists is an experienced headhunter in the legal and banking industry with deep knowledge in acquiring talent not easily attainable.',
                  image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663447629664/eCAdB9wHVnckPGuC7GU43J/team-member-2_bee6f465.jpg',
                },
                {
                  name: 'Arthur Bergmanis',
                  role: 'Co-founder',
                  description: 'Arthur specialised in the IT & Fintech industry with strong understanding of labour laws and contract management.',
                  image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663447629664/eCAdB9wHVnckPGuC7GU43J/team-member-1_6833de15.jpg',
                },
              ].map((member, idx) => (
                <div key={idx} className="glass p-8 rounded-xl border border-primary/10 hover:border-primary/30 transition">
                  <div className="w-1/2 aspect-square mb-4 overflow-hidden rounded-lg mx-auto">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold" data-cms-edit={`team_${idx}_name`}>{member.name}</h3>
                  <p className="text-primary font-semibold mb-2 brightness-125" data-cms-edit={`team_${idx}_role`}>{member.role}</p>
                  <p className="text-muted-foreground text-sm" data-cms-edit={`team_${idx}_description`}>{member.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-20">
              <div className="mb-12">
                <h2 className="text-4xl font-bold mb-4" data-cms-edit="clients_title">Our Clients</h2>
                <p className="text-xl text-muted-foreground" data-cms-edit="clients_subtitle">Trusted by leading companies across banking, consulting, and technology.</p>
              </div>

              <div className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
                <div
                  className="flex gap-8 pb-4"
                  style={{
                    animation: 'slide 30s linear infinite',
                  }}
                >
                  {[
                    'https://d2xsxph8kpxj0f.cloudfront.net/310519663447629664/eCAdB9wHVnckPGuC7GU43J/Untitled design_1f2cf0c5.png',
                    'https://d2xsxph8kpxj0f.cloudfront.net/310519663447629664/eCAdB9wHVnckPGuC7GU43J/Untitled design (1)_70a983c9.png',
                    'https://d2xsxph8kpxj0f.cloudfront.net/310519663447629664/eCAdB9wHVnckPGuC7GU43J/Untitled design (2)_f6e51d0a.png',
                    'https://d2xsxph8kpxj0f.cloudfront.net/310519663447629664/eCAdB9wHVnckPGuC7GU43J/Untitled design (3)_d8d93f6a.png',
                    'https://d2xsxph8kpxj0f.cloudfront.net/310519663447629664/eCAdB9wHVnckPGuC7GU43J/Untitled design (4)_d6a81dfc.png',
                    'https://d2xsxph8kpxj0f.cloudfront.net/310519663447629664/eCAdB9wHVnckPGuC7GU43J/Untitled design (5)_854f4938.png',
                    'https://d2xsxph8kpxj0f.cloudfront.net/310519663447629664/eCAdB9wHVnckPGuC7GU43J/Untitled design (6)_0e074f64.png',
                    'https://d2xsxph8kpxj0f.cloudfront.net/310519663447629664/eCAdB9wHVnckPGuC7GU43J/Untitled design_1f2cf0c5.png',
                    'https://d2xsxph8kpxj0f.cloudfront.net/310519663447629664/eCAdB9wHVnckPGuC7GU43J/Untitled design (1)_70a983c9.png',
                    'https://d2xsxph8kpxj0f.cloudfront.net/310519663447629664/eCAdB9wHVnckPGuC7GU43J/Untitled design (2)_f6e51d0a.png',
                  ].map((logo, idx) => (
                    <div key={idx} className="flex-shrink-0 min-w-max">
                      <img
                        src={logo}
                        alt={`Client ${idx + 1}`}
                        className="h-20 object-contain opacity-70 hover:opacity-100 transition"
                        style={{ background: 'transparent' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <ParticleBackground />
          </div>
          <div className="container max-w-2xl relative z-10">
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4" data-cms-edit="contact_title">Hire with us today!</h2>
              <p className="text-xl text-muted-foreground" data-cms-edit="contact_subtitle">
                Send us a message and one of our consultants will be with you as soon as possible to assist you!
              </p>
            </div>

            <div className="glass border-primary/20 border rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-2">Get in touch</h3>
              <p className="text-muted-foreground mb-6">We'll respond within 24 hours</p>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Your name"
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 focus:border-primary focus:ring-primary focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="your@email.com"
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 focus:border-primary focus:ring-primary focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Tell us about your hiring needs..."
                    className="w-full bg-input border border-border rounded-lg px-4 py-2 focus:border-primary focus:ring-primary focus:outline-none min-h-32"
                    required
                  />
                </div>

                <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition">
                  Send message
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div className="flex gap-4">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:info@behberg.com" className="font-semibold hover:text-primary transition">
                    info@behberg.com
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">Riga, Latvia</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-border py-12 bg-card/50">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <p className="text-sm text-muted-foreground">
                  © 2026 Behman & Bergman. All rights reserved.
                </p>
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Privacy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Terms
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </footer>

        <style jsx>{`
          @keyframes slide {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </>
  );
};

function Page(props) {
    const { page, site, isHomepage } = props;
    
    // Render the new homepage when slug is undefined
    if (isHomepage) {
        return <HomePage />;
    }
    
    const { modelName } = page.__metadata;
    if (!modelName) {
        throw new Error(`page has no type, page '${props.path}'`);
    }
    const PageLayout = getComponent(modelName);
    if (!PageLayout) {
        throw new Error(`no page layout matching the page model: ${modelName}`);
    }
    const title = seoGenerateTitle(page, site);
    const metaTags = seoGenerateMetaTags(page, site);
    const metaDescription = seoGenerateMetaDescription(page, site);
    return (
        <>
            <Head>
                <title>{title}</title>
                {metaDescription && <meta name="description" content={metaDescription} />}
                {metaTags.map((metaTag) => {
                    if (metaTag.format === 'property') {
                        // OpenGraph meta tags (og:*) should be have the format <meta property="og:…" content="…">
                        return <meta key={metaTag.property} property={metaTag.property} content={metaTag.content} />;
                    }
                    return <meta key={metaTag.property} name={metaTag.property} content={metaTag.content} />;
                })}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {site.favicon && <link rel="icon" href={site.favicon} />}
            </Head>
            <PageLayout page={page} site={site} />
        </>
    );
}

export function getStaticPaths() {
    const data = allContent();
    const paths = resolveStaticPaths(data);
    // Add the homepage path
    return { paths: [{ params: { slug: [] } }, ...paths], fallback: false };
}

export async function getStaticProps({ params }) {
    const data = allContent();
    const urlPath = '/' + (params.slug || []).join('/');
    
    // Check if this is the homepage (no slug)
    if (!params.slug || params.slug.length === 0) {
        return { props: { isHomepage: true, page: {}, site: {} } };
    }
    
    const props = await resolveStaticProps(urlPath, data);
    return { props: { ...props, isHomepage: false } };
}

export default Page;
