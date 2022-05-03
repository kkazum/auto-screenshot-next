import { useEffect, useState, useContext } from 'react';
import { FormTextField } from '../../shared/FormTextField';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { Paper, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { useRouter } from 'next/router';
import UUID from 'uuidjs';
import { getSettingById } from '../../../lib/functions/getSettingById';
import { DispatchContext } from '../../../lib/context';
import { CREATE_MESSAGE, UPDATE_MESSAGE, REQUIRED_VALIDATION_MESSAGE, NO_ITEM_MESSAGE } from '../../../lib/messages';
import { actions } from '../../../lib/context/reducer';
import { asyncLocalStorage } from '../../../lib/asyncLocalStorage';

export type FormProps = {
  name: string;
  url: string;
  size: Array<{ px: string }>;
};

export type SettingListType = Array<{
  id: string;
  setting: FormProps;
}>;

export const NewDetailSettingArea: React.VFC<{ settingId?: string }> = ({ settingId }) => {
  const [settingList, setSettingList] = useState<SettingListType | null>(null);
  const dispatch = useContext(DispatchContext);
  const router = useRouter();
  const { getItem, setItem } = asyncLocalStorage;
  const createDefaultValue = { name: '', url: '', size: [{ px: '' }] };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormProps>({
    defaultValues: createDefaultValue,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'size',
  });

  const onCreate: SubmitHandler<FormProps> = (data) => {
    const setting = { id: UUID.generate(), setting: data };
    const value = !!settingList ? [...settingList, setting] : [setting];
    saveValue(value);
  };

  const onUpdate: SubmitHandler<FormProps> = (data) => {
    if (!settingId || !settingList) return;
    const filteredSettingList = settingList.filter((setting) => setting.id !== settingId);
    const setting = { id: settingId, setting: data };
    const value = !!filteredSettingList ? [...filteredSettingList, setting] : [setting];
    localStorage.clear();
    saveValue(value);
  };

  const saveValue = (value: SettingListType) => {
    setItem('settings', JSON.stringify(value)).then(() => {
      setSettingList(value);
      dispatch(actions.showSnackbar(!!settingId ? UPDATE_MESSAGE : CREATE_MESSAGE));
    });
  };

  const requireRules = { required: REQUIRED_VALIDATION_MESSAGE };

  useEffect(() => {
    // 初回レンダリング時にstorageからデータを呼び出す
    getItem('settings').then((list) => {
      setSettingList(list ? JSON.parse(list) : null);
    });
  }, []);

  useEffect(() => {
    if (!settingId || !settingList) return;
    if (!getSettingById(settingList, settingId)) {
      // 存在しないIdで詳細ページに入った場合はリダイレクトする
      router.push('/');
      dispatch(actions.showSnackbar(NO_ITEM_MESSAGE));
    } else {
      // editの際にformに初期値を入れる
      reset(getSettingById(settingList, settingId));
    }
  }, [settingId, settingList]);

  return (
    <Paper>
      <Button>
        <ArrowLeftIcon onClick={() => router.push('/')} />
      </Button>
      <FormTextField
        label={'撮影条件名'}
        error={!!errors?.name}
        errorMessage={errors?.name?.message}
        control={control}
        name={'name'}
        rules={requireRules}
      />
      <FormTextField
        label={'撮影先URL'}
        error={!!errors?.url}
        errorMessage={errors?.url?.message}
        control={control}
        name={'url'}
        rules={requireRules}
      />
      {fields.map((field, index) => (
        <>
          <FormTextField
            key={field.id}
            label={'撮影サイズ'}
            error={errors.size && !!errors?.size[index]?.px}
            errorMessage={errors.size && errors?.size[index]?.px?.message}
            control={control}
            name={`size.${index}.px`}
            type={'number'}
            rules={requireRules}
          />
          {fields.length > 1 && (
            <Button>
              <ClearIcon onClick={() => remove(index)} />
            </Button>
          )}
        </>
      ))}
      <Button onClick={() => append({ px: '' })} startIcon={<AddIcon />}>
        サイズ追加
      </Button>
      <Button onClick={handleSubmit(settingId ? onUpdate : onCreate)}>{!!settingId ? '更新' : '保存'}</Button>
    </Paper>
  );
};
