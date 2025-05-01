'use client';

import { useState } from 'react';
import styles from './OrderForm.module.css';
import { motion, AnimatePresence } from 'framer-motion';

type ServiceType = 'website' | 'mobile' | 'custom' | 'support';
type WebsiteType = 'landing' | 'corporate' | 'shop' | null;
type MobilePlatform = 'ios' | 'android';
type SupportPeriod = 'month' | 'half-year' | 'year';

interface BriefQuestion {
  id: string;
  label: string;
  type: 'select' | 'multiselect' | 'textarea';
  options?: string[];
}

interface OrderFormData {
  serviceType: ServiceType;
  websiteType?: WebsiteType;
  mobilePlatforms?: MobilePlatform[];
  customDescription?: string;
  supportPeriod?: SupportPeriod;
  supportMonths?: number;
  options: Record<string, number>;
  extras: string[];
  brief: Record<string, any>;
  additionalInfo: Record<string, any>;
  files: string[];
  contact: {
    name: string;
    email: string;
    messenger: string;
    messengerType: 'telegram' | 'whatsapp' | 'viber';
    password?: string;
  };
  register: boolean;
}

const initialFormData: OrderFormData = {
  serviceType: 'website',
  websiteType: 'landing',
  mobilePlatforms: [],
  customDescription: '',
  supportPeriod: 'month',
  supportMonths: 1,
  options: {
    responsive: 0,
    cms: 0,
    seo: 0,
    analytics: 0
  },
  extras: [],
  brief: {},
  additionalInfo: {},
  files: [],
  contact: {
    name: '',
    email: '',
    messenger: '',
    messengerType: 'telegram',
    password: '',
  },
  register: false,
};

const websiteTypes = [
  { id: 'landing', label: 'Лендинг', price: 'от 50 000 ₽' },
  { id: 'corporate', label: 'Корпоративный сайт', price: 'от 100 000 ₽' },
  { id: 'shop', label: 'Интернет-магазин', price: 'от 150 000 ₽' },
];

const mobilePlatforms = [
  { id: 'ios', label: 'iOS', price: 'от 200 000 ₽' },
  { id: 'android', label: 'Android', price: 'от 200 000 ₽' },
];

const supportPeriods = [
  { id: 'month', label: '1 месяц', price: '15 000 ₽' },
  { id: 'half-year', label: '6 месяцев', price: '75 000 ₽' },
  { id: 'year', label: '1 год', price: '120 000 ₽' },
];

const websiteOptions = [
  { id: 'responsive', label: 'Адаптивный дизайн' },
  { id: 'cms', label: 'Система управления контентом' },
  { id: 'seo', label: 'SEO оптимизация' },
  { id: 'analytics', label: 'Интеграция аналитики' },
];

const websiteExtras = [
  { id: 'design', label: 'Уникальный дизайн' },
  { id: 'content', label: 'Наполнение контентом' },
  { id: 'hosting', label: 'Хостинг и домен' },
  { id: 'support', label: 'Техническая поддержка' },
];

