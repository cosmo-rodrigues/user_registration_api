import { httpStatusCode } from "../constant/httpStatusCode";
import { HttpException } from "../utils/HttpException";

interface IAddress {
  country: string;
  state: string;
  county: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
}

export function addressFieldsValidate(address: IAddress) {
  const { country, state, county, zipCode, street, number, complement } =
    address;

  if (!country || typeof country !== "string") {
    throw new HttpException(
      httpStatusCode.UNPROCESSABLE_ENTITY,
      "Por favor, digite o nome de um país válido!"
    );
  }

  if (!state || typeof state !== "string") {
    throw new HttpException(
      httpStatusCode.UNPROCESSABLE_ENTITY,
      "Por favor, digite o nome de um estado válido!"
    );
  }

  if (!county || typeof county !== "string") {
    throw new HttpException(
      httpStatusCode.UNPROCESSABLE_ENTITY,
      "Por favor, digite o nome de uma cidade válido!"
    );
  }

  if (!zipCode || typeof zipCode !== "string") {
    throw new HttpException(
      httpStatusCode.UNPROCESSABLE_ENTITY,
      "Por favor, digite um cep válido!"
    );
  }

  if (!street || typeof street !== "string") {
    throw new HttpException(
      httpStatusCode.UNPROCESSABLE_ENTITY,
      "Por favor, digite o nome de uma rua válido!"
    );
  }

  if (!number || typeof number !== "string") {
    throw new HttpException(
      httpStatusCode.UNPROCESSABLE_ENTITY,
      "Por favor, digite um número válido, ou digite 'SN' caso não tenha número no seu endereço!"
    );
  }

  if (!complement || typeof complement !== "string") {
    throw new HttpException(
      httpStatusCode.UNPROCESSABLE_ENTITY,
      "Por favor, digite um complemento válido!"
    );
  }
}
