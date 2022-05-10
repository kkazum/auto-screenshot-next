import { getSettingById } from './getSettingById';
import { expect, it } from 'vitest';
import { SettingListType } from '../../components/settings/NewDetailSettingArea';

it('should return undefined', () => {
  const settingId = '1';
  const settingList: SettingListType = [
    {
      id: '2',
      setting: {
        name: 'test',
        url: 'test@test',
        size: [
          {
            px: '200',
          },
        ],
      },
    },
  ];

  const result = getSettingById(settingList, settingId);
  expect(result).toBeUndefined();
});

it('should return an item', () => {
  const settingId = '1';
  const settingList: SettingListType = [
    {
      id: '1',
      setting: {
        name: 'test',
        url: 'test@test',
        size: [
          {
            px: '200',
          },
        ],
      },
    },
  ];

  const result = getSettingById(settingList, settingId);
  expect(result).toMatchObject({
    name: 'test',
    url: 'test@test',
    size: [
      {
        px: '200',
      },
    ],
  });
});
