// import axios from "axios";

// const config = {
// 	'dev': {
// 		'baseUrl': window.location.origin.indexOf('https') >= 0 ? 'https://137.59.201.189:8089' : 'http://137.59.201.189:8085'
// 	},
// 	'prod': {
// 		'baseUrl': window.location.origin.indexOf('https') >= 0 ? 'https://api.etoe.in' : 'https://api.etoe.in'
// 	}
// };

// export const buildMode = (process.env.NODE_ENV === 'prod') ? 'prod' : 'dev';

// export const getAxios = () => {
// 	return axios;
// }

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const getUser = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken")
    ? localStorage.getItem("refreshToken")
    : null;
};

// export const baseUrl = (skipSlash) => {
//   let url = config[buildMode].baseUrl;
//   if (!skipSlash) {
//     url += "/";
//   }
//   return url;
// };

export const assessmentQuestions = [
  {
    id: "604388240b0c414c17a3a8d7",
    question:
      "What is the unit weight of concrete for Plain cement concrete ______ kN/m3 ?",
    options: [],
    questionType: "Text_Box",
  },
  {
    id: "604388240b0c414c17a3a8d8",
    question: "What is the unit of the steel ________ kg/cu.m?",
    options: [],
    questionType: "Text_Box",
  },
  {
    id: "604388240b0c414c17a3a8d9",
    question: "A wooden block hinged on post outside a door, is known ",
    options: ["Cleat", "Stop", "Horn", "None of these"],
    questionType: "Single_Select",
  },
  {
    id: "604388240b0c414c17a3a8da",
    question: "The window which is provided in flat roof of a room, is known ",
    options: [
      "Dormer window",
      "Lantern window",
      "Louvered window",
      "Sky window",
    ],
    questionType: "Single_Select",
  },
  {
    id: "604388240b0c414c17a3a8db",
    question: "Pitched and sloping roofs are suitable for",
    options: [
      "Coastal regions",
      "Plain regions",
      "Covering large areas",
      "All of the above",
    ],
    questionType: "Single_Select",
  },
  {
    id: "604388240b0c414c17a3a8dc",
    question: "Pile foundation are suitable for",
    options: [
      "Water logged soils",
      "Soft rocks",
      "Compact soils",
      "Multi-storeyed buildings",
    ],
    questionType: "Single_Select",
  },
];