const briefQuestions: Record<ServiceType, BriefQuestion[]> = {
  website: [
    {
      id: 'purpose',
      label: 'Цель создания сайта',
      type: 'select',
      options: [
        'Презентация компании',
        'Интернет-магазин',
        'Корпоративный портал',
        'Лендинг',
        'Блог',
        'Другое',
        'Свой вариант'
      ]
    },
    {
      id: 'target',
      label: 'Целевая аудитория',
      type: 'multiselect',
      options: [
        'Физические лица',
        'Малый бизнес',
        'Корпорации',
        'Государственные организации',
        'Некоммерческие организации',
        'Свой вариант'
      ]
    },
    {
      id: 'features',
      label: 'Основные функции',
      type: 'multiselect',
      options: [
        'Каталог товаров',
        'Корзина и оформление заказа',
        'Личный кабинет',
        'Блог/Новости',
        'Формы обратной связи',
        'Мультиязычность',
        'Интеграция с CRM',
        'Онлайн-оплата',
        'Свой вариант'
      ]
    },
    {
      id: 'design',
      label: 'Предпочтения по дизайну',
      type: 'select',
      options: [
        'Минималистичный',
        'Корпоративный',
        'Креативный',
        'Классический',
        'Современный',
        'Свой вариант'
      ]
    },
    {
      id: 'timeline',
      label: 'Желаемые сроки',
      type: 'select',
      options: [
        '1-2 месяца',
        '2-3 месяца',
        '3-4 месяца',
        '4-6 месяцев',
        'Гибкие сроки',
        'Свой вариант'
      ]
    },
    {
      id: 'budget',
      label: 'Бюджет проекта',
      type: 'select',
      options: [
        'До 100 000 ₽',
        '100 000 - 300 000 ₽',
        '300 000 - 500 000 ₽',
        '500 000 - 1 000 000 ₽',
        'Более 1 000 000 ₽',
        'Свой вариант'
      ]
    }
  ],
  mobile: [
    {
      id: 'platform',
      label: 'Платформы',
      type: 'multiselect',
      options: ['iOS', 'Android']
    },
    {
      id: 'appType',
      label: 'Тип приложения',
      type: 'select',
      options: [
        'Социальная сеть',
        'Маркетплейс',
        'Сервис доставки',
        'Финансовое приложение',
        'Игровое приложение',
        'Другое'
      ]
    },
    {
      id: 'features',
      label: 'Основные функции',
      type: 'multiselect',
      options: [
        'Авторизация',
        'Push-уведомления',
        'Онлайн-оплата',
        'Геолокация',
        'Камера/Фото',
        'Чат',
        'Оффлайн режим'
      ]
    },
    {
      id: 'design',
      label: 'Предпочтения по дизайну',
      type: 'select',
      options: [
        'iOS Human Interface',
        'Material Design',
        'Кастомный дизайн'
      ]
    },
    {
      id: 'integration',
      label: 'Необходимые интеграции',
      type: 'multiselect',
      options: [
        'Платежные системы',
        'Социальные сети',
        'Мессенджеры',
        'Карты',
        'Аналитика'
      ]
    },
    {
      id: 'timeline',
      label: 'Желаемые сроки',
      type: 'select',
      options: [
        '1-2 месяца',
        '2-3 месяца',
        '3-4 месяца',
        '4-6 месяцев',
        'Гибкие сроки'
      ]
    }
  ],
  custom: [
    {
      id: 'problem',
      label: 'Описание задачи',
      type: 'textarea'
    },
    {
      id: 'requirements',
      label: 'Технические требования',
      type: 'textarea'
    },
    {
      id: 'integration',
      label: 'Необходимые интеграции',
      type: 'multiselect',
      options: [
        'CRM системы',
        'ERP системы',
        'Платежные системы',
        'Социальные сети',
        'Мессенджеры',
        'Другие API'
      ]
    },
    {
      id: 'timeline',
      label: 'Желаемые сроки',
      type: 'select',
      options: [
        '1-2 месяца',
        '2-3 месяца',
        '3-4 месяца',
        '4-6 месяцев',
        'Гибкие сроки'
      ]
    }
  ],
  support: [
    {
      id: 'current',
      label: 'Текущее состояние проекта',
      type: 'textarea'
    },
    {
      id: 'issues',
      label: 'Основные проблемы',
      type: 'textarea'
    },
    {
      id: 'requirements',
      label: 'Требования к поддержке',
      type: 'multiselect',
      options: [
        'Техническая поддержка',
        'Обновление контента',
        'Исправление ошибок',
        'Оптимизация',
        'Консультации'
      ]
    },
    {
      id: 'timeline',
      label: 'Желаемый период поддержки',
      type: 'select',
      options: [
        '1 месяц',
        '3 месяца',
        '6 месяцев',
        '1 год',
        'Постоянная поддержка'
      ]
    }
  ]
};

const additionalQuestions = [
  {
    id: 'competitors',
    label: 'Основные конкуренты',
    type: 'textarea',
    placeholder: 'Перечислите основных конкурентов и их сильные стороны'
  },
  {
    id: 'references',
    label: 'Референсы',
    type: 'textarea',
    placeholder: 'Укажите сайты или приложения, которые вам нравятся и почему'
  },
  {
    id: 'branding',
    label: 'Брендинг',
    type: 'multiselect',
    options: [
      'Нужен логотип',
      'Нужен фирменный стиль',
      'Нужен гайдлайн',
      'Есть готовый брендбук'
    ]
  },
  {
    id: 'integration',
    label: 'Интеграции',
    type: 'multiselect',
    options: [
      'CRM система',
      'Платежные системы',
      'Социальные сети',
      'Мессенджеры',
      'Аналитика',
      'Другие API'
    ]
  }
];

