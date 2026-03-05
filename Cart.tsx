import { useNavigate } from 'react-router';
import { ShoppingCart, Trash2, Calendar, MapPin, Star, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { useCart } from '../context/CartContext';

export function Cart() {
  const navigate = useNavigate();
  const { items, removeFromCart, getTotalCost } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          <Card>
            <CardContent className="py-12 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">
                Browse our services and add them to your cart to get started
              </p>
              <Button onClick={() => navigate('/compare')}>
                Browse Services
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Your Cart ({items.length} {items.length === 1 ? 'service' : 'services'})</h1>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Mechanic Image */}
                    <img
                      src={item.mechanic.image}
                      alt={item.mechanic.name}
                      className="w-full md:w-32 h-32 object-cover rounded-lg"
                    />

                    {/* Service Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-lg">{item.mechanic.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{item.mechanic.rating}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{item.mechanic.distance}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <Badge variant="outline">
                        {item.mechanic.type === 'mobile' ? '🚗 Mobile Service' : '🏪 Garage Location'}
                      </Badge>

                      {/* Scheduled Time */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-blue-900">{item.selectedTime}</span>
                        </div>
                      </div>

                      {/* Service Items */}
                      <div className="space-y-2">
                        {item.quote.lineItems.map((lineItem) => (
                          <div key={lineItem.id} className="text-sm">
                            <p className="font-medium">{lineItem.name}</p>
                            <p className="text-gray-600 text-xs">{lineItem.description}</p>
                          </div>
                        ))}
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Service Total</span>
                        <span className="text-xl font-bold">${item.quote.totalCost}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${getTotalCost()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-medium">$0</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Platform Credit</span>
                    <span>-$0</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold">${getTotalCost()}</span>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
                  <p className="text-green-800">
                    ✓ No hidden fees<br />
                    ✓ Warranty included<br />
                    ✓ Secure payment
                  </p>
                </div>

                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/compare')}
                >
                  Add More Services
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
