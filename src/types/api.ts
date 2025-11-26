export type CurrenciesApiResponse = Record<string, string>;

export type CurrencyRatesApiResponse = { date: string } & Record<string, Record<string, number>>;
