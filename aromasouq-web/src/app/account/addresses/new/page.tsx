'use client';

import { useCreateAddress, CreateAddressDto } from '@/hooks/useAddresses';
import { AddressForm } from '@/components/addresses/AddressForm';
import { useRouter } from 'next/navigation';
import { MapPin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewAddressPage() {
  const router = useRouter();
  const createAddress = useCreateAddress();

  const handleSubmit = (data: CreateAddressDto) => {
    createAddress.mutate(data, {
      onSuccess: () => {
        router.push('/account/addresses');
      },
    });
  };

  const handleCancel = () => {
    router.push('/account/addresses');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Back Button */}
      <Link
        href="/account/addresses"
        className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Addresses
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <MapPin className="w-8 h-8 text-purple-600" />
          Add New Address
        </h1>
        <p className="text-gray-600 mt-2">
          Add a new shipping address to your account
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <AddressForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={createAddress.isPending}
          submitLabel="Add Address"
        />
      </div>

      {/* Help Text */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">Tips for adding addresses:</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• Make sure your phone number is correct for delivery notifications</li>
          <li>• Include apartment/building/floor details in Address Line 2</li>
          <li>• Set this as your default address if you want it selected automatically at checkout</li>
          <li>• You can edit or delete this address anytime from your address book</li>
        </ul>
      </div>
    </div>
  );
}
