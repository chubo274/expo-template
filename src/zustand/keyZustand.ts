import { ModeTheme } from "shared/constants/enum";
import { LANGUAGES } from "src/localization";

export const ZustandKeyPersist: (keyof ZustandModel)[] = [
  "Localization",
  "AppTheme",
];

// if change name of any key in ZustandModel, need check and change for all proj about store
export interface ZustandModel {
  UserInfo?: { name: string; age: number };
  Localization?: LANGUAGES;
  AppTheme?: ModeTheme;
}
