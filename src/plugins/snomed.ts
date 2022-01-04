import { JSONClient } from "@/lib/http";
import { ValueSet } from "@/types/ValueSet";

class SNOMEDService {
  private store: Map<string, ValueSet[]> = new Map();
  constructor(private client: JSONClient) {}

  async fetchValueSet(filter: string): Promise<ValueSet[]> {
    let data: ValueSet[] | undefined;
    data = this.getFromCache(filter);
    if (data) return data;
    data = await this.fetchRemote(filter);
    this.putInCache(filter, data);
    return data;
  }
  private async fetchRemote(filter: string): Promise<ValueSet[]> {
    if (!filter) return [];
    try {
      const { data } = await this.client.get(
        `$expand?url=http://snomed.info/sct?fhir_vs&filter=${filter}`
      );
      const { expansion } = data;
      const { contains } = expansion;
      return contains;
    } catch (error) {
      window.notify({
        msg: `Error fetching SNOMED valueset for ${filter}`,
        status: "error",
      });
    }
    return [];
  }

  private getFromCache(filter: string): ValueSet[] | undefined {
    if (!this.store.has(filter)) return;
    return this.store.get(filter);
  }

  private putInCache(filter: string, valuesets: ValueSet[]) {
    this.store.set(filter, valuesets);
  }
}

const snomedClient = new JSONClient(
  { "Content-Type": "application/json" },
  "https://snowstorm-fhir.snomedtools.org/fhir/ValueSet/"
);

const snomedService = new SNOMEDService(snomedClient);

export function snomedSearch(filter: string) {
  return snomedService.fetchValueSet(filter);
}
