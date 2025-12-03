interface ProcessStage {
  title: string;
  description: string;
  icon: string;
}

const PROCESS_STAGES: ProcessStage[] = [
  {
    title: 'Wastewater Intake',
    description: 'Wastewater enters the tank and begins the treatment process.',
    icon: '💧',
  },
  {
    title: 'Primary Treatment',
    description: 'Separation of impurities and solid materials from the wastewater.',
    icon: '🔄',
  },
  {
    title: 'Biological Treatment',
    description: 'Biological process involving bacteria and organic matter to break down contaminants.',
    icon: '🦠',
  },
  {
    title: 'Water Polishing',
    description: 'Water polishing to remove any remaining impurities by thickening the water.',
    icon: '✨',
  },
  {
    title: 'Salinity Reduction',
    description: 'Wastewater passes through filters to reduce salinity, ensuring devices are not damaged by salt.',
    icon: '🧂',
  },
  {
    title: 'Electrolysis Process',
    description: 'Electricity is applied to the water, causing ion reactions. Nitrogen and hydrogen gases rise through a tube to a storage tank.',
    icon: '⚡',
  },
  {
    title: 'Gas Separation',
    description: 'Chemical catalysts are added to separate nitrogen atoms and allow them to react with hydrogen under specific pressure and temperature.',
    icon: '⚗️',
  },
  {
    title: 'Green Ammonia Production',
    description: 'The combination of nitrogen and hydrogen produces green ammonia (NH₃).',
    icon: '🟢',
  },
  {
    title: 'Water Recovery',
    description: 'The water from which nitrogen and hydrogen were separated is returned through the pipe to the tank.',
    icon: '♻️',
  },
  {
    title: 'Final Treatment',
    description: 'Chlorine is added to eliminate bacteria, making the water suitable for agricultural use.',
    icon: '🌾',
  },
];

export function ProcessInfo() {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold gradient-text mb-2">
          Wastewater Treatment & Ammonia Extraction Process
        </h2>
        <p className="text-gray-400 text-sm">
          A comprehensive sustainable system that transforms wastewater into valuable resources
        </p>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {PROCESS_STAGES.map((stage, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl flex-shrink-0">{stage.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-primary font-mono text-sm">
                    Step {index + 1}
                  </span>
                  <h3 className="text-lg font-semibold">{stage.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <span>🌍</span> Environmental Impact
        </h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span>Produces green ammonia without fossil fuels</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span>Recovers clean water for agricultural irrigation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span>Reduces wastewater pollution</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400">✓</span>
            <span>Zero carbon emissions during production</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
