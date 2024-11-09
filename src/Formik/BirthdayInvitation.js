import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { string, boolean, object, array } from "yup";
import { useFormik } from "formik";
import "./formik.css";

const BirthdayInvitationForm = () => {
  const [alertMessage, setAlertMessage] = useState('');

  const alcoholOptions = [
    "Пиво", "Шампанское", "Белое вино", "Красное вино",
    "Водка", "Виски", "Коньяк", "Ликер", "Не пью алкоголь"
  ];

  const birthdaySchema = object({
    name: string()
      .min(2, 'Имя должно содержать минимум 2 символа')
      .required('Это поле обязательно'),
    attending: boolean().required('Вы должны указать, придете ли вы'),
    drinks: array().min(1, 'Выберите хотя бы один напиток'),
  });

  const formik = useFormik({
    initialValues: { name: '', attending: false, drinks: [] },
    validationSchema: birthdaySchema,
    onSubmit: (values, { resetForm }) => {
      sendEmail(values);
      resetForm();
    }
  });

  const sendEmail = (values) => {
    const templateParams = {
      name: values.name,
      attending: values.attending ? 'Да' : 'Нет',
      drinks: values.drinks.join(', '),
    };

    emailjs.send('service_qqiw1rh', 'template_ndcfuje', templateParams, 'KCn971jYkZdaYlyjl')
      .then(() => {
        setAlertMessage('Приглашение успешно отправлено!');
      })
      .catch(() => {
        setAlertMessage('Произошла ошибка при отправке');
      });
  };

  return (
    <form onSubmit={formik.handleSubmit} className='form'>
      <label className='form_h1'>ВАШИ ИМЯ И ФАМИЛИЯ</label>
      <input
        name="name"
        type="text"
        className='form__input'
        placeholder="Введите ваше имя"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      {formik.errors.name && formik.touched.name && (
        <div className="error">{formik.errors.name}</div>
      )}

      <p className='form__question'>СМОЖЕТЕ ЛИ ВЫ ПРИСУТСТВОВАТЬ НА МОЕМ ПРАЗДНИКЕ</p>
      <div className='checkbox__container'>
        <label className="custom-checkbox">
          <input
            type="radio"
            name="attending"
            value="true"
            className="custom-checkbox__input"
            onChange={() => formik.setFieldValue('attending', true)}
          />
          <span className="custom-checkbox__circle"></span>
          <span>Да</span>
        </label>
        <label className="custom-checkbox">
          <input
            type="radio"
            name="attending"
            value="false"
            className="custom-checkbox__input"
            onChange={() => formik.setFieldValue('attending', false)}
          />
          <span className="custom-checkbox__circle"></span>
          <span>Нет</span>
        </label>
      </div>
      {formik.errors.attending && formik.touched.attending && (
        <div className="error">{formik.errors.attending}</div>
      )}

      <p className='form__alchogol'>КАКОЙ АЛКОГОЛЬ ВЫ ПРЕДПОЧИТАЕТЕ?</p>
      <div className='form__alchogol_container'>
        {alcoholOptions.map((drink) => (
          <label key={drink} className="custom-checkbox">
            <input
              type="checkbox"
              name="drinks"
              value={drink}
              className="custom-checkbox__input"
              onChange={formik.handleChange}
              checked={formik.values.drinks.includes(drink)}
            />
            <span className="custom-checkbox__circle"></span>
            <span>{drink}</span>
          </label>
        ))}
      </div>
      {formik.errors.drinks && formik.touched.drinks && (
        <div className="error">{formik.errors.drinks}</div>
      )}

      <button type="submit" className='form__button'>ОТПРАВИТЬ</button>

      {alertMessage && <div className="alert">{alertMessage}</div>}
    </form>
  );
};

export default BirthdayInvitationForm;
