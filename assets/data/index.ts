import {
  localeBg,
  localeCs,
  localeEn,
  localeRu,
  localeTr,
} from '@mobiscroll/datepicker-vue'

export const calendarLocales = {
  en: localeEn,
  ru: localeRu,
  bg: localeBg,
  tr: localeTr,
  az: localeEn,
  che: localeCs,
  uz: localeRu,
}
export const regions = (t: (e: string) => string) => [
  {
    label: t('525'),
    value: 'UZB',
  },
  {
    label: t('525'),
    value: 'TUR',
  },
  /*  {
      label: "Bulgaria",
      value: "BGR",
    },
    {
      label: "Czech",
      value: "CZK",
    },*/
]
export const languages = (t: (e: string) => string) => [
  {
    label: t('844'),
    value: 'ru',
  },
  {
    label: t('845'),
    value: 'en',
  },
  {
    label: t('846'),
    value: 'uz',
  },
  {
    label: t('847'),
    value: 'tr',
  },
  {
    label: t('850'),
    value: 'bg',
  },
  {
    label: t('849'),
    value: 'che',
  },
  {
    label: t('848'),
    value: 'az',
  },
]
export const currencies = [
  {
    label: 'USD',
    value: 'USD',
  },
  {
    label: 'UZS',
    value: 'UZS',
  },
  {
    label: 'TRY',
    value: 'TRY',
  },
  // {
  //   label: "BGN",
  //   value: "BGN",
  // },
  // {
  //   label: "CZK",
  //   value: "CZK",
  // },
]
export const classOptions = (
  t: (value: string) => string,
): { value: string; label: string }[] => [
  {
    value: 'E',
    label: t('368'),
  },
  {
    value: 'B',
    label: t('37'),
  },
]
export const children = (t: (e: string) => string) => [
  {
    value: '1',
    label: t('166'),
  },
  {
    value: '2',
    label: '2 ' + t('380'),
  },
  {
    value: '3',
    label: '3 ' + t('380'),
  },
  {
    value: '4',
    label: '4 ' + t('380'),
  },
  {
    value: '5',
    label: '5 ' + t('386'),
  },
  {
    value: '6',
    label: '6 ' + t('386'),
  },
  {
    value: '7',
    label: '7 ' + t('386'),
  },
  {
    value: '8',
    label: '8 ' + t('386'),
  },
  {
    value: '9',
    label: '9 ' + t('386'),
  },
  {
    value: '10',
    label: '10 ' + t('386'),
  },
  {
    value: '11',
    label: '11 ' + t('386'),
  },
  {
    value: '12',
    label: '12 ' + t('386'),
  },
  {
    value: '13',
    label: '13 ' + t('386'),
  },
  {
    value: '14',
    label: '14 ' + t('386'),
  },
  {
    value: '15',
    label: '15 ' + t('386'),
  },
  {
    value: '16',
    label: '16 ' + t('386'),
  },
  {
    value: '17',
    label: '17 ' + t('386'),
  },
]
export const defaultHotelList = (t: (e: string) => string) => [
  {
    title: t('526'),
    list: [
      {
        type: 'city',
        name: t('522'),
        name_full: t('554'),
        id: '329151',
      },
      {
        type: 'city',
        name: t('529'),
        name_full: t('555'),
        id: '329939',
      },
      {
        type: 'city',
        name: t('531'),
        name_full: t('556'),
        id: '14841',
      },
      {
        type: 'city',
        name: t('557'),
        name_full: t('558'),
        id: '329921',
      },
      {
        type: 'city',
        name: t('530'),
        name_full: t('559'),
        id: '14835',
      },
      // {
      //   type: "hotel",
      //   name: "Kapadokya Hill Hotel & Spa",
      //   name_full: "Kapadokya Hill Hotel & Spa, Nevşehir, Nevşehir, Türkiye",
      //   id: "76983",
      // },
      {
        type: 'city',
        name: t('532'),
        name_full: t('560'),
        id: '15011',
      },
    ],
  },
  {
    title: t('544'),
    list: [
      {
        type: 'city',
        name: t('561'),
        name_full: t('562'),
        id: '30173',
      },
      {
        type: 'city',
        name: t('563'),
        name_full: t('564'),
        id: '30163',
      },
      {
        type: 'city',
        name: t('565'),
        name_full: t('566'),
        id: '30156',
      },
      {
        type: 'city',
        name: t('548'),
        name_full: t('567'),
        id: '29796',
      },
      {
        type: 'city',
        name: t('568'),
        name_full: t('569'),
        id: '29806',
      },
    ],
  },
  {
    title: t('535'),
    list: [
      {
        type: 'province_state',
        name: t('535'),
        name_full: t('535'),
        id: '66',
      },
    ],
  },
  {
    title: t('571'),
    list: [
      {
        type: 'province_state',
        name: t('571'),
        name_full: t('571'),
        id: '89',
      },
    ],
  },
  {
    title: t('542'),
    list: [
      {
        type: 'city',
        name: t('590'),
        name_full: t('590'),
        id: '78509',
      },
    ],
  },
  {
    title: t('533'),
    list: [
      {
        type: 'city',
        name: t('534'),
        name_full: t('573'),
        id: '114050',
      },
      {
        type: 'city',
        name: t('748'),
        name_full: t('749'),
        id: '113968',
      },
    ],
  },
  {
    title: t('750'),
    list: [
      {
        type: 'city',
        name: t('751'),
        name_full: t('752'),
        id: '211098',
      },
    ],
  },
  {
    title: t('527'),
    list: [
      {
        type: 'province_state',
        name: t('523'),
        name_full: t('574'),
        id: '301',
      },
    ],
  },
  {
    title: t('753'),
    list: [
      {
        eps_id: '180100',
        type: 'province_state',
        name: t('575'),
        name_full: t('585'),
        displayName: t('585'),
        id: '189223',
      },
    ],
  },
  {
    title: t('536'),
    list: [
      {
        eps_id: '6046393',
        type: 'city',
        name: t('537'),
        name_full: t('576'),
        displayName: t('576'),
        id: '325475',
      },
      {
        eps_id: '604',
        type: 'city',
        name: t('538'),
        name_full: t('577'),
        displayName: t('577'),
        id: '326663',
      },
      {
        eps_id: '6056227',
        type: 'city',
        name: t('539'),
        name_full: t('578'),
        displayName: t('578'),
        id: '326717',
      },
    ],
  },
  {
    title: t('525'),
    list: [
      {
        eps_id: '11412',
        type: 'country',
        name: t('525'),
        name_full: t('525'),
        displayName: t('525'),
        id: '81',
      },
    ],
  },
  {
    title: t('540'),
    list: [
      {
        eps_id: '178043',
        type: 'city',
        name: t('579'),
        name_full: t('580'),
        displayName: t('580'),
        id: '315180',
      },
      {
        eps_id: '1680',
        type: 'city',
        name: t('553'),
        name_full: t('581'),
        displayName: t('581'),
        id: '315179',
      },
      {
        eps_id: '3051',
        type: 'city',
        name: t('754'),
        name_full: t('582'),
        displayName: t('582'),
        id: '315220',
      },
      {
        eps_id: '602705',
        type: 'city',
        name: 'Medina',
        name_full: t('583'),
        displayName: t('583'),
        id: '315468',
      },
    ],
  },
  {
    title: t('546'),
    list: [
      {
        type: 'city',
        name: t('546'),
        name_full: t('584'),
        id: '47914',
      },
    ],
  },
  {
    title: t('589'),
    list: [
      {
        type: 'city',
        name: t('587'),
        name_full: t('588'),
        id: '283331',
      },
    ],
  },
  {
    title: t('783'),
    list: [
      {
        type: 'city',
        name: t('784'),
        name_full: t('784'),
        id: '26019',
      },
      {
        type: 'city',
        name: t('785'),
        name_full: t('785'),
        id: '26024',
      },
    ],
  },
  {
    title: t('755'),
    list: [
      {
        type: 'province_state',
        name: t('755'),
        name_full: t('755'),
        id: '190',
      },
    ],
  },
  {
    title: t('758'),
    list: [
      {
        type: 'province_state',
        name: t('760'),
        name_full: t('760'),
        id: '188144',
      },
      {
        type: 'province_state',
        name: t('759'),
        name_full: t('759'),
        id: '188339',
      },
    ],
  },
  {
    title: t('868'),
    list: [
      {
        name: t('866'),
        id: '392806',
        type: 'city',
      },
      {
        name: t('867'),
        id: '392767',
        type: 'city',
      },
      // {
      //   name: t('869'),
      //   id: '392975',
      //   type: 'city',
      // },
      // {
      //   name: t('870'),
      //   id: '392762',
      //   type: 'city',
      // },
    ],
  },
]

