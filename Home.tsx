import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, MapPin, Calendar, Wrench } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { TrustBadges } from '../components/TrustBadges';

export function Home() {
  const navigate = useNavigate();
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/compare');
  };

  const popularServices = [
    'Oil Change',
    'Brake Service',
    'Battery Replacement',
    'Tire Rotation',
    'Diagnostics',
    'AC Service',
    'Full Maintenance',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Car care you can trust,{' '}
            <span className="text-blue-600">prices you'll love</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Compare vetted mechanics, get transparent quotes, and book service—all in one place.
            No surprises, just quality care.
          </p>

          {/* Search Form */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="What service do you need?"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Your location or ZIP code"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full md:w-auto px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Find Mechanics
                </Button>
              </form>

              {/* Popular Services */}
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-3">Popular services:</p>
                <div className="flex flex-wrap gap-2">
                  {popularServices.map((svc) => (
                    <button
                      key={svc}
                      onClick={() => {
                        setService(svc);
                      }}
                      className={`px-3 py-1.5 text-sm border rounded-full transition-colors ${
                        svc === 'Full Maintenance'
                          ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium hover:bg-blue-100'
                          : 'border-gray-200 hover:border-blue-500 hover:text-blue-600'
                      }`}
                    >
                      {svc === 'Full Maintenance' ? '⭐ ' + svc : svc}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="container mx-auto px-4">
        <TrustBadges />
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Get your car serviced in 3 easy steps
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">1. Compare Quotes</h3>
              <p className="text-gray-600">
                Search for your service and instantly compare transparent, line-item quotes from
                verified mechanics near you.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">2. Book Instantly</h3>
              <p className="text-gray-600">
                Choose your preferred mechanic and time slot. Book in seconds, no phone calls needed.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                <Wrench className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">3. Get Quality Service</h3>
              <p className="text-gray-600">
                Track your service in real-time and get a digital record for your service history.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to experience hassle-free car care?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join thousands of car owners who trust us for transparent pricing and quality service.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/compare')}
            className="px-8"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
}