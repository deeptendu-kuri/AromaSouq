'use client';

import { useAddress, useUpdateAddress, CreateAddressDto } from '@/hooks/useAddresses';
import { AddressForm } from '@/components/addresses/AddressForm';
import { useRouter, useParams } from 'next/navigation';
import { MapPin, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function EditAddressPage() {
  const router = useRouter();
  const params = useParams();
  const addressId = params.id as string;

  const { data: address, isLoading, error } = useAddress(addressId);
  const updateAddress = useUpdateAddress();

  const handleSubmit = (data: CreateAddressDto) => {
    updateAddress.mutate(
      { id: addressId, data },
      {
        onSuccess: () => {
          router.push('/account/addresses');
        },
      }
    );
  };

  const handleCancel = () => {
    router.push('/account/addresses');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading address details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !address) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">Failed to load address. Please try again.</p>
          <Link
            href="/account/addresses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Addresses
          </Link>
        </div>
      </div>
    );
  }

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
          Edit Address
        </h1>
        <p className="text-gray-600 mt-2">
          Update your shipping address details
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <AddressForm
          initialData={address}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={updateAddress.isPending}
          submitLabel="Update Address"
        />
      </div>

      {/* Help Text */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">Need help?</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• Changes will be saved immediately after clicking "Update Address"</li>
          <li>• You can set this as your default address using the checkbox below</li>
          <li>• If this is your default address, you'll need to set another address as default before deleting it</li>
        </ul>
      </div>
    </div>
  );
}
