export default function ProjectCard({ title, description, image, tech, link }) {
  return (
    <div className="bg-[#232323] border border-[#1ED696] rounded-xl shadow-lg w-80 min-w-[320px] max-w-xs flex flex-col overflow-hidden h-[400px] group hover:shadow-[0_8px_30px_rgba(30,214,150,0.2)]">
      {/* Taller image section */}
      <div className="h-60 w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      
      <div className="p-5 flex flex-col flex-1 relative">
        <h3 className="text-xl font-semibold mb-2 text-[#FAF3DD]">{title}</h3>
        
        {/* Description only appears on hover */}
        <div className="overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-36 group-hover:opacity-100">
          <p className="text-[#FCFFF0]/80 mb-4">{description}</p>
        </div>
        
        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          {tech.map((t, i) => (
            <span 
              key={i} 
              className="bg-[#1A936F]/20 text-[#8FE7C3] text-xs px-2 py-1 rounded-full transition-all duration-300 group-hover:bg-[#1A936F]/40"
            >
              {t}
            </span>
          ))}
        </div>
        
        {/* Link */}
        {link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#1ED696] hover:underline text-sm inline-block mt-1 transition-all duration-300"
          >
            View Project →
          </a>
        )}
      </div>
    </div>
  );
}
