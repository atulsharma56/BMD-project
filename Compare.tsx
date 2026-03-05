import { useState } from 'react';
import { SlidersHorizontal, MapPin, DollarSign } from 'lucide-react';
import { MechanicCard } from '../components/MechanicCard';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { mockMechanics, mockQuotes } from '../data/mockData';

export function Compare() {
  const [typeFilter, setTypeFilter] = useState<'all' | 'garage' | 'mobile'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'distance'>('rating');

  const filteredMechanics = mockMechanics.filter(
    (m) => typeFilter === 'all' || m.type === typeFilter
  );

  const sortedMechanics = [...filteredMechanics].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price') {
      const priceA = mockQuotes[a.id]?.totalCost || 999;
      const priceB = mockQuotes[b.id]?.totalCost || 999;
      return priceA - priceB;
    }
    if (sortBy === 'distance') {
      const distA = parseFloat(a.distance);
      const distB = parseFloat(b.distance);
      return distA - distB;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span>San Francisco, CA 94102</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Oil Change + Brake Service
          </h1>
          <p className="text-gray-600 mt-2">
            Compare {sortedMechanics.length} verified mechanics in your area
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium">Filter & Sort:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={typeFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter('all')}
            >
              All Mechanics
            </Button>
            <Button
              variant={typeFilter === 'garage' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter('garage')}
            >
              🏪 Garages
            </Button>
            <Button
              variant={typeFilter === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter('mobile')}
            >
              🚗 Mobile
            </Button>
          </div>

          <div className="sm:ml-auto">
            <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price">Lowest Price</SelectItem>
                <SelectItem value="distance">Nearest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price Range Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <DollarSign className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-medium text-blue-900">Price range: $390 - $420</p>
            <p className="text-sm text-blue-700 mt-1">
              All quotes include parts, labor, and warranty. No hidden fees.
            </p>
          </div>
        </div>

        {/* Mechanics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMechanics.map((mechanic) => (
            <MechanicCard
              key={mechanic.id}
              mechanic={mechanic}
              quote={mockQuotes[mechanic.id]}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-white rounded-lg p-8 text-center shadow-sm">
          <h3 className="text-2xl font-bold mb-2">Can't decide?</h3>
          <p className="text-gray-600 mb-4">
            All our mechanics are verified, insured, and ready to provide excellent service.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">✓ Background Checked</Badge>
            <Badge variant="secondary">✓ Insured & Bonded</Badge>
            <Badge variant="secondary">✓ Warranty Included</Badge>
            <Badge variant="secondary">✓ No Hidden Fees</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
