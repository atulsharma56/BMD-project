import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, MapPin, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';

export function Bookings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  // No bookings yet - empty state
  const upcomingBookings: any[] = [];
  const inProgressBookings: any[] = [];
  const completedBookings: any[] = [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">Track and manage your car service appointments</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          {/* Upcoming Bookings */}
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No upcoming bookings</h3>
                  <p className="text-gray-600 mb-6">
                    Ready to get your car serviced? Find a mechanic and book your next service.
                  </p>
                  <Button onClick={() => navigate('/')}>
                    Find a Mechanic
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ) : (
              // Future: render upcoming bookings here
              <div>Upcoming bookings will appear here</div>
            )}
          </TabsContent>

          {/* In Progress */}
          <TabsContent value="in-progress" className="space-y-4">
            {inProgressBookings.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No services in progress</h3>
                  <p className="text-gray-600 mb-6">
                    When you have an active service, you'll see live updates here.
                  </p>
                  <Button onClick={() => navigate('/')}>
                    Book a Service
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ) : (
              // Future: render in-progress bookings here
              <div>In-progress services will appear here</div>
            )}
          </TabsContent>

          {/* Completed */}
          <TabsContent value="completed" className="space-y-4">
            {completedBookings.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No completed services yet</h3>
                  <p className="text-gray-600 mb-6">
                    Your completed services and service history will appear here.
                  </p>
                  <Button onClick={() => navigate('/')}>
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ) : (
              // Future: render completed bookings here
              <div>Completed services will appear here</div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}