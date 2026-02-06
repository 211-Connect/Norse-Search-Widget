export type TaxonomyItem = {
  id: string;
  code: string;
  name: string;
};

export type TaxonomyResponse = {
  total: number;
  items: TaxonomyItem[];
  page: number;
};
