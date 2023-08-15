import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';

/*My Components*/
import DateInput from './DateInput';
import InputShow from './InputShow';
import CloseButton from './CloseButton';

/*Icons*/
import Birth from '../../assets/Icons/Birth.svg';

export default function BirthdayComponent({control}) {
  const [modalVisible, setModalVisible] = useState(false);
  var splitedPreviewDate = '';
  var PreviewDateColor = 'black';
  var PreviewDateOpacity = 0.45;

  /*BirthDate Preview*/
  if (control?._fields?.BirthDate != undefined) {
    const meses = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    let PreDate = control._fields.BirthDate._f.value;
    let dataISODataHora = new Date(PreDate);
    let dataFormatada =
      (dataISODataHora.getDate() < 10
        ? '0' + dataISODataHora.getDate()
        : dataISODataHora.getDate()) +
      '/' +
      meses[dataISODataHora.getMonth()] +
      '/' +
      dataISODataHora.getFullYear();
    PreviewDateColor = '#ebb89b';
    PreviewDateOpacity = 1;
    splitedPreviewDate = dataFormatada;
  } else {
    splitedPreviewDate = 'Data de Nascimento';
  }

  /*Other Functions*/
  function BirthDateTreatment() {
    if (
      control?.fieldsRef?.current?.BirthDate == undefined &&
      control?.fieldsRef?.current?.Password != undefined
    ) {
      return 'Campo obrigatorio';
    }
  }

  /*Front Page*/
  return (
    <>
      <InputShow
        IconSvg={Birth}
        Name={splitedPreviewDate}
        Color={PreviewDateColor}
        Opacity={PreviewDateOpacity}
        OnPressFunction={() => setModalVisible(true)}
      />
      <Modal
        isVisible={modalVisible}
        style={{justifyContent: 'flex-end', height: '10%'}}>
        <View
          style={{
            backgroundColor: '#fee2cf',
            padding: 22,
            justifyContent: 'center',
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',
          }}>
          <CloseButton OnPressFunction={() => setModalVisible(false)} />
          <DateInput Control={control} Name={'BirthDate'} />
        </View>
      </Modal>

      {BirthDateTreatment() && (
        <Text style={styles.TouchableTextStyle}>{BirthDateTreatment()}</Text>
      )}
    </>
  );
}
