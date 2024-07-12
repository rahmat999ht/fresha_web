
import * as hastagRepo from "~/repository/hastag_ml";
import { InputCreateHastagMl } from "~/repository/hastag_ml";
import pagination, { TQueryPage } from "~/utils/pagination";

export const createHastagSer = async (create: InputCreateHastagMl) => {
  const hastag = await hastagRepo.createHastag(create);

  console.log(JSON.stringify({ hastag }, null, 2));
  return hastag;
};


export const getsHastagMl = async ({ page, perPage }: TQueryPage) => {
  const hastagMlPagination = await pagination({
    page,
    perPage,
    getData: hastagRepo.getsHastagMl,
    getDataCount: () => hastagRepo.getsHastagMlCount(),
  });

  return hastagMlPagination;
};

export const getHastagMl = async (id: string) => {
  const hastagMl = await hastagRepo.getHastagMlFirst(id);

  return hastagMl;
};