export default function OrderForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([1]);
  const [formData, setFormData] = useState<OrderFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    { id: 1, title: 'Service' },
    { id: 2, title: 'Options & Extras' },
    { id: 3, title: 'Brief' },
    { id: 4, title: 'Additionals' },
    { id: 5, title: 'Contacts' },
    { id: 6, title: 'Registration' },
  ];

  const validateContactInfo = () => {
    const errors: Record<string, string> = {};
    if (!formData.contact.name.trim()) {
      errors.name = 'Введите ваше имя';
    }
    if (!formData.contact.email.trim()) {
      errors.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact.email)) {
      errors.email = 'Введите корректный email';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 5) {
      if (!validateContactInfo()) {
        return;
      }
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      setVisitedSteps(prev => [...new Set([...prev, currentStep + 1])]);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);

      // Если пользователь выбрал регистрацию, проверяем пароль
      if (formData.register) {
        if (!formData.contact.password) {
          setError('Пожалуйста, введите пароль');
          return;
        }

        if (formData.contact.password.length < 6) {
          setError('Пароль должен содержать минимум 6 символов');
          return;
        }

        // Сначала регистрируем пользователя
        const registerResponse = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.contact.name,
            email: formData.contact.email,
            password: formData.contact.password,
          }),
        });

        if (!registerResponse.ok) {
          const errorData = await registerResponse.json();
          throw new Error(errorData.error || 'Ошибка при регистрации');
        }
      }

      // Создаем заказ
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // Если пользователь не регистрируется, не отправляем пароль
          contact: formData.register 
            ? formData.contact 
            : {
                name: formData.contact.name,
                email: formData.contact.email,
                messenger: formData.contact.messenger,
                messengerType: formData.contact.messengerType
              }
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || 'Ошибка при создании заказа');
      }

      // Очищаем форму и показываем сообщение об успехе
      setFormData(initialFormData);
      setCurrentStep(1);
      setSuccess('Заказ успешно создан! Мы свяжемся с вами в ближайшее время.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (optionId: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      options: {
        ...prev.options,
        [optionId]: value
      }
    }));
  };

  const handleExtraChange = (extraId: string) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter(id => id !== extraId)
        : [...prev.extras, extraId]
    }));
  };

  const handleBriefChange = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      brief: {
        ...prev.brief,
        [questionId]: value
      }
    }));
  };

  const handleContactChange = (field: keyof OrderFormData['contact'], value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  const handleStepClick = (stepId: number) => {
    // Allow navigation only to visited steps
    if (visitedSteps.includes(stepId)) {
      setCurrentStep(stepId);
    }
  };

  const handleMultiselectChange = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      brief: {
        ...prev.brief,
        [questionId]: Array.isArray(prev.brief[questionId])
          ? (prev.brief[questionId] as string[]).includes(value)
            ? (prev.brief[questionId] as string[]).filter(v => v !== value)
            : [...(prev.brief[questionId] as string[]), value]
          : [value]
      }
    }));
  };

  const handleAdditionalInfoChange = (questionId: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      additionalInfo: {
        ...prev.additionalInfo,
        [questionId]: value
      }
    }));
  };

  const handleAdditionalMultiselectChange = (questionId: string, value: string) => {
    setFormData(prev => {
      const currentValues = Array.isArray(prev.additionalInfo[questionId]) 
        ? prev.additionalInfo[questionId] as string[]
        : [];
      
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        additionalInfo: {
          ...prev.additionalInfo,
          [questionId]: newValues
        }
      };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...newFiles.map(file => file.name)]
      }));
    }
  };

  const handleFileRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  return (
    <>
      <div className={styles.progressBar}>
        {steps.map((step) => (
          <div
            key={step.id}
            className={`${styles.step} ${currentStep >= step.id ? styles.active : ''}`}
            onClick={() => handleStepClick(step.id)}
          >
            <div className={styles.stepNumber}>{step.id}</div>
            <div className={styles.stepTitle}>{step.title}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}
        {success && (
          <div className={styles.successMessage}>
            {success}
          </div>
        )}
        {loading && (
          <div className={styles.loadingMessage}>
            Отправка данных...
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.stepContent}
          >
            {currentStep === 1 && (
              <div className={styles.serviceSelection}>
                <h2>Выберите услугу</h2>
                <div className={styles.serviceGrid}>
                  <button
                    type="button"
                    className={`${styles.serviceCard} ${formData.serviceType === 'website' ? styles.selected : ''}`}
                    onClick={() => setFormData({ ...formData, serviceType: 'website' })}
                  >
                    <h3>Разработка сайта</h3>
                    <p>Создание современных веб-приложений</p>
                  </button>
                  <button
                    type="button"
                    className={`${styles.serviceCard} ${formData.serviceType === 'mobile' ? styles.selected : ''}`}
                    onClick={() => setFormData({ ...formData, serviceType: 'mobile' })}
                  >
                    <h3>Мобильное приложение</h3>
                    <p>Разработка iOS и Android приложений</p>
                  </button>
                  <button
                    type="button"
                    className={`${styles.serviceCard} ${formData.serviceType === 'custom' ? styles.selected : ''}`}
                    onClick={() => setFormData({ ...formData, serviceType: 'custom' })}
                  >
                    <h3>Кастомное решение</h3>
                    <p>Индивидуальные IT-решения</p>
                  </button>
                  <button
                    type="button"
                    className={`${styles.serviceCard} ${formData.serviceType === 'support' ? styles.selected : ''}`}
                    onClick={() => setFormData({ ...formData, serviceType: 'support' })}
                  >
                    <h3>Техническая поддержка</h3>
                    <p>Сопровождение и поддержка проектов</p>
                  </button>
                </div>

                {formData.serviceType === 'website' && (
                  <div className={styles.subcategoryGrid}>
                    {websiteTypes.map(type => (
                      <button
                        key={type.id}
                        type="button"
                        className={`${styles.subcategoryCard} ${formData.websiteType === type.id ? styles.selected : ''}`}
                        onClick={() => setFormData({ ...formData, websiteType: type.id as WebsiteType })}
                      >
                        <h4>{type.label}</h4>
                        <p>{type.price}</p>
                      </button>
                    ))}
                  </div>
                )}

                {formData.serviceType === 'mobile' && (
                  <div className={styles.subcategoryGrid}>
                    {mobilePlatforms.map(platform => (
                      <button
                        key={platform.id}
                        type="button"
                        className={`${styles.subcategoryCard} ${formData.mobilePlatforms?.includes(platform.id as MobilePlatform) ? styles.selected : ''}`}
                        onClick={() => {
                          const newPlatforms = formData.mobilePlatforms?.includes(platform.id as MobilePlatform)
                            ? formData.mobilePlatforms.filter(p => p !== platform.id)
                            : [...(formData.mobilePlatforms || []), platform.id as MobilePlatform];
                          setFormData({ ...formData, mobilePlatforms: newPlatforms });
                        }}
                      >
                        <h4>{platform.label}</h4>
                        <p>{platform.price}</p>
                      </button>
                    ))}
                  </div>
                )}

                {formData.serviceType === 'custom' && (
                  <div className={styles.customInput}>
                    <textarea
                      placeholder="Опишите вашу задачу..."
                      value={formData.customDescription || ''}
                      onChange={(e) => setFormData({ ...formData, customDescription: e.target.value })}
                    />
                  </div>
                )}

                {formData.serviceType === 'support' && (
                  <div className={styles.subcategoryGrid}>
                    {supportPeriods.map(period => (
                      <div key={period.id}>
                        <button
                          type="button"
                          className={`${styles.subcategoryCard} ${formData.supportPeriod === period.id ? styles.selected : ''}`}
                          onClick={() => setFormData({ ...formData, supportPeriod: period.id as SupportPeriod })}
                        >
                          <h4>{period.label}</h4>
                          <p>{period.price}</p>
                        </button>
                        {period.id === 'month' && formData.supportPeriod === 'month' && (
                          <div className={styles.supportMonthCounter}>
                            <button
                              type="button"
                              className={styles.counterButton}
                              onClick={() => {
                                const currentMonths = formData.supportMonths ?? 1;
                                setFormData(prev => ({
                                  ...prev,
                                  supportMonths: Math.max(1, currentMonths - 1)
                                }));
                              }}
                              disabled={(formData.supportMonths ?? 1) <= 1}
                            >
                              -
                            </button>
                            <span>{formData.supportMonths ?? 1}</span>
                            <button
                              type="button"
                              className={styles.counterButton}
                              onClick={() => {
                                const currentMonths = formData.supportMonths ?? 1;
                                setFormData(prev => ({
                                  ...prev,
                                  supportMonths: Math.min(12, currentMonths + 1)
                                }));
                              }}
                              disabled={(formData.supportMonths ?? 1) >= 12}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className={styles.optionsSection}>
                <h2>Выберите опции и дополнения</h2>
                <div className={styles.optionsGrid}>
                  <div className={styles.optionsGroup}>
                    <h3>Основные опции</h3>
                    {websiteOptions.map(option => (
                      <div key={option.id} className={styles.optionItem}>
                        <span>{option.label}</span>
                        <div className={styles.monthCounter}>
                          <button
                            type="button"
                            className={styles.counterButton}
                            onClick={() => handleOptionChange(option.id, Math.max(0, formData.options[option.id] - 1))}
                            disabled={formData.options[option.id] <= 0}
                          >
                            -
                          </button>
                          <span>{formData.options[option.id]}</span>
                          <button
                            type="button"
                            className={styles.counterButton}
                            onClick={() => handleOptionChange(option.id, Math.min(12, formData.options[option.id] + 1))}
                            disabled={formData.options[option.id] >= 12}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.optionsGroup}>
                    <h3>Дополнительные услуги</h3>
                    {websiteExtras.map(extra => (
                      <label key={extra.id} className={styles.optionItem}>
                        <input
                          type="checkbox"
                          checked={formData.extras.includes(extra.id)}
                          onChange={() => handleExtraChange(extra.id)}
                        />
                        <span>{extra.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className={styles.briefSection}>
                <h2>Заполните бриф</h2>
                <div className={styles.briefForm}>
                  {briefQuestions[formData.serviceType].map(question => (
                    <div key={question.id} className={styles.briefItem}>
                      <label>{question.label}</label>
                      {question.type === 'select' ? (
                        <>
                          <select
                            className={styles.select}
                            value={formData.brief[question.id] || ''}
                            onChange={(e) => handleBriefChange(question.id, e.target.value)}
                          >
                            <option value="">Выберите вариант</option>
                            {question.options?.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                          {formData.brief[question.id] === 'Свой вариант' && (
                            <input
                              type="text"
                              className={styles.input}
                              placeholder="Введите свой вариант"
                              value={formData.brief[`${question.id}_custom`] || ''}
                              onChange={(e) => handleBriefChange(`${question.id}_custom`, e.target.value)}
                            />
                          )}
                        </>
                      ) : question.type === 'multiselect' ? (
                        <>
                          <div className={styles.multiselect}>
                            {question.options?.map(option => (
                              <label key={option} className={styles.multiselectOption}>
                                <input
                                  type="checkbox"
                                  checked={Array.isArray(formData.brief[question.id]) &&
                                    (formData.brief[question.id] as string[]).includes(option)}
                                  onChange={() => handleMultiselectChange(question.id, option)}
                                />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                          {Array.isArray(formData.brief[question.id]) &&
                            (formData.brief[question.id] as string[]).includes('Свой вариант') && (
                              <input
                                type="text"
                                className={styles.input}
                                placeholder="Введите свой вариант"
                                value={formData.brief[`${question.id}_custom`] || ''}
                                onChange={(e) => handleBriefChange(`${question.id}_custom`, e.target.value)}
                              />
                            )}
                        </>
                      ) : (
                        <textarea
                          className={styles.textarea}
                          value={formData.brief[question.id] || ''}
                          onChange={(e) => handleBriefChange(question.id, e.target.value)}
                          placeholder="Опишите подробно..."
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className={styles.additionalInfoSection}>
                <h2>Дополнительная информация</h2>
                <div className={styles.additionalInfoForm}>
                  {additionalQuestions.map(question => (
                    <div key={question.id} className={styles.formGroup}>
                      <label>{question.label}</label>
                      {question.type === 'textarea' ? (
                        <textarea
                          className={styles.textarea}
                          value={formData.additionalInfo[question.id] as string || ''}
                          onChange={(e) => handleAdditionalInfoChange(question.id, e.target.value)}
                          placeholder={question.placeholder}
                        />
                      ) : question.type === 'multiselect' ? (
                        <div className={styles.multiselect}>
                          {question.options?.map(option => (
                            <label key={option} className={styles.multiselectOption}>
                              <input
                                type="checkbox"
                                checked={Array.isArray(formData.additionalInfo[question.id]) &&
                                  (formData.additionalInfo[question.id] as string[]).includes(option)}
                                onChange={() => handleAdditionalMultiselectChange(question.id, option)}
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}

                  <div className={styles.fileUploadSection}>
                    <h3>Прикрепить файлы</h3>
                    <div className={styles.fileUpload}>
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        onChange={handleFileUpload}
                        className={styles.fileInput}
                      />
                      <label htmlFor="file-upload" className={styles.fileUploadButton}>
                        Выберите файлы
                      </label>
                    </div>
                    {formData.files.length > 0 && (
                      <div className={styles.uploadedFiles}>
                        {formData.files.map((file, index) => (
                          <div key={index} className={styles.uploadedFile}>
                            <span>{file}</span>
                            <button
                              type="button"
                              onClick={() => handleFileRemove(index)}
                              className={styles.removeFileButton}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className={styles.contactSection}>
                <h2>Контактная информация</h2>
                <div className={styles.contactForm}>
                  <div className={styles.formGroup}>
                    <label>Ваше имя</label>
                    <input
                      type="text"
                      className={`${styles.input} ${formErrors.name ? styles.inputError : ''}`}
                      value={formData.contact.name}
                      onChange={(e) => handleContactChange('name', e.target.value)}
                      placeholder="Иван Иванов"
                    />
                    {formErrors.name && <span className={styles.errorMessage}>{formErrors.name}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email</label>
                    <input
                      type="email"
                      className={`${styles.input} ${formErrors.email ? styles.inputError : ''}`}
                      value={formData.contact.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      placeholder="example@email.com"
                    />
                    {formErrors.email && <span className={styles.errorMessage}>{formErrors.email}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label>Мессенджер для связи</label>
                    <select
                      className={styles.select}
                      value={formData.contact.messengerType}
                      onChange={(e) => handleContactChange('messengerType', e.target.value as any)}
                    >
                      <option value="telegram">Telegram</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="viber">Viber</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Ваш контакт в мессенджере</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={formData.contact.messenger}
                      onChange={(e) => handleContactChange('messenger', e.target.value)}
                      placeholder="@username или номер телефона"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className={styles.registrationSection}>
                <h2>Регистрация</h2>
                <div className={styles.registrationForm}>
                  <div className={styles.formGroup}>
                    <label>Email</label>
                    <input
                      type="email"
                      className={styles.input}
                      value={formData.contact.email}
                      onChange={(e) => handleContactChange('email', e.target.value)}
                      placeholder="example@email.com"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Пароль</label>
                    <input
                      type="password"
                      className={styles.input}
                      value={formData.contact.password || ''}
                      onChange={(e) => handleContactChange('password', e.target.value)}
                      placeholder="Придумайте пароль"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Подтверждение пароля</label>
                    <input
                      type="password"
                      className={styles.input}
                      placeholder="Повторите пароль"
                    />
                  </div>
                </div>
                <div className={styles.registrationActions}>
                  <button 
                    type="button" 
                    className={styles.submitButton}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, register: true }));
                      handleSubmit(new Event('submit') as any);
                    }}
                  >
                    Зарегистрироваться и отправить заявку
                  </button>
                  <button
                    type="button"
                    className={styles.skipButton}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, register: false }));
                      handleSubmit(new Event('submit') as any);
                    }}
                  >
                    Продолжить без регистрации
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className={styles.navigation}>
          {currentStep > 1 && (
            <button type="button" onClick={handleBack} className={styles.backButton}>
              Назад
            </button>
          )}
          {currentStep < 6 && (
            <button
              type="button"
              onClick={handleNext}
              className={styles.nextButton}
              disabled={currentStep === 5 && (!formData.contact.name.trim() || !formData.contact.email.trim())}
            >
              Далее
            </button>
          )}
        </div>
      </form>
    </>
  );
}
