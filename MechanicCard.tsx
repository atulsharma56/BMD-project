import { Link } from 'react-router';
import { Star, MapPin, Clock, Award, CheckCircle2, Wrench } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter } from './ui/card';
import { Mechanic } from '../data/mockData';

interface MechanicCardProps {
  mechanic: Mechanic;
  quote?: {
    totalCost: number;
    validUntil: string;
  };
  showQuoteButton?: boolean;
}

export function MechanicCard({ mechanic, quote, showQuoteButton = true }: MechanicCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={mechanic.image}
          alt={mechanic.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-white text-gray-900 hover:bg-white">
            {mechanic.type === 'mobile' ? '🚗 Mobile' : '🏪 Garage'}
          </Badge>
        </div>
        {mechanic.verified && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-green-500 hover:bg-green-600">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg">{mechanic.name}</h3>
          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{mechanic.rating}</span>
              <span>({mechanic.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{mechanic.distance}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{mechanic.responseTime}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {mechanic.certifications.slice(0, 2).map((cert, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              <Award className="w-3 h-3 mr-1" />
              {cert}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-1">
          {mechanic.specialties.slice(0, 3).map((specialty, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              <Wrench className="w-3 h-3 mr-1" />
              {specialty}
            </Badge>
          ))}
        </div>

        {quote && (
          <div className="pt-3 border-t">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Quote</p>
                <p className="text-2xl font-bold text-gray-900">${quote.totalCost}</p>
              </div>
              <p className="text-xs text-gray-500">{quote.validUntil}</p>
            </div>
          </div>
        )}
      </CardContent>

      {showQuoteButton && (
        <CardFooter className="p-4 pt-0">
          <Link to={`/quote/${mechanic.id}`} className="w-full">
            <Button className="w-full">
              {quote ? 'View Quote Details' : 'Get Quote'}
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
