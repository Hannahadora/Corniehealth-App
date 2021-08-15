export interface HttpClient {
  get(url: string, query: IndexableObject): Promise<JsonResponse>;
  post(url: string, data: IndexableObject): Promise<JsonResponse>;
  delete(url: string, data?: IndexableObject): Promise<JsonResponse>;
  put(url: string, data: IndexableObject): Promise<JsonResponse>;
  patch(url: string, data: IndexableObject): Promise<JsonResponse>;
}

export interface IndexableObject {
  [state: string]: any;
}

export class ErrorResponse extends Error {
  response!: JsonResponse;
  constructor(response: JsonResponse) {
    super("An error occured while processing your request");
    this.name = "Error Response";
    this.response = response;
  }
}

export class JsonResponse {
  data?: any;
  numberOfPages?: number | undefined;
  nextPage?: number | undefined;
  previousPage?: number | undefined;
  errors?: Errors | undefined;
  token: string;
  baseResponse: Response;

  get status(): number {
    return this.baseResponse.status;
  }

  get success(): boolean {
    return this.baseResponse.ok;
  }

  private constructor(response: Response, json: IndexableObject) {
    this.baseResponse = response;
    this.data = json.data;
    this.numberOfPages = json.numberOfPages;
    this.nextPage = json.nextPage;
    this.previousPage = json.previousPage;
    this.errors = json.errors;
    this.token = json.token;
  }

  static async createJsonResponse(response: Response): Promise<JsonResponse> {
    const json = await response.json();
    return new JsonResponse(response, json);
  }
}
interface Errors {
  summary: string;
  fields: {
    [key: string]: any;
  };
}

export class JSONClient implements HttpClient {
  constructor(private headers: IndexableObject, private baseUrl: string = "") {}

  appendHeaders(headers: IndexableObject) {
    this.headers = { ...this.headers, ...headers };
  }

  private async exec(url: string, method: string, body?: IndexableObject) {
    const response = await fetch(this.buildUrl(url), {
      method: method,
      headers: { ...this.headers },
      body: this.buildBody(method, body),
    });

    if (!response.ok) {
      throw new ErrorResponse(await JsonResponse.createJsonResponse(response));
    }

    return await JsonResponse.createJsonResponse(response);
  }

  private buildBody(method: string, body?: IndexableObject) {
    if (method == "GET" || method == "HEAD") return null;
    if (!body) return;
    return JSON.stringify(body);
  }

  private buildUrl(url: string) {
    let reqURL;
    if (this.baseUrl) reqURL = new URL(url, this.baseUrl);
    else reqURL = new URL(url);

    return reqURL.href;
  }

  public get(url: string, query: IndexableObject = {}): Promise<JsonResponse> {
    const params = new URLSearchParams(query);
    let reqUrl;
    if (url.includes("?")) reqUrl = `${url}&${params.toString()}`;
    else reqUrl = `${url}?${params.toString()}`;
    return this.exec(reqUrl, "GET");
  }

  public post(url: string, data: IndexableObject): Promise<JsonResponse> {
    return this.exec(url, "POST", data);
  }

  public patch(url: string, data: IndexableObject): Promise<JsonResponse> {
    return this.exec(url, "PATCH", data);
  }

  public put(url: string, data: IndexableObject): Promise<JsonResponse> {
    return this.exec(url, "PUT", data);
  }

  public delete(url: string, data?: IndexableObject): Promise<JsonResponse> {
    return this.exec(url, "DELETE", data);
  }
}
