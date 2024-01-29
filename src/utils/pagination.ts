import { z } from "zod";

export const queryPageSchema = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(10),
});

export type TQueryPage = z.infer<typeof queryPageSchema>;

type IGetDataProps = { take: number; skip: number };

const pagination = async <T>({
  getDataCount,
  getData,
  page: currentPage,
  perPage,
}: {
  getDataCount: () => Promise<number>;
  getData: (getDataProps: IGetDataProps) => Promise<T[]>;
} & TQueryPage) => {
  const skip = currentPage > 0 ? perPage * (currentPage - 1) : 0;

  const [total, data] = await Promise.all([
    getDataCount(),
    getData({
      take: perPage,
      skip,
    }),
  ]);

  const lastPage = Math.ceil(total / perPage);
  const prev = currentPage > 1 ? currentPage - 1 : null;
  const next = currentPage < lastPage ? currentPage + 1 : null;

  const meta = {
    perPage,
    currentPage,
    lastPage,
    total,
    prev,
    next,
  };

  return { data, meta };
};

export default pagination;
