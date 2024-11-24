import React, { useState, useEffect } from 'react';
import { Booking } from '../../types/booking';
import { getServiceofSalonByid } from '../../../Service/ServiceService';
import { getPackageofSalonByid } from '../../../Service/PackageService';
import { getallCollaborateurBYsalon } from '../../../Service/CollaboratorService';
import { getUserByMail, getUserByPhone,resgisterAnonyme } from '../../../Service/USerService';
import { createReservation } from '../../../Service/ReservationsService';
import { Service } from '../../types/service';
import { SalonPackage } from '../../types/package';
import { Staff, SalonCollaData } from '../../types/staff';
import { convertSalonCollaToStaff } from '../../../Service/util';

interface AddBookingModalProps {
  onClose: () => void;
  onAdd: (booking: Omit<Booking, 'id'>, isNewUser: boolean) => void;
}

const AddBookingModal = ({ onClose, onAdd }: AddBookingModalProps) => {
  const [isService, setIsService] = useState(true);
  const [isNewUser, setIsNewUser] = useState(true);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceId: '',
    serviceName: '',
    staffId: '',
    staffName: '',
    date: '',
    time: '',
    duration: '',
    status: 'pending' as Booking['status'],
    notes: '',
    totalPrice: ''
  });

  const [services, setServices] = useState<Service[]>([]);
  const [packages, setPackages] = useState<SalonPackage[]>([]);
  const [salonCollaborateurData, setSalonCollaborateurData] = useState<Staff[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [existingUserId, setExistingUserId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, packagesData, staffData] = await Promise.all([
          getServiceofSalonByid(5),
          getPackageofSalonByid(5),
          getallCollaborateurBYsalon(5)
        ]);
        
        setServices(servicesData);
        setPackages(packagesData);
        const saloncoll = await convertSalonCollaToStaff(staffData);
        setSalonCollaborateurData(saloncoll);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const lookupUser = async (type: 'email' | 'phone', value: string) => {
    if (!value) return;
    
    setIsSearching(true);
    try {
      const user = type === 'email' 
        ? await getUserByMail(value)
        : await getUserByPhone(value);
  
      if (user) {
        setIsNewUser(false);
        setExistingUserId(user.id); // Store the user ID
        setFormData(prev => ({
          ...prev,
          clientName: user.name || prev.clientName,
          clientEmail: user.email || prev.clientEmail,
          clientPhone: user.phone || prev.clientPhone
        }));
      } else {
        setIsNewUser(true);
        setExistingUserId(null);
      }
    } catch (error) {
      console.error(`Error looking up user by ${type}:`, error);
      setIsNewUser(true);
      setExistingUserId(null);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce function to prevent too many API calls
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const debouncedLookup = debounce(lookupUser, 500);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const updates: any = { [name]: value };
      
      if (name === 'clientEmail' && value) {
        debouncedLookup('email', value);
      } else if (name === 'clientPhone' && value) {
        debouncedLookup('phone', value);
      }
      
      // Update related fields for services/packages
      if (name === 'serviceId' && isService) {
        const selectedService = services.find(s => s.id.toString() === value);
        if (selectedService) {
          updates.serviceName = selectedService.name;
          updates.duration = selectedService.duration?.toString() || '';
          updates.totalPrice = selectedService.price?.toString() || '';
        }
      } else if (name === 'serviceId' && !isService) {
        const selectedPackage = packages.find(p => p.id.toString() === value);
        if (selectedPackage) {
          updates.serviceName = selectedPackage.name;
          updates.duration = selectedPackage.duration?.toString() || '';
          updates.totalPrice = selectedPackage.price?.toString() || '';
        }
      } else if (name === 'staffId') {
        const selectedStaff = salonCollaborateurData.find(s => s.id.toString() === value);
        if (selectedStaff) {
          updates.staffName = selectedStaff.name;
        }
      }
      
      return { ...prev, ...updates };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     
      // Calculate end time based on start time and duration
      const calculateEndTime = (startTime: string, durationMinutes: number) => {
        const [hours, minutes] = startTime.split(':').map(Number);
        const startDate = new Date();
        startDate.setHours(hours, minutes, 0);
        const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
        return `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
      };
  
      let userId: |any;
      
      // Handle user creation if new user
      if (isNewUser) {
        try {
          const userResponse = await resgisterAnonyme(
            formData.clientPhone,
            formData.clientName,
            formData.clientEmail
          );
          userId = userResponse.id; // Assuming the response contains the new user's ID
        } catch (error) {
          console.error('Error creating user:', error);
          throw new Error('Failed to create user');
        }
      } else {
        // If existing user, we should have their ID from the getUserByMail/Phone response
        // You'll need to store the user ID when looking up the user
        userId = existingUserId; // You'll need to add this state variable
      }
  
      // Calculate end time
      const endTime = calculateEndTime(formData.time, Number(formData.duration));
  
      // Create the reservation
      const reservationResponse = await createReservation(
        formData.date,           // date
        formData.status,         // status
        Number(formData.staffId),// CollaboratorId
        5,                       // SalonId (hardcoded as 5 from your earlier code)
        userId,                  // UserId
        formData.time,          // startTime
        endTime,                // endTime
        Number(formData.totalPrice), // totalPrice
        Number(formData.serviceId)   // SalonServiceId
      );
  
      // If successful, call onAdd and close modal
      onAdd({
        ...formData,
        duration: Number(formData.duration),
        totalPrice: Number(formData.totalPrice)
      }, isNewUser);
      onClose();
  
    } catch (error) {
    
      console.error('Error creating booking:', error);
      setError(error instanceof Error ? error.message : 'Failed to create booking');
    }
    };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Booking</h3>
        {isSearching && (
          <div className="mb-4 text-sm text-blue-600">
            Searching for existing user...
          </div>
        )}
        {!isSearching && !isNewUser && (
          <div className="mb-4 text-sm text-green-600">
            Existing user found and details populated
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="clientPhone"
                value={formData.clientPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={isService}
                onChange={() => setIsService(true)}
                className="form-radio h-4 w-4 text-primary-600"
              />
              <span className="ml-2">Service</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                checked={!isService}
                onChange={() => setIsService(false)}
                className="form-radio h-4 w-4 text-primary-600"
              />
              <span className="ml-2">Package</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isService ? 'Select Service' : 'Select Package'}
            </label>
            <select
              name="serviceId"
              value={formData.serviceId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Select {isService ? 'a service' : 'a package'}</option>
              {isService
                ? services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} - ${service.price}
                    </option>
                  ))
                : packages.map(pkg => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} - ${pkg.price}
                    </option>
                  ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Staff Member</label>
            <select
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Select a staff member</option>
              {salonCollaborateurData.map(staff => (
                <option key={staff.id} value={staff.id}>
                  {staff.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Add Booking
            </button>
          </div>
          {error && (
  <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
    {error}
  </div>
)}
        </form>
      </div>
    </div>
  );
};

export default AddBookingModal;