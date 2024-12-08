// (./db/index.js) - dataBase file Name in mongoDB
export const DB_Name = 'ecommerce_chaldal';

// (index.js) - api run port in locally
export const Local_PORT = 3000;

// (app.js) - DataMax limit
export const DataMax = "30kb";



// all CRUD status Code variable
export const readStatusCode = 200;   // read & update together
export const createStatusCode = 201;
export const badStatusCode = 404;

export const commonErrorMassage = "incorrect Data";

// cookie Option
export const Options_For_Cookie = {
    httpOnly: true,
    // secret: true,  // TODO : true for deploy site
    secure: false,    // just use for locally run
    sameSite: "strict",
    maxAge: 60 * 60 * 1000
}