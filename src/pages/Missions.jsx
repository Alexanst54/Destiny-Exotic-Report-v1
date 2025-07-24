import { Link } from "react-router-dom";

export default function Missions() {
  const exoticActivities = [
    {"name": "Dual Destiny", "description": "A cooperative mission requiring Light and Dark Guardians to work together to unlock Prismatic class exotics.", "release": "The Final Shape", "icon": null, "variants": [{"name": "Standard", "hash": -2132841886}]},
    {"name": "Encore", "description": "A musical-themed exotic mission with multiple variant encounters.", "release": "The Final Shape", "icon": null, "variants": [
        {"name": "Expert", "hash": 655052177},
        {"name": "Overture (Expert)", "hash": -1932104431},
        {"name": "Concerto (Expert)", "hash": -1932104430},
        {"name": "Coda (Expert)", "hash": -1553027841},
        {"name": "Standard", "hash": 1550266704},
        {"name": "Customize", "hash": -1174422607},
        {"name": "Concerto: Standard", "hash": -752855492},
        {"name": "Coda: Standard", "hash": -752855491},
        {"name": "Overture: Standard", "hash": -752855489}
    ]},
    {"name": "Vox Obscura", "description": "Infiltrate a Cabal base to intercept transmissions and earn the exotic grenade launcher Dead Messenger.", "release": "Witch Queen", "icon": null, "variants": [
        {"name": "Standard", "hash": -1626230148},
        {"name": "Master", "hash": 613120446},
        {"name": "Expert", "hash": 666172264},
        {"name": "Normal", "hash": 901429423}
    ]},
    {"name": "Zero Hour", "description": "A timed mission through a Braytech facility to recover the exotic pulse rifle Outbreak Perfected.", "release": "Forsaken", "icon": null, "variants": [
        {"name": "Heroic", "hash": -1563758630},
        {"name": "Standard", "hash": -933221025},
        {"name": "Expert", "hash": 1848771417}
    ]},
    {"name": "Operation: Seraph's Shield", "description": "Board a space station to restore Rasputin’s systems and unlock the exotic Revision Zero.", "release": "Witch Queen", "icon": null, "variants": [
        {"name": "Expert", "hash": -1375158087},
        {"name": "Normal", "hash": 202306511},
        {"name": "Legend", "hash": 995051012},
        {"name": "Standard", "hash": 1221538367}
    ]},
    {"name": "//node.ovrd.AVALON//", "description": "Dive into a corrupted Vex network to uncover secrets and earn the exotic glaive Vexcalibur.", "release": "Lightfall", "icon": null, "variants": [
        {"name": "Legend", "hash": -1211705630},
        {"name": "Standard", "hash": 509188661},
        {"name": "Legendary", "hash": -343395313}
    ]},
    {"name": "Kell's Fall", "description": "A mission involving illusions and Eliksni lore, offering a unique exotic reward tied to Mithrax’s story.", "release": "The Final Shape", "icon": null, "variants": [
        {"name": "Standard", "hash": -416696360},
        {"name": "Diffraction", "hash": -998179575},
        {"name": "Reflection (Expert)", "hash": -847719003},
        {"name": "Expert", "hash": 367562924},
        {"name": "Distortion (Expert)", "hash": 264074906},
        {"name": "Distortion", "hash": 715393254},
        {"name": "Diffraction (Expert)", "hash": 1044034163},
        {"name": "Reflection", "hash": 1583447699},
        {"name": "Customize", "hash": 1948474391}
    ]},
    {"name": "Starcrossed", "description": "Navigate celestial anomalies and confront Void-based threats to earn a powerful exotic weapon.", "release": "Lightfall", "icon": null, "variants": [
        {"name": "Legend", "hash": 1013336498},
        {"name": "Standard", "hash": 196691221},
        {"name": "Normal", "hash": 896748846},
        {"name": "Customize", "hash": 1768099736}
    ]},
    {"name": "The Whisper", "description": "A timed mission in a Taken-infested rift to obtain the exotic sniper rifle Whisper of the Worm.", "release": "Warmind", "icon": null, "variants": [
        {"name": "Standard", "hash": 74501540},
        {"name": "Expert", "hash": -423446509},
        {"name": "Customize", "hash": 576782083},
        {"name": "Heroic", "hash": 1099555105}
    ]},
    {"name": "Presage", "description": "A haunted ship mission with standard and expert variants.", "release": "Beyond Light", "icon": null, "variants": [
        {"name": "Standard", "hash": -411671539},
        {"name": "Expert", "hash": -93120625}
    ]},
    {"name": "Exotic Quest: Presage", "description": "Explore a derelict Cabal ship haunted by Scorn to unlock the exotic scout rifle Dead Man’s Tale.", "release": "Beyond Light", "icon": null, "variants": [
        {"name": "Master", "hash": -82214018},
        {"name": "Normal", "hash": 2124066889}
    ]},
    {"name": "Exotic mission 'Derealize'", "description": "A mysterious mission likely involving perception and reality, with a unique exotic reward.", "release": "The Final Shape", "icon": null, "variants": [
        {"name": "Standard", "hash": 648675065}
    ]},
    {"name": "Grandmaster Conquest", "description": "A high-difficulty conquest mission.", "release": "The Edge of Fate", "icon": null, "variants": [
        {"name": "Whisper: Customize", "hash": 1645244833}
    ]},
    {"name": "Harbinger", "description": "Climb a haunted cliffside to face corrupted spirits and earn the exotic hand cannon Hawkmoon.", "release": "Beyond Light", "icon": null, "variants": [
        {"name": "Standard", "hash": 1738383283}
    ]}
  ];

  return (
    <div className="bg-white dark:bg-[#181926] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Missions Exotiques</h1>
      <div className="flex flex-col gap-12">
        {exoticActivities.map((activity) => {
          const images = {
            "Dual Destiny": "/images/dual_destiny.jpg",
            "Encore": "/images/encore.jpg",
            "Vox Obscura": "/images/voxobscura.jpg",
            "Zero Hour": "/images/zerohour.jpg",
            "Operation: Seraph's Shield": "/images/seraphshield.jpg",
            "//node.ovrd.AVALON//": "/images/avalon.jpg",
            "Kell's Fall": "/images/kellsfall.jpg",
            "Starcrossed": "/images/starcrossed.jpg",
            "The Whisper": "/images/whisper.jpg",
            "Presage": "/images/presage.jpg",
            "Exotic Quest: Presage": "/images/presage.jpg",
            "Exotic mission 'Derealize'": "/images/derealize.jpg",
            "Grandmaster Conquest": "/images/gmconquest.jpg",
            "Harbinger": "/images/harbinger.jpg",
          };
          const image = images[activity.name] || "/images/default.jpg";
          return (
            <Link
              to={`/missions/${activity.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()}`}
              key={activity.name}
              className="relative rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row w-full min-h-[220px] bg-gray-100 dark:bg-[#23243a] hover:scale-[1.02] transition-transform duration-150"
              style={{
                backgroundImage: `linear-gradient(120deg, rgba(24,25,38,0.65) 55%, rgba(24,25,38,0.35)), url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="flex-1 flex flex-col p-8 z-10">
                <h2 className="text-2xl font-bold mb-2 text-yellow-400 drop-shadow-lg">{activity.name}</h2>
                {activity.description && <p className="mb-2 text-gray-700 dark:text-gray-200 italic text-base">{activity.description}</p>}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-700 dark:text-gray-300">
                  {activity.release && <span className="bg-gray-200/80 dark:bg-[#23243a]/80 rounded px-3 py-1 text-gray-800 dark:text-gray-200">Extension : {activity.release}</span>}
                </div>
                <div className="flex flex-col gap-1 mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-1">Variants :</span>
                  <div className="flex gap-2 flex-wrap">
                    {activity.variants.map((variant) => (
                      <span key={variant.hash} className="bg-gray-300/60 dark:bg-gray-900/60 text-gray-800 dark:text-gray-300 text-xs px-2 py-1 rounded shadow-sm border border-gray-300 dark:border-gray-800 opacity-80 mb-1">{variant.name}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-200/80 dark:bg-[#23243a]/80 rounded-lg p-3 text-xs text-gray-500 dark:text-gray-400 text-center mt-auto">Stats à venir…</div>
              </div>
              {/* Overlay for better text contrast on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#181926] via-transparent to-transparent md:hidden" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
