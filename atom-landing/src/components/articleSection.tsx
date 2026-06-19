"use client";

import FlowingMenu from "./articleSections";

const demoItems = [
  { link: "#", text: "INTELLIGENCE", image: "https://picsum.photos/600/400?random=1" },
  { link: "#", text: "AUTOMATION", image: "https://picsum.photos/600/400?random=2" },
  { link: "#", text: "PRODUCTIVITY", image: "https://picsum.photos/600/400?random=3" },
  { link: "#", text: "CONTROL", image: "https://picsum.photos/600/400?random=4" },
];

export default function ArticleSection() {
  return (
    <section aria-label="Article section" className="w-full bg-black">
      {/* sin gaps: el wrapper rellena el ancho y pinta todo el bloque */}
      <div className="w-full h-[600px] relative overflow-hidden bg-black">
        <FlowingMenu
          items={demoItems}
          speed={15}
          textColor="#ffffff"
          bgColor="#000000"
          marqueeBgColor="#ffffff"
          marqueeTextColor="#000000"
          borderColor="#ffffff"
        />
      </div>
    </section>
  );
}

