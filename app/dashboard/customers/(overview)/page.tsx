import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { FormattedCustomersTable } from '@/app/lib/definitions';
import { fetchFilteredCustomers } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Customers',
};
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  const customers = await fetchFilteredCustomers(query);
  const formattedCustomers: FormattedCustomersTable[] = customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    image_url: customer.image_url,
    total_invoices: customer.total_invoices,
    total_pending: customer.total_pending,
    total_paid: customer.total_paid,
  }));

  return (
    <div className="w-full">
      <div>
        <Suspense>
        <Table customers={formattedCustomers} />
        </Suspense>
      </div>
    </div>
  );
}