export const parentDefaultCities = (t: (e: string) => string) => [
  {
    title: t('525'),
    list: [
      {
        name: t('328'),
        code: 'TAS',
        type: 'airport',
      },
      {
        name: t('520'),
        code: 'FEG',
        type: 'airport',
      },
      {
        name: t('521'),
        code: 'SKD',
        type: 'airport',
      },
    ],
  },
  {
    title: t('526'),
    list: [
      {
        name: t('522'),
        code: 'AYT',
        type: 'airport',
      },
    ],
  },
  {
    title: t('527'),
    list: [
      {
        name: t('523'),
        code: 'DXB',
        type: 'airport',
      },
      {
        name: t('524'),
        code: 'SHJ',
        type: 'airport',
      },
    ],
  },
  {
    title: t('589'),
    list: [
      {
        name: t('587'),
        code: 'DOH',
        type: 'airport',
      },
    ],
  },
  {
    title: t('542'),
    list: [
      {
        name: t('590'),
        code: 'KLV',
        type: 'airport',
      },
    ],
  },
  {
    title: t('533'),
    list: [
      {
        name: t('748'),
        code: 'HRG',
        type: 'airport',
      },
    ],
  },
]
export const tourDefaultCities = (t: (e: string) => string) => [
  {
    name: t('328'),
    code: 'TAS',
    type: 'airport',
    directions: [
      {
        title: t('526'),
        list: [
          {
            name: t('522'),
            id: 329151,
            type: 'airport',
            name_full: t('551'),
          },
          {
            name: t('528'),
            id: 15059,
            type: 'airport',
          },
          {
            name: t('529'),
            id: 329939,
            type: 'airport',
          },
          {
            name: t('530'),
            id: 14835,
            type: 'airport',
          },
          /*{
            name: t('756'),
            value: '/custom-tours/63',
            id: 'ex_tour',
            type: 'ex_tour',
          },*/
          /* {
            name: t('766'),
            value: '/custom-tours/190',
            id: 'ex_tour',
            type: 'ex_tour',
          },*/
          {
            name: t('531'),
            id: 14841,
            type: 'airport',
          },
          {
            name: t('532'),
            id: 15011,
            type: 'airport',
          },
          // {
          //   name: "Antalya (Asialuxe Golf Academy)",
          //   id: "M/AYT-GOLF",
          //   type: "city",
          // },
          // {
          //   eps_id: "167",
          //   type: "province_state",
          //   name: "Sri Lanka",
          //   name_full: "Sri Lanka",
          //   displayName: "Sri Lanka",
          //   adress: null,
          //   id: "89",
          // },
        ],
      },
      {
        title: t('533'),
        list: [
          {
            name: t('534'),
            id: 114050,
            type: 'airport',
          },
          {
            name: t('748'),
            id: 113968,
            type: 'airport',
          },
        ],
      },
      {
        title: t('783'),
        list: [
          {
            type: 'city',
            name: t('784'),
            name_full: t('784'),
            id: '26019',
          },
          {
            type: 'city',
            name: t('785'),
            name_full: t('785'),
            id: '26024',
          },
        ],
      },
      {
        title: t('542'),
        list: [
          /*{
            name: t("543"),
            id: 72326,
            type: "airport",
          },*/
          {
            name: t('590'),
            id: 78509,
            type: 'airport',
          },
        ],
      },
      {
        title: t('544'),
        list: [
          {
            name: t('548'),
            id: 30254,
            type: 'airport',
          },
          /*{
            name: "Bansko",
            id: 30163,
            type: "city",
          },
          {
            name: "Borovets",
            id: 30156,
            type: "city",
          },*/
          // {
          //   name: "Varna",
          //   id: 29806,
          //   type: "city",
          // },
        ],
      },
      {
        title: t('535'),
        list: [
          {
            name: t('535'),
            id: 66,
            type: 'airport',
          },
        ],
      },
      {
        title: t('571'),
        list: [
          {
            name: t('571'),
            id: 89,
            type: 'airport',
          },
        ],
      },
      {
        title: t('536'),
        list: [
          {
            name: t('537'),
            id: 325475,
            type: 'airport',
          },
          {
            name: t('538'),
            id: 326663,
            type: 'airport',
          },
          {
            name: t('539'),
            id: 326717,
            type: 'airport',
          },
        ],
      },
      {
        title: t('527'),
        list: [
          {
            name: t('523'),
            id: 454,
            type: 'airport',
          },
          {
            name: t('524'),
            id: 312,
            type: 'airport',
          },
        ],
      },
      {
        title: t('540'),
        list: [
          {
            name: t('541'),
            id: 315179,
            type: 'airport',
          },
        ],
      },
      // {
      //   title: "Azerbaijan",
      //   list: [],
      // },
      {
        title: t('545'),
        list: [
          {
            name: t('546'),
            id: 47914,
            type: 'airport',
          },
        ],
      },
      {
        title: t('589'),
        list: [
          {
            name: t('587'),
            id: 283331,
            type: 'airport',
          },
        ],
      },
      {
        title: t('694'),
        list: [
          {
            name: t('695'),
            id: 234983,
            type: 'airport',
          },
        ],
      },
    ],
  },
  {
    name: t('520'),
    code: 'FEG',
    type: 'airport',
    directions: [
      {
        title: t('526'),
        list: [
          {
            name: t('522'),
            id: 329151,
            type: 'airport',
          },
          {
            name: t('531'),
            id: 14841,
            type: 'airport',
          },
        ],
      },
      {
        title: t('527'),
        list: [
          {
            name: t('523'),
            id: 454,
            type: 'airport',
          },
        ],
      },
    ],
  },
  {
    name: t('521'),
    code: 'SKD',
    type: 'airport',
    directions: [
      {
        title: t('526'),
        list: [
          /*{
            name: t("522"),
            id: 329151,
            type: "airport",
          },*/
          {
            name: t('547'),
            id: 329165,
            type: 'airport',
          },
          {
            name: t('531'),
            id: 14841,
            type: 'airport',
          },
        ],
      },
    ],
  },
  {
    name: t('522'),
    code: 'AYT',
    type: 'airport',
    directions: [
      {
        title: t('525'),
        list: [
          {
            name: t('328'),
            id: 388652,
            type: 'airport',
          },
        ],
      },
    ],
  },
  {
    name: t('748'),
    code: 'HRG',
    type: 'airport',
    directions: [
      {
        title: t('525'),
        list: [
          {
            name: t('328'),
            id: 388652,
            type: 'airport',
          },
        ],
      },
    ],
  },
  {
    name: t('523'),
    code: 'DXB',
    type: 'airport',
    directions: [
      {
        title: t('525'),
        list: [
          {
            name: t('328'),
            id: 388652,
            type: 'airport',
          },
          {
            name: t('520'),
            id: 388640,
            type: 'airport',
          },
        ],
      },
    ],
  },
  {
    name: t('524'),
    code: 'SHJ',
    type: 'airport',
    directions: [
      {
        title: t('525'),
        list: [
          {
            name: t('328'),
            id: 388652,
            type: 'airport',
          },
        ],
      },
    ],
  },
  {
    name: t('589'),
    code: 'DOH',
    type: 'airport',
    directions: [
      {
        title: t('525'),
        list: [
          {
            name: t('328'),
            id: 388652,
            type: 'airport',
          },
        ],
      },
    ],
  },
  {
    name: t('589'),
    code: 'KLV',
    type: 'airport',
    directions: [
      {
        title: t('525'),
        list: [
          {
            name: t('328'),
            id: 388652,
            type: 'airport',
          },
        ],
      },
    ],
  },
]
export const tourDefaultDirections = (t: (e: string) => string) => [
  {
    name: t('522'),
    id: 329151,
    type: 'airport',
  },
  {
    name: t('528'),
    id: 15059,
    type: 'airport',
  },
  {
    name: t('529'),
    id: 329939,
    type: 'airport',
  },
  {
    name: t('548'),
    id: 30254,
    type: 'airport',
  },
  {
    name: t('530'),
    id: 14835,
    type: 'airport',
  },
  {
    name: t('531'),
    id: 14841,
    type: 'airport',
  },
  {
    name: t('532'),
    id: 15011,
    type: 'airport',
  },
  // {
  //   name: "Antalya (Asialuxe Golf Academy)",
  //   id: "M/AYT-GOLF",
  //   type: "airport",
  // },
  {
    name: t('534'),
    id: 114050,
    type: 'airport',
  },
  /*  {
      name: t("535"),
      id: 66,
      type: "airport",
    },*/
  {
    name: t('537'),
    id: 325475,
    type: 'airport',
  },
  {
    name: t('538'),
    id: 326663,
    type: 'airport',
  },
  {
    name: t('539'),
    id: 326717,
    type: 'airport',
  },
  // {
  //   name: "Sri Lanka",
  //   id: "LKA",
  //   type: "airport",
  // },
  {
    name: t('523'),
    id: 454,
    type: 'airport',
  },
  {
    name: t('524'),
    id: 312,
    type: 'airport',
  },
  {
    name: t('541'),
    id: 315179,
    type: 'airport',
  },
  /*  {
      name: t("543"),
      id: 72326,
      type: "airport",
    },*/
  {
    name: t('590'),
    id: 78509,
    type: 'airport',
  },
  /*  {
      name: "Bansko",
      id: 30163,
      type: "airport",
    },
    {
      name: "Borovets",
      id: 30156,
      type: "airport",
    },*/
]
export const hotelsSort = (t: (e: string) => string) => {
  return [
    {
      label: t('289'),
      value: 'none',
    },
    {
      label: t('265'),
      value: 'popular',
    },
    {
      label: t('104'),
      value: 'price_asc',
    },
    {
      label: t('113'),
      value: 'price_desc',
    },
  ]
}
export const charterDefaults = (t: (e: string) => string) => [
  {
    label: t('328'),
    value: 'TAS',
    type: 'city',
    charters: [
      {
        label: t('551'),
        value: 'AYT',
        type: 'city',
      },
      {
        label: t('529'),
        value: 'BJV',
        type: 'city',
      },
      {
        label: t('530'),
        value: 'DLM',
        type: 'city',
      },
      {
        label: t('598'),
        value: 'HRG',
        type: 'city',
      },
      {
        label: t('523'),
        value: 'DXB',
        type: 'city',
      },
      // {
      //   label: t("530") + 'this',
      //   value: "/custom-tours/63",
      //   type: "ex_tour",
      // },
      {
        label: t('541'),
        value: 'JED',
        type: 'city',
      },
      /*{
        label: t("528"),
        value: "GZP",
        type: "city",
      },*/
      {
        label: t('537'),
        value: 'HKT',
        type: 'city',
      },
      {
        label: t('552'),
        value: 'HRI',
        type: 'city',
      },
      {
        label: t('535'),
        value: 'MLE',
        type: 'city',
      },
      {
        label: t('543'),
        value: 'KLV',
        type: 'city',
      },
      {
        label: t('534'),
        value: 'SSH',
        type: 'city',
      },
      {
        label: t('548'),
        value: 'BOJ',
        type: 'city',
      },
      {
        label: t('590'),
        value: 'KLV',
        type: 'city',
      },
    ],
  },
  {
    label: t('598'),
    value: 'HRG',
    type: 'city',
    charters: [
      {
        label: t('328'),
        value: 'TAS',
        type: 'city',
      },
    ],
  },
  {
    label: t('593'),
    value: 'BOJ',
    type: 'city',
    charters: [
      {
        label: t('328'),
        value: 'TAS',
        type: 'city',
      },
    ],
  },
  {
    label: t('522'),
    value: 'AYT',
    type: 'city',
    charters: [
      {
        label: t('520'),
        value: 'FEG',
        type: 'city',
      },
      {
        label: t('521'),
        value: 'SKD',
        type: 'city',
      },
      {
        label: t('328'),
        value: 'TAS',
        type: 'city',
      },
    ],
  },
  {
    label: t('529'),
    value: 'BJV',
    type: 'city',
    charters: [
      {
        label: t('328'),
        value: 'TAS',
        type: 'city',
      },
    ],
  },
  {
    label: t('530'),
    value: 'DLM',
    type: 'city',
    charters: [
      {
        label: t('328'),
        value: 'TAS',
        type: 'city',
      },
    ],
  },
  {
    label: t('523'),
    value: 'DXB',
    type: 'city',
    charters: [
      {
        label: t('328'),
        value: 'TAS',
        type: 'city',
      },
    ],
  },
  {
    label: t('520'),
    value: 'FEG',
    type: 'city',
    charters: [
      {
        label: t('522'),
        value: 'AYT',
        type: 'city',
      },
      {
        label: t('541'),
        value: 'JED',
        type: 'city',
      },
    ],
  },
  /*{
    label: t("528"),
    value: "GZP",
    type: "city",
    charters: [
      {
        label: t("328"),
        value: "TAS",
        type: "city",
      },
    ],
  },*/
  {
    label: t('537'),
    value: 'HKT',
    type: 'city',
    charters: [
      {
        label: t('328'),
        value: 'TAS',
        type: 'city',
      },
    ],
  },
  {
    label: t('552'),
    value: 'HRI',
    type: 'city',
    charters: [
      {
        label: t('328'),
        value: 'TAS',
        type: 'city',
      },
    ],
  },
  {
    label: t('553'),
    value: 'JED',
    type: 'city',
    charters: [
      {
        label: t('328'),
        value: 'TAS',
        type: 'city',
      },
      {
        label: t('520'),
        value: 'FEG',
        type: 'city',
      },
    ],
  },
  {
    label: t('535'),
    value: 'MLE',
    type: 'city',
    charters: [
      {
        label: t('328'),
        value: 'TAS',
        type: 'city',
      },
    ],
  },
  {
    label: t('590'),
    value: 'KLV',
    type: 'city',
    charters: [
      {
        label: t('328'),
        value: 'TAS',
        type: 'city',
      },
    ],
  },
  {
    label: t('543'),
    value: 'PRG',
    type: 'city',
    charters: [
      {
        label: t('328'),
        value: 'TAS',
        type: 'city',
      },
    ],
  },
  /*{
    label: t("521"),
    value: "SKD",
    type: "city",
    charters: [
      {
        label: t("522"),
        value: "AYT",
        type: "city",
      },
    ],
  },*/
  {
    label: t('534'),
    value: 'SSH',
    type: 'city',
    charters: [
      {
        label: t('328'),
        value: 'TAS',
        type: 'city',
      },
    ],
  },
]
