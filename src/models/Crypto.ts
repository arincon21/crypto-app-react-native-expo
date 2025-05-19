export class Crypto {
    id: string;
    name: string;
    symbol: string;
    nameid: string;
    rank: number;
    price_usd: string;
    percent_change_1h: string;
    percent_change_24h: string;
    percent_change_7d: string;
    market_cap_usd: string;
    volume24: number;
    csupply: string;
    tsupply: string;
    max_supply: string | null;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.symbol = data.symbol;
        this.nameid = data.nameid;
        this.rank = Number(data.rank);
        this.price_usd = data.price_usd;
        this.percent_change_1h = data.percent_change_1h;
        this.percent_change_24h = data.percent_change_24h;
        this.percent_change_7d = data.percent_change_7d;
        this.market_cap_usd = data.market_cap_usd;
        this.volume24 = Number(data.volume24);
        this.csupply = data.csupply;
        this.tsupply = data.tsupply;
        this.max_supply = data.max_supply || null;
    }

    getFormattedPrice(): string {
        return `$${parseFloat(this.price_usd).toFixed(2)}`;
    }
}
