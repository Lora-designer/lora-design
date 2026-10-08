'use client';

import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { ArrowUpRight, X } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { profile } from '@/lib/profile';

export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  statement?: string;
  cover: string;
  coverAlt: string;
  images: { src: string; alt: string }[];
};

type Tool = {
  name:string; title:string; description:string; inputSchema:object;
  annotations:{readOnlyHint:boolean;untrustedContentHint:boolean};
  execute:(input:unknown)=>unknown | Promise<unknown>;
};
type ModelContext = { registerTool:(tool:Tool, options:{signal:AbortSignal})=>void | Promise<void> };

export default function ProjectGallery({ projects }: { projects:Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    const context = (document as Document & { modelContext?:ModelContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const validObject = (value:unknown):value is Record<string,unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
    const tools:Tool[] = [
      {
        name:'get_lora_portfolio', title:'Проекты и контакт LORA.',
        description:'Read the featured project names, descriptions and the visible WhatsApp contact. Does not send messages.',
        inputSchema:{ type:'object', properties:{}, additionalProperties:false },
        annotations:{readOnlyHint:true,untrustedContentHint:false},
        execute(input) {
          if (!validObject(input) || Object.keys(input).length) throw new Error('Expected an empty object.');
          return { designer:profile.name, projects:projects.map(({id,name,category,description})=>({id,name,category,description})), contact:profile };
        },
      },
      {
        name:'open_lora_project', title:'Посмотреть проект LORA.',
        description:'Open a featured project in the same on-page gallery as its project card. Does not contact the designer.',
        inputSchema:{type:'object',properties:{projectId:{type:'string',enum:projects.map(p=>p.id)}},required:['projectId'],additionalProperties:false},
        annotations:{readOnlyHint:false,untrustedContentHint:false},
        async execute(input) {
          if (!validObject(input) || Object.keys(input).some(key=>key !== 'projectId') || typeof input.projectId !== 'string') throw new Error('Expected a projectId.');
          const project = projects.find(p=>p.id === input.projectId);
          if (!project) throw new Error('Project not found.');
          flushSync(()=>setActive(project));
          await new Promise<void>(resolve=>requestAnimationFrame(()=>resolve()));
          return {opened:true,id:project.id,name:project.name};
        },
      },
    ];
    for (const tool of tools) {
      try { void Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{}); } catch { /* The site also works in browsers without WebMCP. */ }
    }
    return ()=>lifecycle.abort();
  }, [projects]);

  return (
    <section className="portfolio" id="work" aria-labelledby="portfolio-title">
      <div className="section-label"><span>(01)</span><span>Избранные работы</span></div>
      <div className="portfolio-heading"><h2 id="portfolio-title">Идея обретает<br /><em>характер.</em></h2><p>Айдентика, графика и детали,<br />из которых складывается целое.</p></div>
      <Dialog open={active !== null} onOpenChange={open=>{ if (!open) setActive(null); }}>
        <div className="project-grid">
          {projects.map((project,index)=>(
            <DialogTrigger key={project.id} className={'project-card project-' + project.id} onClick={()=>setActive(project)} aria-label={'Посмотреть проект ' + project.name}>
              <div className="project-cover"><img src={project.cover} alt={project.coverAlt} loading="lazy" /><span className="project-open" aria-hidden="true"><ArrowUpRight size={25} /></span></div>
              <div className="project-caption"><div><h3>{project.name}</h3><p>{project.category}</p></div><span className="project-number">0{index+1}</span></div>
            </DialogTrigger>
          ))}
        </div>
        <DialogContent className={"project-dialog project-dialog-"+active?.id} showCloseButton={false}>
          {active && <>
            <div className="project-dialog-header"><div><p className="eyebrow">{active.category}</p><DialogTitle className="project-dialog-title">{active.name}</DialogTitle></div><DialogClose className="project-close" aria-label="Закрыть проект"><X size={23} /></DialogClose></div>
            <DialogDescription className="project-dialog-description">{active.description}</DialogDescription>
            {active.statement && <h2 className="project-statement">{active.statement}</h2>}
            <div className="project-pages">{active.images.map((image,index)=><figure key={image.src}><img src={image.src} alt={image.alt} loading={index === 0 ? 'eager':'lazy'} /><figcaption>{image.alt}</figcaption></figure>)}</div>
            <a className="pill-link project-discuss" href={profile.whatsapp} target="_blank" rel="noopener noreferrer">Обсудить свой проект <ArrowUpRight aria-hidden="true" size={20} /></a>
          </>}
        </DialogContent>
      </Dialog>
    </section>
  );
}
