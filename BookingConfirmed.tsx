import { useLocation, useNavigate } from 'react-router';
import { CheckCircle, Calendar, MapPin, Clock, Download, Share2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';

export function BookingConfirmed() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mechanic, quote, selectedTime, multipleBookings, totalCost, paymentMethod } = location.state || {};

  // Handle multiple bookings from checkout
  const isMultipleBookings = !!multipleBookings;
  const bookings = isMultipleBookings ? multipleBookings : (mechanic ? [{ mechanic, quote, selectedTime }] : []);

  if (bookings.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Booking information not found</p>
        <Button onClick={() => navigate('/')} className="mt-4">
          Go Home
        </Button>
      </div>
    );
  }

  const bookingId = `BK${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {isMultipleBookings ? 'Bookings Confirmed!' : 'Booking Confirmed!'}
          </h1>
          <p className="text-lg text-gray-600">
            {isMultipleBookings 
              ? `All ${bookings.length} services are scheduled. We've sent confirmation details to your email.`
              : "Your service is scheduled. We've sent confirmation details to your email."}
          </p>
          {paymentMethod && (
            <p className="text-sm text-gray-500 mt-2">
              Payment processed: {paymentMethod}
            </p>
          )}
        </div>

        {/* Booking Details */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{isMultipleBookings ? 'All Bookings' : 'Booking Details'}</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Booking ID: {bookingId}</p>
              </div>
              <Badge className="bg-green-500 hover:bg-green-600">Confirmed</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {bookings.map((booking, index) => (
              <div key={index}>
                {index > 0 && <Separator className="my-4" />}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <img 
                      src={booking.mechanic.image} 
                      alt={booking.mechanic.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{booking.mechanic.name}</p>
                      <Badge variant="outline" className="mt-1">
                        {booking.mechanic.type === 'mobile' ? '🚗 Mobile Service' : '🏪 Garage'}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pl-2">
                    <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Scheduled Time</p>
                      <p className="text-gray-600">{booking.selectedTime}</p>
                    </div>
                  </div>

                  {booking.mechanic.type === 'garage' && (
                    <div className="flex items-start gap-3 pl-2">
                      <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <p className="text-gray-600">
                          {booking.mechanic.distance} away - Address will be sent via email
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Service Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {bookings.map((booking, index) => (
              <div key={index}>
                {index > 0 && <Separator className="my-3" />}
                <div className="space-y-2">
                  <p className="font-medium text-sm text-gray-900">{booking.mechanic.name}</p>
                  {booking.quote.lineItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="font-medium">${item.laborCost + item.partsCost}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm font-semibold pt-1">
                    <span>Subtotal</span>
                    <span>${booking.quote.totalCost}</span>
                  </div>
                </div>
              </div>
            ))}
            
            <Separator className="my-3" />
            
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total {paymentMethod ? 'Paid' : ''}</span>
              <span className="text-2xl">${totalCost || bookings[0]?.quote.totalCost || 0}</span>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <p className="text-sm text-blue-900">
                ✓ Warranty included on all services
              </p>
              <p className="text-sm text-blue-900 mt-1">
                {paymentMethod 
                  ? `✓ Payment completed: ${paymentMethod}`
                  : '✓ Payment due after service completion'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* What's Next */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium">Check your email</p>
                <p className="text-sm text-gray-600">
                  We've sent booking confirmation and mechanic contact details
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium">Prepare your vehicle</p>
                <p className="text-sm text-gray-600">
                  Make sure your vehicle is accessible at the scheduled time
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-medium">Track your service</p>
                <p className="text-sm text-gray-600">
                  Get real-time updates on your service progress
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <Button variant="outline" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
          <Button variant="outline" className="w-full">
            <Share2 className="w-4 h-4 mr-2" />
            Share Booking
          </Button>
        </div>

        {/* Primary Actions */}
        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full"
            onClick={() => navigate('/bookings')}
          >
            View My Bookings
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Need to make changes?</p>
          <Button variant="link" className="px-0">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
