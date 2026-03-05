import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Star, MapPin, Clock, CheckCircle2, Shield, Award, Calendar, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { mockMechanics, mockQuotes } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export function QuoteDetails() {
  const { mechanicId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedTime, setSelectedTime] = useState<string>('');

  const mechanic = mockMechanics.find((m) => m.id === mechanicId);
  const quote = mechanicId ? mockQuotes[mechanicId] : null;

  if (!mechanic || !quote) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Quote not found</p>
        <Button onClick={() => navigate('/compare')} className="mt-4">
          Back to Compare
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedTime) {
      toast.error('Please select a time slot');
      return;
    }
    addToCart({ mechanic, quote, selectedTime });
    toast.success('Service added to cart!');
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate('/compare')} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Compare
        </Button>

        {/* Mechanic Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={mechanic.image}
                alt={mechanic.name}
                className="w-full md:w-48 h-48 object-cover rounded-lg"
              />
              
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{mechanic.name}</h1>
                    <div className="flex items-center gap-4 mt-2 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{mechanic.rating}</span>
                        <span className="text-sm">({mechanic.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{mechanic.distance} away</span>
                      </div>
                    </div>
                  </div>
                  
                  {mechanic.verified && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{mechanic.responseTime}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {mechanic.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary">
                      <Award className="w-3 h-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline">
                    {mechanic.type === 'mobile' ? '🚗 Mobile Service' : '🏪 Garage Location'}
                  </Badge>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-600">{mechanic.yearsInBusiness} years in business</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quote Breakdown */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quote Breakdown</CardTitle>
            <p className="text-sm text-gray-600">{quote.validUntil}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {quote.lineItems.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-xs text-gray-500 mt-1">⏱️ {item.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${item.laborCost + item.partsCost}</p>
                  </div>
                </div>
                
                <div className="pl-4 space-y-1 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Labor</span>
                    <span>${item.laborCost}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Parts</span>
                    <span>${item.partsCost}</span>
                  </div>
                </div>
                
                {item.id !== quote.lineItems[quote.lineItems.length - 1].id && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}

            <Separator className="my-4" />
            
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span className="text-2xl">${quote.totalCost}</span>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900">Warranty Included</p>
                  <p className="text-sm text-blue-700">{quote.warranty} parts & labor warranty</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Time Slots */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Choose Your Time</CardTitle>
            <p className="text-sm text-gray-600">Select a convenient time slot for your service</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {quote.availability.map((time, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(time)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    selectedTime === time
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="font-medium">{time}</span>
                  </div>
                  {selectedTime === time && (
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-2" />
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Book Button */}
        <div className="sticky bottom-0 bg-white border-t shadow-lg p-4 -mx-4 md:relative md:shadow-none md:border-0 md:bg-transparent md:p-0">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Total Price</p>
              <p className="text-3xl font-bold">${quote.totalCost}</p>
              <p className="text-xs text-gray-500">No hidden fees • {quote.warranty} warranty</p>
            </div>
            <Button size="lg" onClick={handleAddToCart} className="w-full sm:w-auto px-8">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
