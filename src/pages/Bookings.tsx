import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Booking } from '../types/booking';
import BookingList from '../components/bookings/BookingList';
import AddBookingModal from '../components/bookings/AddBookingModal';
import BookingFilters from '../components/bookings/BookingFilters';

const BookingsPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      clientName: 'Sophie Martin',
      clientEmail: 'sophie@example.com',
      clientPhone: '+33 1 23 45 67 89',
      serviceId: '1',
      serviceName: 'Haircut & Styling',
      staffId: '1',
      staffName: 'Emma Thompson',
      date: '2024-03-20',
      time: '14:30',
      duration: 60,
      status: 'confirmed',
      totalPrice: 50,
      notes: 'Regular client'
    },
    {
      id: '2',
      clientName: 'Marie Dubois',
      clientEmail: 'marie@example.com',
      clientPhone: '+33 1 98 76 54 32',
      serviceId: '2',
      serviceName: 'Manicure',
      staffId: '2',
      staffName: 'Julie Bernard',
      date: '2024-03-20',
      time: '15:00',
      duration: 45,
      status: 'pending',
      totalPrice: 35
    }
  ]);

  const handleAddBooking = (newBooking: Omit<Booking, 'id'>) => {
    setBookings(prev => [...prev, { ...newBooking, id: Date.now().toString() }]);
  };

  const handleUpdateStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ));
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDate = !selectedDate || booking.date === selectedDate;
    const matchesStatus = !selectedStatus || booking.status === selectedStatus;

    return matchesSearch && matchesDate && matchesStatus;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
        >
          <Plus size={20} />
          <span>Add Booking</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bookings..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Filter size={20} />
              <span>Filters</span>
            </button>
          </div>

          {showFilters && (
            <BookingFilters
              selectedDate={selectedDate}
              selectedStatus={selectedStatus}
              onDateChange={setSelectedDate}
              onStatusChange={setSelectedStatus}
            />
          )}
        </div>

        <BookingList
          bookings={filteredBookings}
          onUpdateStatus={handleUpdateStatus}
          onDeleteBooking={handleDeleteBooking}
        />
      </div>

      {showAddModal && (
        <AddBookingModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddBooking}
        />
      )}
    </div>
  );
};

export default BookingsPage;