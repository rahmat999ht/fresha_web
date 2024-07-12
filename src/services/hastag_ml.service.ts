
import * as hastagRepo from "~/repository/hastag_ml";
import { InputCreateHastagMl } from "~/repository/hastag_ml";

export const createHastagSer = async (create: InputCreateHastagMl) => {
  const hastag = await hastagRepo.createHastag(create);

  console.log(JSON.stringify({ hastag }, null, 2));
  return hastag;
};
