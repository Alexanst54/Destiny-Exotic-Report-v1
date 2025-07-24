import React from "react";

function ExoticMissionCard({ name, image, variants }) {
  return (
    <div className="bg-[#23243a] rounded-lg shadow-md p-4 flex flex-col items-center w-64">
      <img src={image} alt={name} className="rounded-md mb-3 w-full h-36 object-cover" />
      <h3 className="text-lg font-bold text-yellow-400 mb-2 text-center">{name}</h3>
      <ul className="text-sm text-gray-300 mb-2">
        {variants && variants.map((variant, idx) => (
          <li key={idx} className="py-1 px-2 bg-[#181926] rounded mb-1 text-center">
            {variant.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExoticMissionCard;