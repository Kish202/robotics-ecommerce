import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Card from '../common/Card';

const ProductSpecs = ({ specs = {} }) => {
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    technical: true,
    features: true,
    dimensions: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Default specs if none provided
  const defaultSpecs = {
    general: [
      { label: 'Model Number', value: 'RBT-2024-PRO' },
      { label: 'Release Date', value: 'January 2024' },
      { label: 'Manufacturer', value: 'RoboTech Industries' },
      { label: 'Warranty', value: '2 Years Limited' },
      { label: 'Color Options', value: 'Black, White, Silver' },
    ],
    technical: [
      { label: 'Processor', value: 'AI Neural Engine 3.0' },
      { label: 'Sensors', value: 'Multi-directional LiDAR, Cliff Detection, Obstacle Avoidance' },
      { label: 'Navigation', value: 'Smart Mapping & Path Planning' },
      { label: 'Battery Type', value: 'Lithium-ion 5200mAh' },
      { label: 'Battery Life', value: 'Up to 3 hours' },
      { label: 'Charging Time', value: '3-4 hours' },
      { label: 'Noise Level', value: '55 dB (Quiet Mode)' },
    ],
    features: [
      { label: 'Voice Control', value: 'Alexa, Google Assistant, Siri' },
      { label: 'App Control', value: 'iOS & Android' },
      { label: 'Auto-Resume', value: 'Yes' },
      { label: 'Schedule Cleaning', value: 'Yes' },
      { label: 'Multi-Floor Mapping', value: 'Up to 5 floors' },
      { label: 'No-Go Zones', value: 'Virtual barriers supported' },
      { label: 'Carpet Detection', value: 'Automatic boost' },
    ],
    dimensions: [
      { label: 'Height', value: '3.5 inches (9 cm)' },
      { label: 'Diameter', value: '13.5 inches (34 cm)' },
      { label: 'Weight', value: '8.5 lbs (3.85 kg)' },
      { label: 'Dustbin Capacity', value: '600 ml' },
      { label: 'Water Tank', value: '300 ml (if applicable)' },
    ],
  };

  const displaySpecs = Object.keys(specs).length > 0 ? specs : defaultSpecs;

  const sections = [
    { key: 'general', title: 'General Information', icon: '📋' },
    { key: 'technical', title: 'Technical Specifications', icon: '⚙️' },
    { key: 'features', title: 'Features & Capabilities', icon: '✨' },
    { key: 'dimensions', title: 'Dimensions & Capacity', icon: '📏' },
  ];

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Technical Specifications
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Detailed technical information and specifications
        </p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => {
          const sectionData = displaySpecs[section.key];
          if (!sectionData || sectionData.length === 0) return null;

          return (
            <div
              key={section.key}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.key)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{section.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                </div>
                {expandedSections[section.key] ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {/* Section Content */}
              {expandedSections[section.key] && (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {sectionData.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {spec.label}
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white font-semibold text-right max-w-xs">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Download Specs */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
          <span>📥</span>
          <span>Download Complete Specifications (PDF)</span>
        </button>
      </div>
    </Card>
  );
};


export default ProductSpecs;