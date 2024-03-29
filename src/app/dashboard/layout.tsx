import { api } from '../lib/api';
import { Category } from '../api/categories/route';
import CategoryHeaderWrapper from '../components/category-header-wrapper';

export const metadata = {
  title: 'Dashboard',
  description: 'Topic dashboard',
};

export const getCategories = async (): Promise<Category[]> => {
  return api('/api/categories', { cache: 'no-store' })
    .then((data) => data.json())
    .then((data) => data['data']);
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const categories = await getCategories();
  return (
    <div className="h-full w-full flex flex-row pt-6 pr-6">
      <div className="w-1/3 flex pb-6 px-10">
        <CategoryHeaderWrapper categories={categories} />
      </div>
      {props?.children}
    </div>
  );
}
