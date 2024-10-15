import { LANGUAGES } from "src/localization";

export const ZustandKeyPersist: (keyof ZustandModel)[] = ["Localization"];

// if change name of any key in ZustandModel, need check and change for all proj about store
export interface ZustandModel {
  name?: string;
  UserInfo?: { name: string; age: number };
  Localization?: LANGUAGES;
}
