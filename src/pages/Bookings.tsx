import React, { useState,useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Booking } from '../types/booking';
import BookingList from '../components/bookings/BookingList';
import AddBookingModal from '../components/bookings/AddBookingModal';
import BookingFilters from '../components/bookings/BookingFilters';
import { getReservationBySalon,deletereservation,cancelReservation } from '../../Service/ReservationsService';
import { SendMAil} from '../../Service/SendMailService';
const BookingsPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedCollaborator, setSelectedCollaborator] = useState('');

  const [bookings, setBookings] = useState<Booking[]>([]);
  const SalonId = localStorage.getItem('SalonId');
  const transformBookingData = (data: any[]) => {
    const now = new Date();
    
    return data.map(databooking => {
      // Déterminer le service (salon service ou package service)
      const serviceInfo = databooking.SalonService 
        ? {
            serviceId: databooking.SalonService.id,
            serviceName: databooking.SalonService.name,
            duration: databooking.SalonService.duration
          }
        : {
            serviceId: databooking.packagesService?.id,
            serviceName: databooking.packagesService?.name,
            duration: databooking.packagesService.duration
          };
  
      // Extraire l'heure du startTime
      const time = databooking.startTime.substring(0, 5);
      
      // Créer un objet Date pour la réservation
      const bookingDateTime = new Date(`${databooking.date}T${databooking.startTime}`);
      
      // Déterminer le statut
      let status = databooking.status;
      if (status.toLowerCase() === 'Confirmed'.toLowerCase() && bookingDateTime < now) {
        status = 'completed';
      }
  
      return {
        id: databooking.id.toString(),
        clientName: databooking.User.name,
        clientEmail: databooking.User.email,
        clientPhone: databooking.User.phone,
        serviceId: serviceInfo.serviceId?.toString(),
        serviceName: serviceInfo.serviceName,
        staffId: databooking.Collaborator.id.toString(),
        staffName: databooking.Collaborator.name,
        date: databooking.date,
        time: time,
        duration: serviceInfo.duration,
        status: status,
        totalPrice: parseFloat(databooking.totalPrice),
        bookingDateTime: bookingDateTime // Ajout pour le tri
      };
    })
    .sort((a, b) => {
      // Tri par date et heure, du plus récent au plus ancien
      return new Date(b.bookingDateTime).getTime() - new Date(a.bookingDateTime).getTime();
    })
    .map(booking => {
      // Supprimer le champ bookingDateTime du résultat final
      const { bookingDateTime, ...bookingWithoutDateTime } = booking;
      return bookingWithoutDateTime;
    });
  };
  
  useEffect(() => {
    const fetchCalloborateurSalonData = async () => {
      try {
        const data = await getReservationBySalon(parseInt(SalonId!, 0));
        const transformedData = transformBookingData(data);
        setBookings(transformedData);
        
     
          
   
      } catch (err) {
        console.error('Error fetching salon data:', err);
      }
    };

    fetchCalloborateurSalonData();
  }, []);


  const handleAddBooking = (newBooking: Omit<Booking, 'id'>) => {
    const bookingWithId = { 
      ...newBooking, 
      id: Date.now().toString(),
    };
    setBookings(prev => [bookingWithId, ...prev]);
  };

  const handleUpdateStatus = async (id: string, status: Booking['status']) => {
    try {
      // Find the booking before updating
      const bookingToUpdate = bookings.find(b => b.id === id);
      
      if (!bookingToUpdate) {
        throw new Error('Booking not found');
      }

      // Call the API to cancel the reservation
      await cancelReservation(parseInt(id), status);

      // If status is being changed to cancelled, send an email
      if (status === 'cancelled') {
        const message = `Cher(e) client(e),

Votre réservation du ${bookingToUpdate.date} à ${bookingToUpdate.time} a été annulée.

Service: ${bookingToUpdate.serviceName}
Prestataire: ${bookingToUpdate.staffName}

Nous vous remercions de votre compréhension.`;

        await SendMAil(
          bookingToUpdate.clientEmail,
          "Votre réservation a été annulée",
          message
        );
      }

      // Update the local state
      setBookings(prev => prev.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      ));

      // Show success message (optional)
      alert('La réservation a été mise à jour avec succès');

      
    } catch (error) {
      console.error('Erreur lors de la suppression du membre du personnel:', error);
    }
   
  };

  const handleDeleteBooking = async (id: string) => {
    if (window.confirm('Etes-vous sûr de vouloir supprimer cette réservation ?')) {
     
      try {
        const data = await deletereservation(parseInt(id));
        setBookings(prev => prev.filter(b => b.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression du membre du personnel:', error);
      }
      
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
      booking.staffName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate = !selectedDate || booking.date === selectedDate;
    const matchesStatus = !selectedStatus || booking.status === selectedStatus;
    const matchesStaff = !selectedCollaborator || booking.staffId === selectedCollaborator;
    return matchesSearch && matchesDate && matchesStatus && matchesStaff;
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
              selectedCollaborator={selectedCollaborator} // Ajout de cette prop
              onDateChange={setSelectedDate}
              onStatusChange={setSelectedStatus}
              onCollaboratorChange={setSelectedCollaborator}
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