export interface HttpClient {
  get(url: string, quert: IndexableObject): Promise<any>;
  post(url: string, data: IndexableObject): Promise<any>;
  delete(url: string, data?: IndexableObject): Promise<any>;
  put(url: string, data: IndexableObject): Promise<any>;
  patch(url: string, data: IndexableObject): Promise<any>;
}

export interface IndexableObject {
  [state: string]: any;
}

export class ErrorResponse extends Error {
  response!: Response;
  constructor(response: Response) {
    super("An error occured while processing your request");
    this.name = "Error Response";
    this.response = response;
  }
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
      mode: "no-cors",
    });
    if (!response.ok) {
      throw new ErrorResponse(response);
    }
    return await response.json();
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
  public get(url: string, query: IndexableObject = {}): Promise<any> {
    const params = new URLSearchParams(query);
    let reqUrl;
    if (url.includes("?")) reqUrl = `${url}&${params.toString()}`;
    else reqUrl = `${url}?${params.toString()}`;
    return this.exec(reqUrl, "GET");
  }

  public post(url: string, data: IndexableObject) {
    return this.exec(url, "POST", data);
  }

  public patch(url: string, data: IndexableObject) {
    return this.exec(url, "PATCH", data);
  }
  public put(url: string, data: IndexableObject) {
    return this.exec(url, "PUT", data);
  }
  public delete(url: string, data: IndexableObject) {
    return this.exec(url, "DELETE", data);
  }
}
