type HttpResponse = {
  statusCode: number;
  body: any;
};

export const badRequest = (msg: string): HttpResponse => ({
  statusCode: 400,
  body: { message: msg },
});

export const forbidden = (msg: string): HttpResponse => ({
  statusCode: 403,
  body: { message: msg },
});

export const notFound = (msg: string): HttpResponse => ({
  statusCode: 404,
  body: { message: msg },
});

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: { message: "Unauthorized" },
});

export const success = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});
