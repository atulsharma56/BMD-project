import { Shield, Award, Clock, ThumbsUp } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    { icon: Shield, label: 'Verified Mechanics', sublabel: 'Background checked' },
    { icon: Award, label: 'Certified Pros', sublabel: 'ASE certified' },
    { icon: Clock, label: 'Fast Response', sublabel: 'Within 1 hour' },
    { icon: ThumbsUp, label: 'Quality Guaranteed', sublabel: '12-month warranty' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
      {badges.map((badge, index) => (
        <div key={index} className="flex flex-col items-center text-center gap-2 p-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <badge.icon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-sm">{badge.label}</p>
            <p className="text-xs text-gray-500">{badge.sublabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
