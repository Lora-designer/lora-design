import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { profile } from '@/lib/profile';
import ProjectGallery from './project-gallery';
import { projects } from '@/lib/projects';
import BrandLogo from './brand-logo';

const { whatsapp } = profile;

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Перейти к содержимому</a>
      <header className="site-header">
        <a className="wordmark" href="#" aria-label="LORA. — на главную"><BrandLogo /></a>
        <span className="header-caption">Независимый<br />графический дизайнер</span>
        <nav aria-label="Основная навигация">
          <a href="#work">Работы</a><a className="nav-about" href="#approach">Обо мне</a>
          <a className="header-contact" href={whatsapp} target="_blank" rel="noopener noreferrer">Связаться <ArrowUpRight aria-hidden="true" size={16} /></a>
        </nav>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">НЕЗАВИСИМЫЙ ГРАФИЧЕСКИЙ ДИЗАЙН</p>
            <h1 id="hero-title">ДИЗАЙН.<br /><em>СМЕЛО.</em><br />ПО-СВОЕМУ.</h1>
            <div className="hero-description">
              <span className="small-mark" aria-hidden="true">*</span>
              <p>Графический дизайн на пересечении<br className="desktop-break" /> моды, культуры и повседневности.</p>
            </div>
            <a className="pill-link" href={whatsapp} target="_blank" rel="noopener noreferrer">Обсудим вашу идею <ArrowUpRight aria-hidden="true" size={21} /></a>
            <a className="scroll-link" href="#work"><ArrowDown aria-hidden="true" size={18} /><span>Смотреть работы</span></a>
          </div>
          <figure className="hero-brand"><BrandLogo animated /><figcaption>БРЕНД-АЙДЕНТИКА · ГРАФИЧЕСКИЙ ДИЗАЙН · АРТ-ДИРЕКШН</figcaption></figure>
        </section>
        <ProjectGallery projects={projects} />
        <section className="approach" id="approach" aria-labelledby="approach-title">
          <div className="section-label"><span>(02)</span><span>Мой подход</span></div>
          <div className="approach-intro">
            <h2 id="approach-title">В деталях —<br /><em>всё.</em></h2>
            <div className="approach-copy">
              <p className="intro-line">Я LORA. Графический дизайнер с вниманием к форме и собственным взглядом.</p>
              <p>Мне интересно, как шрифт меняет интонацию, цвет создаёт настроение, а одна точная деталь делает образ узнаваемым.</p>
              <p>В моей практике встречаются выразительность fashion-графики и ясность промышленного дизайна.</p>
            </div>
          </div>
          <div className="practice">
            <figure className="detail-figure"><img src="/projects/ahada-metal-plaque.webp" width={1328} height={784} loading="lazy" alt="AHADA — логотип на золотистой металлической табличке" /><figcaption>AHADA / ДЕТАЛИ АЙДЕНТИКИ</figcaption></figure>
            <div className="focus">
              <p className="eyebrow">В ФОКУСЕ</p>
              <div className="focus-row"><span className="focus-index">01</span><div><h3>Айдентика</h3><p>Характер бренда в знаке, цвете и визуальной системе.</p></div></div>
              <div className="focus-row"><span className="focus-index">02</span><div><h3>Типографика</h3><p>Буквы, ритм и композиция. Графика, у которой есть голос.</p></div></div>
              <div className="focus-row"><span className="focus-index">03</span><div><h3>Визуальные образы</h3><p>Плакаты и эксперименты на границе дизайна и искусства.</p></div></div>
            </div>
          </div>
        </section>
        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="section-label"><span>(03)</span><span>Начать разговор</span></div>
          <div className="contact-content"><h2 id="contact-title">Есть идея?<br /><em>Давай обсудим.</em></h2><a className="contact-button" href={whatsapp} target="_blank" rel="noopener noreferrer"><ArrowUpRight aria-hidden="true" /><span>Написать <br />в WhatsApp</span></a></div>
          <div className="contact-details"><p>Расскажи о своём проекте —<br />начнём с самого важного.</p><a href={whatsapp} target="_blank" rel="noopener noreferrer">+7 988 808-21-22 <ArrowUpRight aria-hidden="true" size={17} /></a></div>
        </section>
      </main>
      <footer className="site-footer"><div className="footer-meta"><span>Графический дизайн с характером.</span><a href="#">Наверх ↑</a><span>© LORA. 2026</span></div><div className="footer-wordmark" aria-hidden="true"><BrandLogo /></div></footer>
    </>
  );
}
