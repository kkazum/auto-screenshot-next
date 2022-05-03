import { SettingListType } from "../../components/settings/NewDetailSettingArea";

export const getSettingById = (
  settingList: SettingListType,
  settingId: string
) => {
  const result = settingList.find(({ id }) => id === settingId);
  return {
    name: result?.setting.name,
    url: result?.setting.url,
    size: result?.setting.size,
  };
};
