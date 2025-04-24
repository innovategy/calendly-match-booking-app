import React from 'react';

/**
 * GlassmorphismPanel Example
 * This panel demonstrates glassmorphism using Tailwind CSS with your custom theme.
 */
const GlassmorphismPanel: React.FC = () => {
  return (
    <div className="card-glass max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-textMain mb-3 tracking-wide">Glassmorphism Panel</h2>
      <p className="text-textMain mb-6">
        This panel uses a semi-transparent background, frosted glass blur, soft shadow, and subtle border for a calming effect.
      </p>
      <button className="pill-btn bg-buttonBg text-textMain px-5 py-2 shadow-soft hover:bg-buttonHover active:bg-buttonActive">
        Ocean Action
      </button>
    </div>
  );
};

export default GlassmorphismPanel;
