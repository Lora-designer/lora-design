import type { Metadata } from 'next';
import { Manrope, Prata } from 'next/font/google';
import './globals.css';

const sans = Manrope({ variable:'--font-lora-sans', subsets:['latin','cyrillic'], display:'swap' });
const display = Prata({ variable:'--font-lora-display', subsets:['latin','cyrillic'], weight:'400', display:'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://lora-graphic-practice.bronze-coot-7960.chatgpt.site'),
  title: 'LORA. — Графический дизайн с характером',
  description: 'Независимый графический дизайнер LORA. Айдентика, типографика и визуальные образы на пересечении моды и культуры. Обсудить проект в WhatsApp.',
  icons: { icon:'/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children:React.ReactNode }>) {
  return <html lang="ru"><body className={sans.variable + ' ' + display.variable}>{children}</body></html>;
}
